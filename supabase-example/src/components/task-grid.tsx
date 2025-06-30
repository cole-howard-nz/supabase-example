'use client'
import { deleteTask, getTasks } from "@/lib/actions"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

const TaskGrid = () => {
  const [tasks, setTasks] = useState<TaskType[] | null>()

  const handleGetTasks = async () => {
    setTasks(await getTasks())
  }

  const handleDeleteTask = async (task_id: number) => {
    await deleteTask(task_id)
    handleGetTasks()
  }

  const handleEditTask = async (task_id: number) => {
    handleGetTasks()
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  console.log(tasks)

  return (
    <section className='flex flex-col space-y-2 mt-4 items-center justify-center'>
      {tasks && tasks.map((task, i) =>
        <Card key={i} className='overflow-hidden pb-0 w-100'>
          <CardContent>
            <p>{task.name}</p>
            <p>{task.description}</p>

            <div className='flex justify-center items-center pt-6'>
              <Button 
                className='w-50 rounded-[0]' 
                variant={'secondary'}
                onClick={ () => handleEditTask(task.id) }>
                  Edit
              </Button>

              <Button 
                className='w-50 rounded-[0]' 
                variant={'secondary'}
                onClick={ () => handleDeleteTask(task.id) }>
                  Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  )
}

export default TaskGrid