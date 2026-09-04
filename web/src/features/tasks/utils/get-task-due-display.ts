import { addDays, formatDistanceStrict, isAfter, isBefore } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import type { Task } from '@/features/tasks/types/task'

const DUE_SOON_DAYS = 7

export type TaskDueDisplay = {
  label: string
  overdue: boolean
  dueSoon: boolean
}

export function getTaskDueDisplay(
  task: Task,
  referenceDate: Date = new Date(),
): TaskDueDisplay {
  if (!task.dueDate) {
    return {
      label: 'Sem prazo',
      overdue: false,
      dueSoon: false,
    }
  }

  const dueDate = new Date(task.dueDate)

  const distance = formatDistanceStrict(referenceDate, dueDate, {
    locale: ptBR,
  })

  const isPastDue = isBefore(dueDate, referenceDate)

  const overdue = isPastDue && task.status !== 'completed'

  const dueSoon =
    task.status !== 'completed' &&
    !isPastDue &&
    !isAfter(dueDate, addDays(referenceDate, DUE_SOON_DAYS))

  if (overdue) {
    return {
      label: `Atrasada há ${distance}`,
      overdue: true,
      dueSoon: false,
    }
  }

  if (isPastDue) {
    return {
      label: `Há ${distance}`,
      overdue: false,
      dueSoon: false,
    }
  }

  return {
    label: `Em ${distance}`,
    overdue: false,
    dueSoon,
  }
}
