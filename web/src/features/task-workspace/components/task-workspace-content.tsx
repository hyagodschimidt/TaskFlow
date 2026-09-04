import { TaskWorkspaceFilterChips } from '@/features/task-workspace/components/task-workspace-filter-chips'
import { TaskWorkspaceKanbanSkeleton } from '@/features/task-workspace/components/task-workspace-kanban.skeleton'
import { TaskWorkspaceKanbanContent } from '@/features/task-workspace/components/task-workspace-kanban-content'
import { TaskWorkspaceListSkeleton } from '@/features/task-workspace/components/task-workspace-list.skeleton'
import { TaskWorkspaceListContent } from '@/features/task-workspace/components/task-workspace-list-content'
import { TaskWorkspaceToolbar } from '@/features/task-workspace/components/task-workspace-toolbar'
import { TaskSummary } from '@/features/tasks/components/task-summary'
import { TaskSummarySkeleton } from '@/features/tasks/components/task-summary.skeleton'

import { useTaskWorkspace } from '../hooks/use-task-workspace'

type TaskWorkspaceContentProps = {
  taskWorkspaceData: ReturnType<typeof useTaskWorkspace>
}

export function TaskWorkspaceContent({
  taskWorkspaceData,
}: TaskWorkspaceContentProps) {
  if (taskWorkspaceData.status === 'pending') {
    return (
      <div className="mt-8 space-y-6">
        <TaskSummarySkeleton />

        {taskWorkspaceData.view === 'kanban' ? (
          <TaskWorkspaceKanbanSkeleton />
        ) : (
          <TaskWorkspaceListSkeleton />
        )}
      </div>
    )
  }

  if (taskWorkspaceData.status === 'error') {
    return (
      <div className="mt-8">
        <p className="text-muted-foreground">
          Não foi possível carregar suas tarefas.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-6">
      <TaskSummary summary={taskWorkspaceData.summary} />

      <TaskWorkspaceToolbar
        filters={taskWorkspaceData.filters}
        filterActions={taskWorkspaceData.filterActions}
        view={{
          value: taskWorkspaceData.view,
          onChange: taskWorkspaceData.setView,
        }}
      />

      <TaskWorkspaceFilterChips
        filters={taskWorkspaceData.filters}
        filterActions={taskWorkspaceData.filterActions}
        hasActiveFilters={taskWorkspaceData.hasActiveFilters}
      />

      {taskWorkspaceData.view === 'kanban' && (
        <TaskWorkspaceKanbanContent boardState={taskWorkspaceData.boardState} />
      )}

      {taskWorkspaceData.view === 'list' && (
        <TaskWorkspaceListContent
          key={JSON.stringify(taskWorkspaceData.taskQuery)}
          query={taskWorkspaceData.taskQuery}
        />
      )}
    </div>
  )
}
