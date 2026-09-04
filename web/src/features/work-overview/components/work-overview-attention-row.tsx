import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { routes } from '@/app/router/routes'
import { TaskPriorityIndicator } from '@/features/tasks/components/task-priority-indicator'
import type { Task } from '@/features/tasks/types/task'

type WorkOverviewAttentionRowProps = {
  task: Task
  dateLabel: string
  dateClassName?: string
}

export function WorkOverviewAttentionRow({
  task,
  dateLabel,
  dateClassName = 'text-foreground-secondary',
}: WorkOverviewAttentionRowProps) {
  const taskHref = routes.taskDetails(String(task.id))

  const createdAtLabel = `criado em ${format(
    new Date(task.createdAt),
    "dd 'de' MMM 'de' yyyy, HH:mm",
    {
      locale: ptBR,
    },
  )}`

  return (
    <div className="grid gap-3 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_110px_150px] lg:items-center lg:gap-4">
      <Link
        to={taskHref}
        className="group flex w-fit min-w-0 items-center gap-2"
      >
        <span className="group-hover:text-primary truncate font-medium transition-colors">
          {task.title}
        </span>

        <ChevronRight className="text-muted-foreground size-4 shrink-0 lg:hidden" />
      </Link>

      <div className="flex items-center justify-between gap-4 lg:contents">
        <TaskPriorityIndicator
          priority={task.priority}
          className="justify-start"
        />

        <p
          title={createdAtLabel}
          className={`shrink-0 text-sm whitespace-nowrap lg:text-right ${dateClassName}`}
        >
          {dateLabel}
        </p>
      </div>
    </div>
  )
}
