import { format, isSameMonth, isSameYear, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import type { PeriodRange } from '../types/dashboard'

export function getPeriodLabel({ from, to }: PeriodRange) {
  const end = subDays(to, 1)

  if (isSameMonth(from, end)) {
    return `${format(from, 'd', { locale: ptBR })} a ${format(
      end,
      "d 'de' MMMM",
      { locale: ptBR },
    )}`
  }

  if (isSameYear(from, end)) {
    return `${format(from, "d 'de' MMMM", {
      locale: ptBR,
    })} a ${format(end, "d 'de' MMMM", {
      locale: ptBR,
    })}`
  }

  return `${format(from, "d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  })} a ${format(end, "d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  })}`
}
