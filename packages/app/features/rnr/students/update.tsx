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

import { Button as RNRButton } from '@my/ui/src/components/button'
import { Input as RNRInput } from '@my/ui/src/components/input'
import { Text as RNRText } from '@my/ui/src/components/text'
import { View as RNRView } from 'react-native'

type UpdateStudentScreenProps = {
  id: string
}

const Form = Platform.OS === 'web' ? 'form' : RNRView

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
        <RNRView className="flex-1 px-4 py-8">
          <RNRView className="w-full max-w-md mx-auto">
            {/* Header */}
            <RNRView className="items-center mb-6">
              <RNRText className="text-2xl font-semibold text-gray-900">Edit Student</RNRText>
              <RNRText className="text-xs text-gray-500 mt-1">
                Update the student information.
              </RNRText>
            </RNRView>

            {/* Loading state before data */}
            {isLoading && (
              <RNRText className="text-sm text-gray-600 mb-4">Loading student...</RNRText>
            )}

            {/* Form */}
            {!isLoading && (
              <Form
                className={Platform.OS === 'web' ? 'flex flex-col gap-4' : undefined}
                onSubmit={Platform.OS === 'web' ? handleSubmit : undefined}
              >
                {/* Name */}
                <RNRView className="mb-4">
                  <RNRText className="text-sm text-gray-800 mb-1">Name</RNRText>
                  <RNRInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter name"
                    autoCapitalize="words"
                    autoCorrect={false}
                    className="border border-gray-300 rounded-md px-3 py-2 text-base"
                  />
                  {errors.name ? (
                    <RNRText className="text-xs text-red-500 mt-1">{errors.name}</RNRText>
                  ) : null}
                </RNRView>

                {/* Email */}
                <RNRView className="mb-4">
                  <RNRText className="text-sm text-gray-800 mb-1">Email</RNRText>
                  <RNRInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="border border-gray-300 rounded-md px-3 py-2 text-base"
                  />
                  {errors.email ? (
                    <RNRText className="text-xs text-red-500 mt-1">{errors.email}</RNRText>
                  ) : null}
                </RNRView>

                {/* Server error */}
                {serverError ? (
                  <RNRView className="mb-2">
                    <RNRText className="text-xs text-red-600">{serverError}</RNRText>
                  </RNRView>
                ) : null}
              </Form>
            )}

            {/* Actions */}
            <RNRView className="flex-row justify-end gap-4 mt-4">
              <RNRButton
                onPress={() => router.back()}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white"
              >
                <RNRText className="text-sm text-gray-700">Cancel</RNRText>
              </RNRButton>
              <RNRButton
                onPress={Platform.OS === 'web' ? undefined : () => handleSubmit()}
                disabled={isSubmitting || isLoading}
                className="px-4 py-2 rounded-md bg-blue-600 disabled:bg-blue-400"
              >
                <RNRText className="text-sm text-white">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </RNRText>
              </RNRButton>
            </RNRView>
          </RNRView>
        </RNRView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
