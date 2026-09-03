import { endOfWeek, isWithinInterval, startOfWeek } from 'date-fns'

import type { Task } from '@/features/tasks/types/task'

export function getDashboardShortcuts(
  tasks: Task[],
  referenceDate = new Date(),
) {
  const weekRange = {
    from: startOfWeek(referenceDate, {
      weekStartsOn: 1,
    }),
    to: endOfWeek(referenceDate, {
      weekStartsOn: 1,
    }),
  }

  const urgentThisWeek = tasks.filter((task) => {
    if (
      task.status === 'completed' ||
      task.priority !== 'urgent' ||
      !task.dueDate
    ) {
      return false
    }

    return isWithinInterval(new Date(task.dueDate), {
      start: weekRange.from,
      end: weekRange.to,
    })
  }).length

  return {
    urgentThisWeek,
  }
}
