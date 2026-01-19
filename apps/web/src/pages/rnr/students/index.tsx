'use client'
import { StudentListScreen } from '@my/features/(react-native-reusables)/students/list'
import { useEffect, useState } from 'react'
export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // If we are on the server, we render nothing or a simple placeholder
  // This prevents the "typeof" error during the server-side refresh
  if (!isMounted) return null
  return (
    <>
      <StudentListScreen />
    </>
  )

}
