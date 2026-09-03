import type { Task } from '@/features/tasks/types/task'

export type DashboardAttention = {
  overdue: Task[]
  dueSoon: Task[]
  recentlyCreated: Task[]
}
