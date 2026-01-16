'use client'

import { Button, H1, Separator, Text, XStack, YStack } from '@my/ui'
// import { ChevronRight, Pencil, Plus, Trash2 } from '@tamagui/lucide-icons'
import { useMemo } from 'react'
import { useLink } from 'solito/navigation'
import { useDeleteStudent, useGetStudents } from './../../api/generated/default/default'

export function StudentListScreen() {
  const { data, isLoading, isError } = useGetStudents()
  console.log('🚀 ~ StudentListScreen ~ data:', data)
  const deleteMutation = useDeleteStudent()

  const students = useMemo(() => data ?? [], [data])
  console.log('🚀 ~ StudentListScreen ~ students:', students)

  const addLink = useLink({
    href: '/students/add',
  })

  const getStudentLink = (id: string) =>
    useLink({
      href: `/students/${id}`,
    })

  const getEditLink = (id: string) =>
    useLink({
      href: `/students/update?id=${id}`,
    })

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id })
  }

  return (
    <YStack className="flex-1 gap-4 px-4 pt-4 pb-16">
      {/* Header */}
      <XStack className="items-center justify-between">
        <YStack>
          <H1>Students</H1>
          <Text className="text-xs">
            {isLoading ? 'Loading...' : `${students.length} record(s)`}
          </Text>
        </YStack>

        <Button
          size="$3"
          theme="accent"
          //  icon={Plus}
          {...addLink}
        >
          Add
        </Button>
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
        {students.map((student) => {
          const { id, name, grade, rollNumber } = student
          const itemLink = getStudentLink(id)
          const editLink = getEditLink(id)

          return (
            <XStack
              key={id}
              className="rounded-lg border border-[rgba(0,0,0,0.05)] px-3 py-2 flex-row items-center"
            >
              <YStack className="flex-1" {...itemLink}>
                <Text className="text-base font-medium">{name}</Text>
                <XStack className="gap-2 mt-1">
                  {rollNumber ? <Text className="text-xs">Roll: {rollNumber}</Text> : null}
                  {grade ? <Text className="text-xs">Grade: {grade}</Text> : null}
                </XStack>
              </YStack>

              <XStack className="items-center gap-2">
                <Button
                  size="$2"
                  theme="alt1"
                  // icon={Pencil}
                  {...editLink}
                />

                <Button
                  size="$2"
                  theme="red"
                  // icon={Trash2}
                  onPress={() => handleDelete(id)}
                />

                {/* <ChevronRight size={18} /> */}
              </XStack>
            </XStack>
          )
        })}
      </YStack>

      {/* Floating add button */}
      <XStack className="absolute right-4 bottom-6" pointerEvents="box-none">
        <Button
          circular
          size="$5"
          theme="accent"
          // icon={Plus}
          {...addLink}
        />
      </XStack>
    </YStack>
  )
}
