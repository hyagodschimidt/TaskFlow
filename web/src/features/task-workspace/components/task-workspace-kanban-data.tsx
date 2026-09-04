import { useTaskBoardColumn } from '@/features/tasks/hooks/use-task-board-column'
import type { TaskBoard } from '@/features/tasks/types/task-board'
import type { TaskQuery } from '@/features/tasks/types/task-query'

import { TaskWorkspaceKanban } from './task-workspace-kanban'

type TaskWorkspaceKanbanDataProps = {
  board: TaskBoard
  query: TaskQuery
}

export function TaskWorkspaceKanbanData({
  board,
  query,
}: TaskWorkspaceKanbanDataProps) {
  const pending = useTaskBoardColumn({
    query,
    status: 'pending',
    initialColumn: board.pending,
  })

  const inProgress = useTaskBoardColumn({
    query,
    status: 'in_progress',
    initialColumn: board.inProgress,
  })

  const completed = useTaskBoardColumn({
    query,
    status: 'completed',
    initialColumn: board.completed,
  })

  return (
    <TaskWorkspaceKanban
      board={{
        pending: {
          items: pending.items,
          total: pending.total,
          hasMore: pending.hasMore,
        },

        inProgress: {
          items: inProgress.items,
          total: inProgress.total,
          hasMore: inProgress.hasMore,
        },

        completed: {
          items: completed.items,
          total: completed.total,
          hasMore: completed.hasMore,
        },
      }}
      onLoadMore={{
        pending: () => {
          void pending.loadMore()
        },

        inProgress: () => {
          void inProgress.loadMore()
        },

        completed: () => {
          void completed.loadMore()
        },
      }}
      loadingMore={{
        pending: pending.isLoadingMore,
        inProgress: inProgress.isLoadingMore,
        completed: completed.isLoadingMore,
      }}
    />
  )
}
