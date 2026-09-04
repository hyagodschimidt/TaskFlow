import { Check, Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type {
  TaskWorkspaceFilters,
  TaskWorkspaceQuickFilterValues,
} from '@/features/task-workspace/types/task-workspace-filters'

import {
  type TaskWorkspaceQuickFilter,
  taskWorkspaceQuickFilters,
} from '../constants/task-workspace-quick-filters'

type TaskWorkspaceQuickFiltersProps = {
  onApply: (filters: TaskWorkspaceQuickFilter['filters']) => void
  filters: TaskWorkspaceFilters
}

export function TaskWorkspaceQuickFilters({
  filters,
  onApply,
}: TaskWorkspaceQuickFiltersProps) {
  function isQuickFilterActive(
    current: TaskWorkspaceFilters,
    quickFilter: TaskWorkspaceQuickFilterValues,
  ) {
    return (
      current.status === quickFilter.status &&
      current.priority === quickFilter.priority &&
      current.due === quickFilter.due &&
      current.preset === quickFilter.preset
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button type="button" variant="outline">
            <Filter />
            Filtros rápidos
          </Button>
        }
      />

      <DropdownMenuContent align="start">
        {taskWorkspaceQuickFilters.map((quickFilter) => {
          const isActive = isQuickFilterActive(filters, quickFilter.filters)

          return (
            <DropdownMenuItem
              key={quickFilter.id}
              onClick={() => onApply(quickFilter.filters)}
              className="flex items-center justify-between"
            >
              {quickFilter.label}

              {isActive && <Check className="text-primary size-4" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
