import type { Task } from '@/features/tasks/types/task'

export type WorkOverviewAttention = {
  overdue: Task[]
  dueSoon: Task[]
  recentlyCreated: Task[]
}
