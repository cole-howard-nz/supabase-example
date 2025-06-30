type TaskType = {
  id: number
  created_at: string
  name: string
  description: string
}

type NewTaskType = Omit<TaskType, 'id' | 'created_at'>