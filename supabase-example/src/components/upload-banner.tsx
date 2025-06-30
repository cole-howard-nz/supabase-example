import TaskForm from "./task-form"

interface UploadBannerProps {
  className?: string | undefined
}

const UploadBanner = ({ className }: UploadBannerProps) => {
  return (
    <header>
      <p className={ `${ className } + ' text-xl font-semibold text-center` }>Create a new task</p>
      <TaskForm/>
    </header>
  )
}

export default UploadBanner