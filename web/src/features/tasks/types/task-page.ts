import type { Task } from '@/features/tasks/types/task'
import type { TaskQuery } from '@/features/tasks/types/task-query'

export type TaskPage = {
  items: Task[]
  page: number
  pageSize: number
  total: number
  hasMore: boolean
}

export type TaskPageRequest = {
  query: TaskQuery
  page: number
  pageSize: number
}
