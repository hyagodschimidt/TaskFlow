import {
  addDays,
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
  subDays,
} from 'date-fns'

import type { TaskWorkspaceFilters } from '@/features/task-workspace/types/task-workspace-filters'
import type { TaskQuery } from '@/features/tasks/types/task-query'

export function buildTaskQuery(
  filters: TaskWorkspaceFilters,
  referenceDate: Date = new Date(),
): TaskQuery {
  const query: TaskQuery = {
    search: filters.search,
    status: filters.status,
    priority: filters.priority,
  }

  if (filters.due === 'today') {
    query.dueFrom = startOfDay(referenceDate).toISOString()
    query.dueTo = endOfDay(referenceDate).toISOString()
  }

  if (filters.due === 'this-week') {
    query.dueFrom = startOfWeek(referenceDate, {
      weekStartsOn: 1,
    }).toISOString()

    query.dueTo = endOfWeek(referenceDate, {
      weekStartsOn: 1,
    }).toISOString()
  }

  if (filters.due === 'overdue') {
    query.overdue = true
  }

  if (filters.preset === 'due-soon') {
    query.dueFrom = referenceDate.toISOString()

    query.dueTo = endOfDay(addDays(referenceDate, 7)).toISOString()

    query.activeOnly = true
  }

  if (filters.preset === 'recently-created') {
    query.createdFrom = subDays(referenceDate, 7).toISOString()
  }

  return query
}
