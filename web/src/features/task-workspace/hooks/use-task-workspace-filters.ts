import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import type {
  TaskWorkspaceDueFilter,
  TaskWorkspaceFilterActions,
  TaskWorkspaceFilters,
  TaskWorkspacePreset,
  TaskWorkspaceQuickFilterValues,
} from '@/features/task-workspace/types/task-workspace-filters'
import type { TaskPriority, TaskStatus } from '@/features/tasks/types/task'

const validStatuses: TaskStatus[] = ['pending', 'in_progress', 'completed']

const validPriorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent']

const validDueFilters: TaskWorkspaceDueFilter[] = [
  'today',
  'this-week',
  'overdue',
]

function getValidValue<T extends string>(
  value: string | null,
  validValues: T[],
): T | undefined {
  if (!value) {
    return undefined
  }

  return validValues.includes(value as T) ? (value as T) : undefined
}

export function useTaskWorkspaceFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const validPresets: TaskWorkspacePreset[] = ['due-soon', 'recently-created']

  const filters: TaskWorkspaceFilters = {
    search: searchParams.get('search') || undefined,

    status: getValidValue(searchParams.get('status'), validStatuses),

    priority: getValidValue(searchParams.get('priority'), validPriorities),

    due: getValidValue(searchParams.get('due'), validDueFilters),

    preset: getValidValue(searchParams.get('preset'), validPresets),
  }

  const setFilter = useCallback(
    (key: keyof TaskWorkspaceFilters, value?: string) => {
      setSearchParams((current) => {
        const next = new URLSearchParams(current)

        if (!value) {
          next.delete(key)
        } else {
          next.set(key, value)
        }

        return next
      })
    },
    [setSearchParams],
  )

  const clearFilters = useCallback(() => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)

      next.delete('status')
      next.delete('priority')
      next.delete('due')
      next.delete('preset')

      return next
    })
  }, [setSearchParams])

  const setSearch = (value?: string) => {
    setFilter('search', value?.trim() || undefined)
  }

  const setStatus = (status?: TaskStatus) => {
    setFilter('status', status)
  }

  const setPriority = (priority?: TaskPriority) => {
    setFilter('priority', priority)
  }

  const setDue = (due?: TaskWorkspaceDueFilter) => {
    setFilter('due', due)
  }

  const setPreset = (preset?: TaskWorkspacePreset) => {
    setFilter('preset', preset)
  }

  const applyQuickFilter = useCallback(
    (preset: TaskWorkspaceQuickFilterValues) => {
      setSearchParams((current) => {
        const next = new URLSearchParams(current)

        next.delete('status')
        next.delete('priority')
        next.delete('due')
        next.delete('preset')

        if (preset.status) {
          next.set('status', preset.status)
        }

        if (preset.priority) {
          next.set('priority', preset.priority)
        }

        if (preset.due) {
          next.set('due', preset.due)
        }

        if (preset.preset) {
          next.set('preset', preset.preset)
        }

        return next
      })
    },
    [setSearchParams],
  )

  const hasActiveFilters = Boolean(
    filters.status || filters.priority || filters.due || filters.preset,
  )
  const actions: TaskWorkspaceFilterActions = {
    setSearch,
    setStatus,
    setPriority,
    setDue,
    setPreset,

    applyQuickFilter,
    clear: clearFilters,
  }

  return {
    filters,
    actions,
    hasActiveFilters,
  }
}
