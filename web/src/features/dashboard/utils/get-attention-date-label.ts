import { differenceInCalendarDays } from 'date-fns'

export function getDueDateLabel(dueDate: string, referenceDate = new Date()) {
  const difference = differenceInCalendarDays(new Date(dueDate), referenceDate)

  if (difference === 0) {
    return 'Hoje'
  }

  if (difference === 1) {
    return 'Amanhã'
  }

  if (difference === -1) {
    return '1 dia em atraso'
  }

  if (difference < 0) {
    return `${Math.abs(difference)} dias em atraso`
  }

  return `Em ${difference} dias`
}

export function getCreatedAtLabel(
  createdAt: string,
  referenceDate = new Date(),
) {
  const difference = differenceInCalendarDays(
    referenceDate,
    new Date(createdAt),
  )

  if (difference === 0) {
    return 'Hoje'
  }

  if (difference === 1) {
    return 'Ontem'
  }

  return `Há ${difference} dias`
}
