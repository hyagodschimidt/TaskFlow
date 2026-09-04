import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { routes } from '@/app/router/routes'
import { taskStatusFilterOptions } from '@/features/task-workspace/constants/task-workspace-filter-options'
import { TaskPriorityIndicator } from '@/features/tasks/components/task-priority-indicator'
import type { Task } from '@/features/tasks/types/task'
import { getTaskDueDisplay } from '@/features/tasks/utils/get-task-due-display'

type TaskWorkspaceListRowProps = {
  task: Task
}

export function TaskWorkspaceListRow({ task }: TaskWorkspaceListRowProps) {
  const statusDotStyles = {
    pending: 'bg-pending animate-pulse',
    in_progress: 'bg-in-progress animate-pulse',
    completed: 'bg-completed',
  } satisfies Record<Task['status'], string>

  const due = getTaskDueDisplay(task)

  const createdAtLabel = `criado em ${format(
    new Date(task.createdAt),
    "dd 'de' MMM 'de' yyyy, HH:mm",
    {
      locale: ptBR,
    },
  )}`

  const status =
    taskStatusFilterOptions.find((option) => option.value === task.status)
      ?.label ?? task.status

  const taskHref = routes.taskDetails(String(task.id))

  const dueClassName = due.overdue
    ? 'text-overdue'
    : due.dueSoon
      ? 'text-warning'
      : 'text-muted-foreground'

  return (
    <div className="grid gap-3 border-b px-4 py-4 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_120px_110px_150px] lg:items-center lg:gap-4">
      <Link
        to={taskHref}
        className="group flex w-fit min-w-0 items-center justify-between gap-3"
      >
        <span className="group-hover:text-primary truncate font-medium transition-colors">
          {task.title}
        </span>

        <ChevronRight className="text-muted-foreground size-4 shrink-0 lg:hidden" />
      </Link>

      <div className="flex items-center gap-2 text-sm">
        <div
          className={`size-1.5 shrink-0 rounded-full ${statusDotStyles[task.status]}`}
        />

        <p className="text-foreground-secondary font-medium">{status}</p>
      </div>

      <TaskPriorityIndicator priority={task.priority} />

      <p title={createdAtLabel} className={dueClassName}>
        {due.label}
      </p>
    </div>
  )
}
