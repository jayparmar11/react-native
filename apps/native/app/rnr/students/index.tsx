// import dynamic from 'next/dynamic';

// const DialogStudentListScreen = dynamic(() => import('app/features/rnr/students/list'), {
//   ssr: false,
// });
import { StudentListScreen } from 'app/features/rnr/students/list'

export default function Home() {
  return (
    <>
      <StudentListScreen />
    </>
  )
}
