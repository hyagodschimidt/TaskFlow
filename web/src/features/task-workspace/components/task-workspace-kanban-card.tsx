import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarDays, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

import { routes } from '@/app/router/routes'
import { Button } from '@/components/ui/button'
import { TaskPriorityIndicator } from '@/features/tasks/components/task-priority-indicator'
import type { Task } from '@/features/tasks/types/task'
import { getTaskDueDisplay } from '@/features/tasks/utils/get-task-due-display'

type TaskWorkspaceKanbanCardProps = {
  task: Task
}

export function TaskWorkspaceKanbanCard({
  task,
}: TaskWorkspaceKanbanCardProps) {
  const createdAtLabel = `criado em ${format(
    new Date(task.createdAt),
    "dd 'de' MMM 'de' yyyy, HH:mm",
    {
      locale: ptBR,
    },
  )}`

  const due = getTaskDueDisplay(task)

  const dueClassName = due.overdue
    ? 'text-overdue'
    : due.dueSoon
      ? 'text-warning'
      : 'text-muted-foreground'

  const taskHref = routes.taskDetails(String(task.id))

  return (
    <article className="bg-surface/20 rounded-lg border px-4 py-3.5 backdrop-blur-xl">
      <Link to={taskHref} className="flex w-fit">
        <h5 className="hover:text-primary max-w-fit truncate font-medium transition-colors ease-out">
          {task.title}
        </h5>
      </Link>

      <div className="text-muted-foreground mt-4 flex items-center gap-2">
        <CalendarDays className="size-4" />
        <p title={createdAtLabel} className={dueClassName}>
          {due.label}
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <TaskPriorityIndicator priority={task.priority} />

        {task.status === 'pending' && (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            disabled
            aria-label="Iniciar tarefa"
          >
            <Play className="text-primary size-4" />
          </Button>
        )}
      </div>
    </article>
  )
}
