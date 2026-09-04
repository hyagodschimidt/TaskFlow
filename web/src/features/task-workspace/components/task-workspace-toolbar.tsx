import type { TaskWorkspaceView } from '@/core/settings/app-settings-storage'
import { TaskWorkspaceDueFilterSelect } from '@/features/task-workspace/components/task-workspace-due-filter'
import { TaskWorkspacePriorityFilter } from '@/features/task-workspace/components/task-workspace-priority-filter'
import { TaskWorkspaceQuickFilters } from '@/features/task-workspace/components/task-workspace-quick-filters'
import { TaskWorkspaceSearchInput } from '@/features/task-workspace/components/task-workspace-search-input'
import { TaskWorkspaceStatusFilter } from '@/features/task-workspace/components/task-workspace-status-filter'
import { TaskWorkspaceViewSwitcher } from '@/features/task-workspace/components/task-workspace-view-switcher'
import type {
  TaskWorkspaceFilterActions,
  TaskWorkspaceFilters,
} from '@/features/task-workspace/types/task-workspace-filters'

type TaskWorkspaceToolbarProps = {
  filters: TaskWorkspaceFilters
  filterActions: TaskWorkspaceFilterActions

  view: {
    value: TaskWorkspaceView
    onChange: (view: TaskWorkspaceView) => void
  }
}

export function TaskWorkspaceToolbar({
  filters,
  filterActions,
  view,
}: TaskWorkspaceToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap">
        <TaskWorkspaceSearchInput
          key={filters.search ?? ''}
          initialValue={filters.search ?? ''}
          onCommit={filterActions.setSearch}
        />

        <TaskWorkspaceStatusFilter
          value={filters.status}
          onChange={filterActions.setStatus}
        />

        <TaskWorkspacePriorityFilter
          value={filters.priority}
          onChange={filterActions.setPriority}
        />

        <TaskWorkspaceDueFilterSelect
          value={filters.due}
          onChange={filterActions.setDue}
        />

        <TaskWorkspaceQuickFilters
          filters={filters}
          onApply={filterActions.applyQuickFilter}
        />
      </div>

      <TaskWorkspaceViewSwitcher value={view.value} onChange={view.onChange} />
    </div>
  )
}
