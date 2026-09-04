import type { Task } from '../types/task'
import type { TaskSummary } from '../types/task-summary'

export function getTaskSummary(
  tasks: Task[],
  referenceDate: Date = new Date(),
): TaskSummary {
  const pending = tasks.filter((task) => task.status === 'pending').length

  const inProgress = tasks.filter(
    (task) => task.status === 'in_progress',
  ).length

  const completed = tasks.filter((task) => task.status === 'completed').length

  const overdue = tasks.filter((task) => {
    if (!task.dueDate) {
      return false
    }

    if (task.status === 'completed') {
      return false
    }

    return new Date(task.dueDate) < referenceDate
  }).length

  return {
    total: tasks.length,
    pending,
    inProgress,
    completed,
    overdue,
  }
}
