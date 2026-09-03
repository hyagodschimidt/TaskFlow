import type { Task } from '@/features/tasks/types/task'

import type { DashboardAttention } from '../types/dashboard'

const ATTENTION_LIMIT = 4

const DUE_SOON_DAYS = 7
const RECENTLY_CREATED_DAYS = 7

function addDays(date: Date, days: number) {
  const result = new Date(date)

  result.setDate(result.getDate() + days)

  return result
}

function subtractDays(date: Date, days: number) {
  return addDays(date, -days)
}

export function getAttentionTasks(
  tasks: Task[],
  referenceDate = new Date(),
): DashboardAttention {
  const dueSoonLimit = addDays(referenceDate, DUE_SOON_DAYS)

  const recentlyCreatedLimit = subtractDays(
    referenceDate,
    RECENTLY_CREATED_DAYS,
  )

  const activeTasks = tasks.filter((task) => task.status !== 'completed')

  const overdue = activeTasks
    .filter((task) => {
      if (!task.dueDate) {
        return false
      }

      return new Date(task.dueDate) < referenceDate
    })
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    )
    .slice(0, ATTENTION_LIMIT)

  const dueSoon = activeTasks
    .filter((task) => {
      if (!task.dueDate) {
        return false
      }

      const dueDate = new Date(task.dueDate)

      return dueDate >= referenceDate && dueDate <= dueSoonLimit
    })
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    )
    .slice(0, ATTENTION_LIMIT)

  const recentlyCreated = activeTasks
    .filter((task) => new Date(task.createdAt) >= recentlyCreatedLimit)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, ATTENTION_LIMIT)

  return {
    overdue,
    dueSoon,
    recentlyCreated,
  }
}
