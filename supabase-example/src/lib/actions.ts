'use server'

import { supabase } from "./supabase"


export const createTask = async (task: TaskType | undefined) => {
  const { error } = await supabase.from('tasks').insert(task).single()
  if (error) {
    console.error('Error: lib/actions.ts:createTask --', error)
  }
}

export const getTasks = async (): Promise<TaskType[] | null> => {
  const { error, data } = await supabase.from('tasks').select('*').order('created_at', {ascending: true})
  if (error) {
    console.error('Error: lib/actions.ts:createTask --', error)
  }
  
  return data
}