'use client'
import { TaskContextInterface, TaskType } from '@/types/task.type'
import { createContext, useContext, useState } from 'react'

const TaskContext = createContext<TaskContextInterface | undefined>(undefined)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null)

  return (
    <TaskContext.Provider value={{ currentTask, setCurrentTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext cannot find a TaskProvider parent')
  }

  return context
}
