import { ChevronDown, LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Task, TaskStatus } from '@/features/tasks/types/task'

import { TaskWorkspaceKanbanCard } from './task-workspace-kanban-card'

type TaskWorkspaceKanbanColumnProps = {
  title: string
  status: TaskStatus
  tasks: Task[]
  total: number

  hasMore: boolean
  isLoadingMore: boolean
  onLoadMore: () => void
}

const statusStyles = {
  pending: {
    dot: 'bg-pending',
    container: 'bg-gradient-to-br from-pending/5 to-background/50',
  },

  in_progress: {
    dot: 'bg-in-progress',
    container: 'bg-gradient-to-br from-in-progress/5 to-background/50',
  },

  completed: {
    dot: 'bg-completed',
    container: 'bg-gradient-to-br from-completed/5 to-background/50',
  },
} satisfies Record<
  TaskStatus,
  {
    dot: string
    container: string
  }
>

export function TaskWorkspaceKanbanColumn({
  title,
  status,
  tasks,
  total,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: TaskWorkspaceKanbanColumnProps) {
  const styles = statusStyles[status]

  return (
    <section
      className={`h-fit min-w-0 rounded-xl border p-4 ${styles.container}`}
    >
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`bg-status-completed size-2 rounded-full ${styles.dot}`}
          />

          <h4 className="font-medium">{title}</h4>

          <small className="bg-layer text-foreground-secondary rounded-full px-2 py-0.5 font-bold">
            {total}
          </small>
        </div>
      </header>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskWorkspaceKanbanCard key={task.id} task={task} />
          ))
        ) : (
          <div className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
            Nenhuma tarefa
          </div>
        )}
      </div>
      <div className="pt-3">
        {hasMore && (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={isLoadingMore}
            onClick={onLoadMore}
          >
            {isLoadingMore ? (
              <>
                <LoaderCircle className="animate-spin" />
                Carregando...
              </>
            ) : (
              <>
                Carregar mais
                <ChevronDown />
              </>
            )}
          </Button>
        )}
      </div>
    </section>
  )
}
