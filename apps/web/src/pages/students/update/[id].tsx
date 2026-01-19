import { UpdateStudentScreen } from '@my/features/(tamagui)/students/update'
import { useRouter } from 'next/router'

export default function Update() {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <UpdateStudentScreen id={id as string} />
    </>
  )
}
