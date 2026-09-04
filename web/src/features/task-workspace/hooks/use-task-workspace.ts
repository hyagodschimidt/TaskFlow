import { useTaskWorkspaceFilters } from '@/features/task-workspace/hooks/use-task-workspace-filters'
import { useTaskWorkspaceView } from '@/features/task-workspace/hooks/use-task-workspace-view'
import { buildTaskQuery } from '@/features/task-workspace/utils/build-task-query'
import { useTaskBoard } from '@/features/tasks/hooks/use-task-board'
import { useTasks } from '@/features/tasks/hooks/use-tasks'
import { MOCK_REFERENCE_DATE } from '@/features/tasks/mocks/tasks.mock'
import { getTaskSummary } from '@/features/tasks/utils/get-task-summary'

export function useTaskWorkspace() {
  const referenceDate = MOCK_REFERENCE_DATE

  const taskWorkspaceFilters = useTaskWorkspaceFilters()
  const taskWorkspaceView = useTaskWorkspaceView()

  const tasksQuery = useTasks()

  const taskQuery = buildTaskQuery(taskWorkspaceFilters.filters, referenceDate)
  const boardQuery = useTaskBoard(taskQuery, 5)

  const workspaceState = {
    filters: taskWorkspaceFilters.filters,
    filterActions: taskWorkspaceFilters.actions,
    hasActiveFilters: taskWorkspaceFilters.hasActiveFilters,

    view: taskWorkspaceView.view,
    setView: taskWorkspaceView.setView,
  }

  if (tasksQuery.isPending) {
    return {
      status: 'pending' as const,

      ...workspaceState,
    }
  }

  if (tasksQuery.isError) {
    return {
      status: 'error' as const,

      ...workspaceState,
    }
  }

  const boardState = boardQuery.isPending
    ? {
        status: 'pending' as const,
      }
    : boardQuery.isError
      ? {
          status: 'error' as const,
          error: boardQuery.error,
        }
      : {
          status: 'success' as const,
          data: boardQuery.data,
          query: taskQuery,
        }

  return {
    status: 'success' as const,

    tasks: tasksQuery.data,
    summary: getTaskSummary(tasksQuery.data, referenceDate),

    taskQuery,
    boardState,

    ...workspaceState,
  }
}
