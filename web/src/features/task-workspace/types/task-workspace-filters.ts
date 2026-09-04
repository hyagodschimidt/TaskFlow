import type { TaskPriority, TaskStatus } from '@/features/tasks/types/task'

export type TaskWorkspaceDueFilter = 'today' | 'this-week' | 'overdue'

export type TaskWorkspacePreset = 'due-soon' | 'recently-created'

export type TaskWorkspaceFilters = {
  search?: string
  status?: TaskStatus
  priority?: TaskPriority
  due?: TaskWorkspaceDueFilter
  preset?: TaskWorkspacePreset
}

export type TaskWorkspaceQuickFilterValues = Pick<
  TaskWorkspaceFilters,
  'status' | 'priority' | 'due' | 'preset'
>

export type TaskWorkspaceFilterActions = {
  setSearch: (value?: string) => void
  setStatus: (status?: TaskStatus) => void
  setPriority: (priority?: TaskPriority) => void
  setDue: (due?: TaskWorkspaceDueFilter) => void
  setPreset: (preset?: TaskWorkspacePreset) => void

  applyQuickFilter: (filters: TaskWorkspaceQuickFilterValues) => void

  clear: () => void
}
