// import dynamic from 'next/dynamic';

// const DialogStudentListScreen = dynamic(() => import('app/features/rnr/students/list'), {
//   ssr: false,
// });
import { StudentListScreen } from '@my/features/(react-native-reusables)/students/list'

export default function Home() {
  return (
    <>
      <StudentListScreen />
    </>
  )
}
