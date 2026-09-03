import {
  addMonths,
  addQuarters,
  addWeeks,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from 'date-fns'

import type { DashboardPeriod, PeriodRange } from '../types/dashboard'

export function getPeriodRange(
  period: DashboardPeriod,
  referenceDate: Date,
): PeriodRange {
  switch (period) {
    case 'week': {
      const from = startOfWeek(referenceDate, {
        weekStartsOn: 1,
      })

      return {
        from,
        to: addWeeks(from, 1),
      }
    }

    case 'month': {
      const from = startOfMonth(referenceDate)

      return {
        from,
        to: addMonths(from, 1),
      }
    }

    case 'quarter': {
      const from = startOfQuarter(referenceDate)

      return {
        from,
        to: addQuarters(from, 1),
      }
    }

    case 'semester': {
      const yearStart = startOfYear(referenceDate)

      const semesterStartMonth = referenceDate.getMonth() < 6 ? 0 : 6

      const from = addMonths(yearStart, semesterStartMonth)

      return {
        from,
        to: addMonths(from, 6),
      }
    }
  }
}
