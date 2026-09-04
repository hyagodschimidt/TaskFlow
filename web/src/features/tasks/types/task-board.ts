import type { Task } from './task'

export type TaskBoardColumn = {
  items: Task[]
  total: number
  hasMore: boolean
}

export type TaskBoard = {
  pending: TaskBoardColumn
  inProgress: TaskBoardColumn
  completed: TaskBoardColumn
}
