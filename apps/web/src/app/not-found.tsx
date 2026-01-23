'use client'
import { useRouter } from 'next/navigation'

function NotFound() {
  const router = useRouter()
  return (
    <div className="h-screen flex bg-black w-screen text-white">
      <div className="size-full flex gap-6  flex-col  justify-center items-center">
        <span className="text-6xl">404</span>
        <button onClick={()=>router.back()} className='border border-white/50 px-4 py-2 rounded-xl'> {"🮤"} Go Home</button>
      </div>
    </div>
  )
}

export default NotFound
