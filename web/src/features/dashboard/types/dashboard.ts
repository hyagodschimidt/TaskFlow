import type { Task } from '@/features/tasks/types/task'

export type DashboardPeriod = 'week' | 'month' | 'quarter' | 'semester'

export type PeriodRange = {
  from: Date
  to: Date
}

export type DashboardAttention = {
  overdue: Task[]
  dueSoon: Task[]
  recentlyCreated: Task[]
}
