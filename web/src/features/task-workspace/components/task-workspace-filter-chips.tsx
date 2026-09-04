import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  taskDueFilterOptions,
  taskPresetFilterOptions,
  taskPriorityFilterOptions,
  taskStatusFilterOptions,
} from '@/features/task-workspace/constants/task-workspace-filter-options'
import type {
  TaskWorkspaceFilterActions,
  TaskWorkspaceFilters,
} from '@/features/task-workspace/types/task-workspace-filters'

type TaskWorkspaceFilterChipsProps = {
  filters: TaskWorkspaceFilters
  filterActions: TaskWorkspaceFilterActions
  hasActiveFilters: boolean
}

type TaskWorkspaceFilterChipProps = {
  label: string
  onRemove: () => void
}

function TaskWorkspaceFilterChip({
  label,
  onRemove,
}: TaskWorkspaceFilterChipProps) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition-colors"
    >
      <span>{label}</span>
      <X className="size-3.5" />
    </button>
  )
}

export function TaskWorkspaceFilterChips({
  filterActions,
  filters,
  hasActiveFilters,
}: TaskWorkspaceFilterChipsProps) {
  const status = taskStatusFilterOptions.find(
    (option) => option.value === filters.status,
  )

  const priority = taskPriorityFilterOptions.find(
    (option) => option.value === filters.priority,
  )

  const due = taskDueFilterOptions.find(
    (option) => option.value === filters.due,
  )
  const preset = taskPresetFilterOptions.find(
    (option) => option.value === filters.preset,
  )

  if (!hasActiveFilters) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status && (
        <TaskWorkspaceFilterChip
          label={status.label}
          onRemove={() => filterActions.setStatus(undefined)}
        />
      )}

      {priority && (
        <TaskWorkspaceFilterChip
          label={priority.label}
          onRemove={() => filterActions.setPriority(undefined)}
        />
      )}

      {due && (
        <TaskWorkspaceFilterChip
          label={due.label}
          onRemove={() => filterActions.setDue(undefined)}
        />
      )}

      {preset && (
        <TaskWorkspaceFilterChip
          label={preset.label}
          onRemove={() => filterActions.setPreset(undefined)}
        />
      )}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={filterActions.clear}
        className="text-muted-foreground"
      >
        <X className="size-4" />
        Limpar filtros
      </Button>
    </div>
  )
}
