import { TaskWorkspaceKanbanSkeleton } from '@/features/task-workspace/components/task-workspace-kanban.skeleton'
import { TaskWorkspaceKanbanData } from '@/features/task-workspace/components/task-workspace-kanban-data'
import type { TaskBoard } from '@/features/tasks/types/task-board'
import type { TaskQuery } from '@/features/tasks/types/task-query'

type TaskWorkspaceKanbanState =
  | {
      status: 'pending'
    }
  | {
      status: 'error'
      error: Error
    }
  | {
      status: 'success'
      data: TaskBoard
      query: TaskQuery
    }

type TaskWorkspaceKanbanContentProps = {
  boardState: TaskWorkspaceKanbanState
}

export function TaskWorkspaceKanbanContent({
  boardState,
}: TaskWorkspaceKanbanContentProps) {
  if (boardState.status === 'pending') {
    return <TaskWorkspaceKanbanSkeleton />
  }

  if (boardState.status === 'error') {
    return (
      <div className="text-muted-foreground">
        Não foi possível carregar o Kanban.
      </div>
    )
  }

  return (
    <TaskWorkspaceKanbanData board={boardState.data} query={boardState.query} />
  )
}
