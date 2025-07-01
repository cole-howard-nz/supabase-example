'use client'
import { createTask, uploadImage } from "@/lib/actions"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ChangeEvent, useState } from "react"
import { NewTaskType } from "@/types/task.type"

const TaskForm = () => {
  const [task, setTask] = useState<NewTaskType>({ name: '', description: '', file: undefined})

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    let imageUrl: string | null = null
    if (task.file) {
      imageUrl = await uploadImage(task.file)
    }

    const taskToSubmit = {
      name: task.name,
      description: task.description,
      image_url: imageUrl
    }

    await createTask(taskToSubmit)
    setTask({ name: '', description: '', file: undefined })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setTask({ ...task , file })
    }
  }

  return (
    <form 
      onSubmit={ handleSubmit } 
      className='w-100'>
        <Input 
          type='text' 
          name='name'
          className='text-sm mb-1'
          value={ task.name }
          placeholder='Enter a name for this task'
          onChange={ e => setTask(prev => ({...prev, name: e.target.value}))}
          required/>

        <Input 
          type='text' 
          name='description'
          className='text-sm mb-1'
          value={ task.description }
          placeholder='Enter a description for this task'
          onChange={ e => setTask(prev => ({...prev, description: e.target.value}))}
          required/>

        <Input 
          type='file'
          accept='image/*'
          className='text-sm mb-1'
          onChange={ handleFileChange }
          required/>

        <Button type='submit' className='my- w-full'>Add to list</Button>
    </form>
  )
}

export default TaskForm