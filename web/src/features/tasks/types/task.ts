export type TaskStatus = 'pending' | 'in_progress' | 'completed'

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export type Task = {
  id: number

  title: string
  description: string

  status: TaskStatus
  priority: TaskPriority

  createdByUserId: number
  assignedToUserId: number
  companyId: number

  createdAt: string
  dueDate: string | null

  completionReport: string | null
  completedAt: string | null
}
