'use server'
import { NewTaskType, TaskType } from "@/types/task.type"
import { supabase } from "./supabase"


export const createTask = async (task: NewTaskType) => {
  const { file, ...task_data } = task

  console.log(task_data)
  const { error, data } = await supabase.from('tasks').insert(task_data).select().single()
  if (error) {
    console.error('Error: lib/actions.ts:createTask --', error)
  }

  return data
}

export const getTasks = async (): Promise<TaskType[] | null> => {
  const { error, data } = await supabase.from('tasks').select('*').order('created_at', {ascending: true})
  if (error) {
    console.error('Error: lib/actions.ts:getTasks --', error)
  }
  
  return data as TaskType[]
}

export const deleteTask = async (task_id: number) => {
  const { error } = await supabase.from('tasks').delete().eq("id", task_id)
  if (error) {
    console.error('Error: lib/actions.ts:deleteTask --', error)
  }
}

export const editTask = async (new_task: NewTaskType, task_id: number) => {
  const { error } = await supabase.from('tasks').update({ name: new_task.name, description: new_task.description }).eq("id", task_id)
  
  if (error) {
    console.error('Error: lib/actions.ts:editTask --', error)
  }
}

export const uploadImage = async (file: File): Promise<string | null> => {
  const filePath = `${file.name}-${Date.now()}`
  const { error } = await supabase.storage.from('tasks-images').upload(filePath, file)

  if (error) {
    console.error('Error: lib/actions.ts:uploadImage --', error)
    return null
  }

  const { data } = await supabase.storage.from('tasks-images').getPublicUrl(filePath)
  return data.publicUrl
}