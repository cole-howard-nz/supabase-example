'use server'

import { supabase } from "./supabase"


export const createTask = async (task: NewTaskType) => {
  const { error, data } = await supabase.from('tasks').insert(task).select().single()
  if (error) {
    console.error('Error: lib/actions.ts:createTask --', error)
  }

  console.log('CreateTask:',data)
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