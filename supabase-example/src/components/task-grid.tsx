'use client'
import { getTasks } from "@/lib/actions"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

const TaskGrid = () => {
  const [tasks, setTasks] = useState<TaskType[] | null>()

  const handleGetTasks = async () => {
    setTasks(await getTasks())
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  console.log(tasks)


  return (
    <section className='flex flex-col space-y-2 items-center justify-center'>
      {tasks && tasks.map((task, i) =>
        <Card key={i} className='w-100'>
          <CardContent>
            <p>{task.name}</p>
            <p>{task.description}</p>
          </CardContent>
        </Card>
      )}
    </section>
  )
}

export default TaskGrid