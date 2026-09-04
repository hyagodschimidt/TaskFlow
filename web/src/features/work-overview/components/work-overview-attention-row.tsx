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
  return (
    <div className="group bg-surface hover:bg-layer grid grid-cols-[minmax(0,1fr)_60px_140px] items-center px-4 py-3 transition-colors">
      <div className="min-w-0">
        <p className="truncate font-medium">{task.title}</p>
      </div>

      <TaskPriorityIndicator
        priority={task.priority}
        className="justify-start"
      />

      <small className={`text-right whitespace-nowrap ${dateClassName}`}>
        {dateLabel}
      </small>
    </div>
  )
}
