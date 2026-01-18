'use client'

import { Button, H1, Separator, Text, XStack, YStack } from '@my/ui'
import { useMemo, useState } from 'react'
import { Platform } from 'react-native'
// import { ChevronRight, Pencil, Plus, Trash2 } from '@tamagui/lucide-icons'
import { useQueryClient } from '@tanstack/react-query'
import { useLink } from 'solito/navigation'
import {
  getGetStudentsQueryKey,
  useDeleteStudent,
  useGetStudents,
} from './../../api/generated/default/default'
import { Student } from './../../api/generated/model/student'

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
    <YStack className="gap-4">
      <YStack className="gap-2">
        <Text className="text-lg font-semibold">Delete student</Text>
        <Text className="text-sm">
          Are you sure you want to delete{' '}
          <Text className="font-semibold">{name ?? 'this student'}</Text>? This action cannot be
          undone.
        </Text>
      </YStack>

      <XStack className="justify-end gap-3 mt-4">
        {/* <Dialog.Close asChild> */}
        <Button size="$3" variant="outlined" disabled={isDeleting} onPress={onCancel}>
          Cancel
        </Button>
        {/* </Dialog.Close> */}
        <Button size="$3" theme="red" onPress={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </XStack>
    </YStack>
  )
}

// 1. Row component
function StudentRow({
  student,
  onAskDelete,
}: {
  student: Student
  onAskDelete: (student: Student) => void
}) {
  const { id, name } = student

  const itemLink = useLink({ href: `/students/${id}` })
  const editLink = useLink({ href: `/students/update/${id}` })

  return (
    <XStack className="flex-row items-center px-3 py-2 border rounded-lg native:border-2 web:shadow-sm border-zinc-300">
      <YStack className="flex-1" {...itemLink}>
        <Text className="text-base font-medium">{name}</Text>
      </YStack>

      <XStack className="items-center gap-2">
        <Button size="$2" theme="accent" {...editLink}>
          🖊
        </Button>
        <Button size="$2" theme="red" onPress={() => onAskDelete(student)}>
          🚮
        </Button>
      </XStack>
    </XStack>
  )
}

// 2. Main screen
export function StudentListScreen() {
  const { data, isLoading, isError } = useGetStudents()
  const deleteMutation = useDeleteStudent()

  const queryClient = useQueryClient()
  const students = useMemo(() => data ?? [], [data])

  const addLink = useLink({
    href: '/students/add',
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
    <YStack className="flex-1 w-full max-w-3xl gap-4 px-4 pt-4 pb-16 mx-auto ">
      {/* Header */}
      <XStack className="items-center justify-between">
        <YStack>
          <H1>Students</H1>
          <Text className="text-xs">
            {isLoading ? 'Loading...' : `${students.length} record(s)`}
          </Text>
        </YStack>

        {Platform.OS === 'web' && (
          <Button
            size="$4"
            theme="accent"
            //  icon={Plus}
            {...addLink}
          >
            ➕ Add
          </Button>
        )}
      </XStack>

      <Separator />

      {/* Content */}
      {isLoading && <Text className="text-sm">Loading students...</Text>}

      {isError && <Text className="text-sm">Failed to load students. Please try again.</Text>}

      {!isLoading && !isError && students.length === 0 && (
        <YStack className="items-center justify-center flex-1">
          <Text className="text-sm">No students found.</Text>
        </YStack>
      )}

      {/* List */}
      <YStack className="gap-3">
        {students.map((student: Student) => (
          <StudentRow key={student.id} student={student} onAskDelete={onAskDelete} />
        ))}
      </YStack>

      {/* Floating add button */}
      <XStack className="absolute right-4 bottom-6" pointerEvents="box-none">
        {Platform.OS !== 'web' && (
          <Button
            size="$6"
            theme="accent"
            // icon={Plus}
            className="!text-3xl"
            {...addLink}
          >
            ➕ Add
          </Button>
        )}
      </XStack>

      {/* Delete confirmation dialog + Adapt + Sheet */}
    </YStack>
  )
}
