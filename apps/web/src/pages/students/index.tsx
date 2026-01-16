import { StudentListScreen } from 'app/features/students/list'
export default function Home() {
  return (
    <>
      <main>
        {/* <View className="bg-green-100">
          <Text className="text-3xl font-bold text-green-500 underline">Hello world!</Text>
        </View> */}
        <StudentListScreen />
      </main>
    </>
  )
}
