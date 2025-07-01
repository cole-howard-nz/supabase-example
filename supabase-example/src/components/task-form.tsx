'use client'
import { createTask } from "@/lib/actions"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"

const TaskForm = () => {
  const [task, setTask] = useState({ name: '', description: ''})

  const handleSubmit = async () => {
    await createTask(task)
    setTask({ name: '', description: '' })
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

        <Button type='submit' className='my- w-full'>Add to list</Button>
    </form>
  )
}

export default TaskForm