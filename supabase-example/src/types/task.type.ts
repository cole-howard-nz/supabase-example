export type TaskType = {
  id: number
  created_at: string
  name: string
  description: string
  file?: File
  image_url?: string | null
}

export type NewTaskType = Omit<TaskType, 'id' | 'created_at'>

export interface TaskContextInterface {
  currentTask: TaskType | null
  setCurrentTask: (task: TaskType | null) => void
}