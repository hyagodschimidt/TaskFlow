import { routes } from '@/app/router/routes'
import type { TaskWorkspaceFilters } from '@/features/task-workspace/types/task-workspace-filters'

export function getTaskWorkspaceHref(filters: TaskWorkspaceFilters = {}) {
  const searchParams = new URLSearchParams()

  if (filters.search) {
    searchParams.set('search', filters.search)
  }

  if (filters.status) {
    searchParams.set('status', filters.status)
  }

  if (filters.priority) {
    searchParams.set('priority', filters.priority)
  }

  if (filters.due) {
    searchParams.set('due', filters.due)
  }

  if (filters.preset) {
    searchParams.set('preset', filters.preset)
  }

  const query = searchParams.toString()

  return query ? `${routes.taskWorkspace()}?${query}` : routes.taskWorkspace()
}
