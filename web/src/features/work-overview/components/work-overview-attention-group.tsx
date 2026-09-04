import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import type { Task } from '@/features/tasks/types/task'
import { getTaskDueDisplay } from '@/features/tasks/utils/get-task-due-display'
import { WorkOverviewAttentionRow } from '@/features/work-overview/components/work-overview-attention-row'

import { getCreatedAtLabel } from '../utils/get-attention-date-label'

type WorkOverviewAttentionGroupProps = {
  title: string
  icon: ReactNode

  tasks: Task[]

  dateType: 'dueDate' | 'createdAt'

  dateClassName?: string

  href: string
}

export function WorkOverviewAttentionGroup({
  title,
  icon,
  tasks,
  dateType,
  dateClassName,
  href,
}: WorkOverviewAttentionGroupProps) {
  const visibleTasks = tasks.slice(0, 3)

  return (
    <section className="overflow-hidden rounded-md border">
      <header className="bg-surface flex items-center justify-between gap-4 border-b px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {icon}

          <h6 className="truncate font-medium">{title}</h6>

          <span className="bg-overlay text-foreground-secondary shrink-0 rounded-full px-2 py-0.5 text-xs font-bold">
            {tasks.length}
          </span>
        </div>

        <Link
          to={href}
          className="text-foreground-secondary hover:text-primary flex shrink-0 items-center gap-1 text-sm font-medium transition-colors"
        >
          Ver mais
          <ChevronRight className="size-4" />
        </Link>
      </header>

      <div className="divide-overlay divide-y">
        {visibleTasks.map((task) => {
          const dateLabel =
            dateType === 'dueDate'
              ? getTaskDueDisplay(task).label
              : getCreatedAtLabel(task.createdAt)

          return (
            <WorkOverviewAttentionRow
              key={task.id}
              task={task}
              dateLabel={dateLabel}
              dateClassName={dateClassName}
            />
          )
        })}
      </div>
    </section>
  )
}
