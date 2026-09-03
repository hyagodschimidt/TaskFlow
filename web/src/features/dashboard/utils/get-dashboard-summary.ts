import type { Task } from '@/features/tasks/types/task'
import type { TaskSummary } from '@/features/tasks/types/task-summary'

import type { PeriodRange } from '../types/dashboard'

function isDateInRange(date: string | null, range: PeriodRange) {
  if (!date) return false

  const timestamp = new Date(date).getTime()

  return timestamp >= range.from.getTime() && timestamp <= range.to.getTime()
}

export function getDashboardSummary(
  tasks: Task[],
  range: PeriodRange,
  referenceDate = new Date(),
): TaskSummary {
  const pending = tasks.filter(
    (task) => task.status === 'pending' && isDateInRange(task.dueDate, range),
  ).length

  const inProgress = tasks.filter(
    (task) =>
      task.status === 'in_progress' && isDateInRange(task.dueDate, range),
  ).length

  const completed = tasks.filter(
    (task) =>
      task.status === 'completed' && isDateInRange(task.completedAt, range),
  ).length

  const overdue = tasks.filter((task) => {
    if (
      task.status === 'completed' ||
      !task.dueDate ||
      !isDateInRange(task.dueDate, range)
    ) {
      return false
    }

    return new Date(task.dueDate) < referenceDate
  }).length

  const periodTasks = tasks.filter((task) => {
    if (task.status === 'completed') {
      return isDateInRange(task.completedAt, range)
    }

    return isDateInRange(task.dueDate, range)
  }).length

  return {
    total: periodTasks,
    pending,
    inProgress,
    completed,
    overdue,
  }
}
