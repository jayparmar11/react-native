'use client'

import { Button as RNRButton } from '@my/ui/src/components/button'
import { Text as RNRText } from '@my/ui/src/components/text'
import { useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Platform, View as RNRView, ScrollView } from 'react-native'
import { useLink } from 'solito/navigation'
import {
  getGetStudentsQueryKey,
  useDeleteStudent,
  useGetStudents,
} from './../../../api/generated/default/default'
import { type Student } from './../../../api/generated/model/student'

type DeleteState = {
  id: string | null
  name: string | null
}

// Shared confirmation content
function DeleteConfirmationContent(props: {
  name: string | null
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  const { name, isDeleting, onCancel, onConfirm } = props

  return (
    <RNRView className="w-full">
      <RNRView className="mb-4">
        <RNRText className="text-lg font-semibold text-gray-900">Delete student</RNRText>
        <RNRText className="mt-2 text-sm text-gray-700">
          Are you sure you want to delete{' '}
          <RNRText className="font-semibold">{name ?? 'this student'}</RNRText>? This action cannot
          be undone.
        </RNRText>
      </RNRView>
      <RNRView className="flex-row justify-end space-x-3 mt-2">
        <RNRButton onPress={onCancel} disabled={isDeleting}>
          <RNRText className="text-sm text-gray-700">Cancel</RNRText>
        </RNRButton>
        <RNRButton onPress={onConfirm} disabled={isDeleting}>
          <RNRText className="text-sm text-white">{isDeleting ? 'Deleting...' : 'Delete'}</RNRText>
        </RNRButton>
      </RNRView>
    </RNRView>
  )
}

// Row component
function StudentRow({
  student,
  onAskDelete,
}: {
  student: Student
  onAskDelete: (student: Student) => void
}) {
  const { id, name } = student
  const itemLink = useLink({ href: `/rnr/students/${id}` })
  const editLink = useLink({ href: `/rnr/students/update/${id}` })

  return (
    <RNRView className="flex-row items-center px-3 py-2 border rounded-lg border-zinc-300 shadow-sm bg-white">
      <RNRView {...itemLink} className="flex-1">
        <RNRText className="text-base font-medium text-gray-900">{name}</RNRText>
      </RNRView>
      <RNRView className="flex-row items-center gap-2">
        <RNRButton variant={'secondary'} {...editLink}>
          <RNRText >EDIT</RNRText>
        </RNRButton>
        <RNRButton variant={'destructive'} onPress={() => onAskDelete(student)}>
          <RNRText >DELETE</RNRText>
        </RNRButton>
      </RNRView>
    </RNRView>
  )
}

// Main screen
export function StudentListScreen() {
  const { data, isLoading, isError } = useGetStudents()
  const deleteMutation = useDeleteStudent()
  const queryClient = useQueryClient()

  const students = useMemo(() => data ?? [], [data])

  const addLink = useLink({
    href: '/rnr/students/add',
  })

  const [deleteSheet, setDeleteSheet] = useState<DeleteState>({
    id: null,
    name: null,
  })
  const [isOpen, setIsOpen] = useState(false)

  const onAskDelete = (student: Student) => {
    setDeleteSheet({
      id: student.id,
      name: student.name,
    })
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }

  const handleConfirmDelete = () => {
    if (!deleteSheet.id) return
    deleteMutation.mutate(
      { id: deleteSheet.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetStudentsQueryKey() })
          closeDialog()
        },
      }
    )
  }

  const isDeleting = deleteMutation.isPending

  return (
    <RNRView className="flex-1 w-full max-w-3xl px-4 pt-4 pb-16 mx-auto bg-white">
      {/* Header */}
      <RNRView className="flex-row items-center justify-between mb-4">
        <RNRView>
          <RNRText className="text-2xl font-semibold text-gray-900">Students</RNRText>
          <RNRText className="text-xs text-gray-500 mt-1">
            {isLoading ? 'Loading...' : `${students.length} record(s)`}
          </RNRText>
        </RNRView>
        {Platform.OS === 'web' && (
          <RNRButton {...addLink} size={"lg"}>
            <RNRText className="font-bold text-lg">+ ADD</RNRText>
          </RNRButton>
        )}
      </RNRView>

      {/* Separator */}
      <RNRView className="h-px bg-gray-200 mb-4" />

      {/* Content states */}
      {isLoading && <RNRText className="text-sm text-gray-600">Loading students...</RNRText>}
      {isError && (
        <RNRText className="text-sm text-red-500">
          Failed to load students. Please try again.
        </RNRText>
      )}
      {!isLoading && !isError && students.length === 0 && (
        <RNRView className="flex-1 items-center justify-center">
          <RNRText className="text-sm text-gray-600">No students found.</RNRText>
        </RNRView>
      )}

      {/* List */}
      <ScrollView>
        <RNRView className="gap-2 mt-2">
          {students.map((student: Student) => (
            <StudentRow key={student.id} student={student} onAskDelete={onAskDelete} />
          ))}
        </RNRView>
      </ScrollView>

      {/* Floating add button (native) */}
      {Platform.OS !== 'web' && (
        <RNRView className="absolute right-4 bottom-6">
          <RNRButton {...addLink} size={"lg"}>
            <RNRText className="font-bold text-lg">+ ADD</RNRText>
          </RNRButton>
        </RNRView>
      )}

      {/* <RNRDialog open={isOpen} onOpenChange={setIsOpen}>
        <>
          <RNRDialogOverlay className="bg-black/40" />
          <RNRDialogContent className="w-11/12 max-w-md mx-auto rounded-lg bg-white p-5">
            <DeleteConfirmationContent
              name={deleteSheet.name}
              isDeleting={isDeleting}
              onCancel={closeDialog}
              onConfirm={handleConfirmDelete}
            />
          </RNRDialogContent>
        </>
      </RNRDialog> */}
    </RNRView>
  )
}
