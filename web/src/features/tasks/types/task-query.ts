import type { TaskPriority, TaskStatus } from './task'

export type TaskQuery = {
  search?: string
  status?: TaskStatus
  priority?: TaskPriority

  dueFrom?: string
  dueTo?: string
  overdue?: boolean

  createdFrom?: string

  activeOnly?: boolean
}
