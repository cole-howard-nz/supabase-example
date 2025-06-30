import TaskGrid from "@/components/task-grid"
import UploadBanner from "@/components/upload-banner"

const Home = () => {
  return (
    <main className='flex flex-col justify-center items-center'>
      <UploadBanner className='mt-8 mb-4' />
      <TaskGrid />
    </main>
  )
}

export default Home
