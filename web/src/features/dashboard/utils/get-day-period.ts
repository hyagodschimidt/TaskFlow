export type DayPeriod = 'morning' | 'afternoon' | 'night'

export function getDayPeriod(date = new Date()): DayPeriod {
  const hour = date.getHours()

  if (hour >= 5 && hour < 12) {
    return 'morning'
  }

  if (hour >= 12 && hour < 18) {
    return 'afternoon'
  }

  return 'night'
}
