import type { Task } from '@/features/tasks/types/task'
import type { TaskQuery } from '@/features/tasks/types/task-query'

export function filterMockTasks(
  tasks: Task[],
  query: TaskQuery,
  referenceDate: Date,
): Task[] {
  const normalizedSearch = query.search?.trim().toLowerCase()

  return tasks.filter((task) => {
    if (normalizedSearch) {
      const matchesSearch =
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch)

      if (!matchesSearch) {
        return false
      }
    }

    if (query.status && task.status !== query.status) {
      return false
    }

    if (query.priority && task.priority !== query.priority) {
      return false
    }

    if (query.overdue) {
      if (!task.dueDate) {
        return false
      }

      const isOverdue =
        new Date(task.dueDate) < referenceDate && task.status !== 'completed'

      if (!isOverdue) {
        return false
      }
    }

    if (query.dueFrom || query.dueTo) {
      if (!task.dueDate) {
        return false
      }

      const dueDate = new Date(task.dueDate)

      if (query.dueFrom && dueDate < new Date(query.dueFrom)) {
        return false
      }

      if (query.dueTo && dueDate > new Date(query.dueTo)) {
        return false
      }
    }

    if (query.activeOnly && task.status === 'completed') {
      return false
    }

    if (query.createdFrom) {
      const createdAt = new Date(task.createdAt)
      const createdFrom = new Date(query.createdFrom)

      if (createdAt < createdFrom) {
        return false
      }
    }

    return true
  })
}
