import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

import type { Task } from '@/features/tasks/types/task'
import { WorkOverviewAttentionRow } from '@/features/work-overview/components/work-overview-attention-row'

import {
  getCreatedAtLabel,
  getDueDateLabel,
} from '../utils/get-attention-date-label'

type WorkOverviewAttentionGroupProps = {
  title: string
  icon: ReactNode

  tasks: Task[]

  dateType: 'dueDate' | 'createdAt'

  dateClassName?: string
}

export function WorkOverviewAttentionGroup({
  title,
  icon,
  tasks,
  dateType,
  dateClassName,
}: WorkOverviewAttentionGroupProps) {
  const visibleTasks = tasks.slice(0, 3)

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="bg-surface/10 flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          {icon}

          <h6 className="font-medium">{title}</h6>

          <small className="bg-overlay text-foreground-secondary rounded-full px-2 py-0.5 font-bold">
            {tasks.length}
          </small>
        </div>

        <button
          type="button"
          className="text-foreground-secondary hover:text-primary flex items-center gap-1 text-xs font-medium transition-colors"
        >
          Ver mais
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="divide-overlay divide-y">
        {visibleTasks.map((task) => {
          const dateLabel =
            dateType === 'dueDate' && task.dueDate
              ? getDueDateLabel(task.dueDate)
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
    </div>
  )
}
