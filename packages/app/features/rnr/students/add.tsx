'use client'

import { useRouter } from 'solito/navigation'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useCreateStudent, getGetStudentsQueryKey } from '@my/api/generated/client/students/students'
import { useQueryClient } from '@tanstack/react-query'
// import { Button, Input, Text, View } from '@my/ui/components'

import { Button } from '@my/ui/src/components/button'
import { Text } from '@my/ui/src/components/text'
import { Input } from '@my/ui/src/components/input'
import { View } from 'react-native'

export function AddStudentScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [serverError, setServerError] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const router = useRouter()

  const createMutation = useCreateStudent({
    mutation: {
      onSuccess: () => {
        setServerError(null)
        router.back()
        queryClient.invalidateQueries({ queryKey: getGetStudentsQueryKey() })
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message || err?.message || 'Failed to create student.'
        console.log(err)
        setServerError(message)
      },
    },
  })

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

    createMutation.mutate({
      data: {
        name: name.trim(),
        email: email.trim(),
      },
    })
  }

  const isSubmitting = createMutation.isPending

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="self-center flex-1 w-full max-w-xl px-4 py-6">
          {/* Header */}
          <View className="mb-6">
            <Text className="mb-1 text-2xl font-semibold text-gray-900">Add Student</Text>
            <Text className="text-sm text-gray-500">Create a new student record.</Text>
          </View>

          {/* Form */}
          <View className={'space-y-4'}>
            {/* Name */}
            <View className="mb-4">
              <Text className="mb-1 text-sm font-medium text-gray-800">Name</Text>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
                className="px-3 py-2 text-base border border-gray-300 rounded-md"
                autoCapitalize="words"
                autoCorrect={false}
              />
              {errors.name ? (
                <Text className="mt-1 text-xs text-red-500">{errors.name}</Text>
              ) : null}
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="mb-1 text-sm font-medium text-gray-800">Email</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="px-3 py-2 text-base border border-gray-300 rounded-md"
              />
              {errors.email ? (
                <Text className="mt-1 text-xs text-red-500">{errors.email}</Text>
              ) : null}
            </View>

            {/* Server error */}
            {serverError ? (
              <View className="mb-4">
                <Text className="text-xs text-red-600">{serverError}</Text>
              </View>
            ) : null}

            {/* Actions */}
            <View className="flex-row justify-end mt-4 gap-4">
              <Button
              variant={'outline'}
                onPress={() => router.back()}
              >
                <Text>Cancel</Text>
              </Button>

              <Button  onPress={() => handleSubmit()} disabled={isSubmitting}>
                <Text>
                  {isSubmitting ? 'Creating...' : 'Create'}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
