import type { TaskBoard } from '@/features/tasks/types/task-board'

import { TaskWorkspaceKanbanColumn } from './task-workspace-kanban-column'

type TaskWorkspaceKanbanProps = {
  board: TaskBoard

  onLoadMore: {
    pending: () => void
    inProgress: () => void
    completed: () => void
  }

  loadingMore: {
    pending: boolean
    inProgress: boolean
    completed: boolean
  }
}

export function TaskWorkspaceKanban({
  board,
  loadingMore,
  onLoadMore,
}: TaskWorkspaceKanbanProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <TaskWorkspaceKanbanColumn
        title="Pendentes"
        status="pending"
        tasks={board.pending.items}
        total={board.pending.total}
        hasMore={board.pending.hasMore}
        isLoadingMore={loadingMore.pending}
        onLoadMore={onLoadMore.pending}
      />

      <TaskWorkspaceKanbanColumn
        title="Em andamento"
        status="in_progress"
        tasks={board.inProgress.items}
        total={board.inProgress.total}
        hasMore={board.inProgress.hasMore}
        isLoadingMore={loadingMore.inProgress}
        onLoadMore={onLoadMore.inProgress}
      />

      <TaskWorkspaceKanbanColumn
        title="Concluídas"
        status="completed"
        tasks={board.completed.items}
        total={board.completed.total}
        hasMore={board.completed.hasMore}
        isLoadingMore={loadingMore.completed}
        onLoadMore={onLoadMore.completed}
      />
    </div>
  )
}
