'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useRouter } from 'solito/navigation'
import {
  getGetStudentsQueryKey,
  useGetStudentById,
  useUpdateStudent,
} from './../../../api/generated/default/default'

import { Button as Button } from '@my/ui/src/components/button'
import { Input as Input } from '@my/ui/src/components/input'
import { Text as Text } from '@my/ui/src/components/text'
import { View as View } from 'react-native'

type UpdateStudentScreenProps = {
  id: string
}

export function UpdateStudentScreen(props: UpdateStudentScreenProps) {
  const { id } = props
  const queryClient = useQueryClient()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const router = useRouter()
  const { data, isLoading } = useGetStudentById(id)

  const updateMutation = useUpdateStudent({
    mutation: {
      onSuccess: () => {
        setServerError(null)
        router.back()
        queryClient.invalidateQueries({ queryKey: getGetStudentsQueryKey() })
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message || err?.message || 'Failed to update student.'
        console.log(err)
        setServerError(message)
      },
    },
  })

  useEffect(() => {
    if (data) {
      setName(data.name ?? '')
      setEmail(data.email ?? '')
    }
  }, [data])

  const validate = () => {
    const nextErrors: { name?: string; email?: string } = {}

    if (!name.trim()) {
      nextErrors.name = 'Name is required.'
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event?: React.FormEvent) => {
    if (event && Platform.OS === 'web') {
      event.preventDefault()
    }

    setServerError(null)
    if (!validate()) return

    updateMutation.mutate({
      id,
      data: {
        name: name.trim(),
        email: email.trim(),
      },
    })
  }

  const isSubmitting = updateMutation.isPending

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-4 py-8">
          <View className="w-full max-w-md mx-auto">
            {/* Header */}
            <View className="items-center mb-6">
              <Text className="text-2xl font-semibold text-gray-900">Edit Student</Text>
              <Text className="text-xs text-gray-500 mt-1">Update the student information.</Text>
            </View>

            {/* Loading state before data */}
            {isLoading && <Text className="text-sm text-gray-600 mb-4">Loading student...</Text>}

            {/* Form */}
            {!isLoading && (
              <View className={Platform.OS === 'web' ? 'flex flex-col gap-4' : undefined}>
                {/* Name */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-800 mb-1">Name</Text>
                  <Input
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                    autoCapitalize="words"
                    autoCorrect={false}
                    className="border border-gray-300 rounded-md px-3 py-2 text-base"
                  />
                  {errors.name ? (
                    <Text className="text-xs text-red-500 mt-1">{errors.name}</Text>
                  ) : null}
                </View>

                {/* Email */}
                <View className="mb-4">
                  <Text className="text-sm text-gray-800 mb-1">Email</Text>
                  <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="border border-gray-300 rounded-md px-3 py-2 text-base"
                  />
                  {errors.email ? (
                    <Text className="text-xs text-red-500 mt-1">{errors.email}</Text>
                  ) : null}
                </View>

                {/* Server error */}
                {serverError ? (
                  <View className="mb-2">
                    <Text className="text-xs text-red-600">{serverError}</Text>
                  </View>
                ) : null}
              </View>
            )}

            {/* Actions */}
            <View className="flex-row justify-end gap-4 mt-4">
              <Button  variant="outline" onPress={() => router.back()} disabled={isSubmitting}>
                <Text>Cancel</Text>
              </Button>
              <Button onPress={() => handleSubmit()} disabled={isSubmitting || isLoading}>
                <Text>{isSubmitting ? 'Saving...' : 'Save'}</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
