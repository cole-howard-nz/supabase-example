'use client'
import { deleteTask, editTask, getTasks } from "@/lib/actions"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { NewTaskType, TaskType } from "@/types/task.type"
import { Input } from "./ui/input"
import Image from "next/image"
import { Textarea } from "./ui/textarea"

const TaskGrid = () => {
  const [tasks, setTasks] = useState<TaskType[] | null>(null)
  const [newTask, setNewTask] = useState<NewTaskType>({ name: '', description: '' })
  const [bEdit, setEdit] = useState<number>(-1)

  const handleGetTasks = async () => {
    setTasks(await getTasks())
  }

  const handleDeleteTask = async (task_id: number) => {
    await deleteTask(task_id)
    handleGetTasks()
  }

  const handleEditTask = async (task: TaskType) => {
    bEdit === task.id ? setEdit(-1) : setEdit(task.id)
    setNewTask(task)
    handleGetTasks()
  }

  const handleUpdateTask = async (task_id: number) => {
    setEdit(-1)
    await editTask(newTask, task_id)
    handleGetTasks()
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  return (
    <section className='flex flex-col space-y-2 mt-4 items-center justify-center'>
      {(tasks && tasks.length === 0) && <p className='text-sm'>No tasks to list, create one above</p>}

      {tasks && tasks.map((task, i) =>
        <Card key={i} className='overflow-hidden pb-0 w-100'>
          <CardContent>
            {
                bEdit === task.id ? 
                <>
                  <Input 
                    type='text' 
                    name='name'
                    className='text-sm mb-1'
                    value={ newTask?.name }
                    onChange={ e => setNewTask(prev => ({...prev, name: e.target.value}))}
                    required/>

                  <Textarea 
                    name='description'
                    className='text-sm mb-1'
                    value={ newTask?.description }
                    onChange={ e => setNewTask(prev => ({...prev, description: e.target.value}))}
                    required/>
                </>
                :
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='font-semibold leading-5 mb-2'>{task.name}</p>
                    <p className='text-sm leading-4 text-cov'>{task.description}</p>
                  </div>
                  
                  <img
                    className='w-20 h-20 m-auto' 
                    src={task.image_url || ''} />
                </div>
            }
            

            <div className='flex justify-center items-center pt-6'>
              <Button 
                className='w-50 rounded-[0]' 
                variant={'secondary'}
                onClick={ () => handleEditTask(task) }>
                  Edit
              </Button>

              {
                bEdit === task.id ? 
                <Button 
                  className='w-50 rounded-[0]' 
                  variant={'secondary'}
                  onClick={ () => handleUpdateTask(task.id) }>
                    Save
                </Button>
                : 
                <Button 
                  className='w-50 rounded-[0]' 
                  variant={'destructive'}
                  onClick={ () => handleDeleteTask(task.id) }>
                    Delete
                </Button>  
              }
              
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  )
}

export default TaskGrid