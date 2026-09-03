import {
  CircleCheck,
  CircleDashed,
  CirclePlay,
  TriangleAlert,
} from 'lucide-react'

import type { TaskSummary as TaskSummaryType } from '../types/task-summary'

type TaskSummaryProps = {
  summary: TaskSummaryType
}

export function TaskSummary({ summary }: TaskSummaryProps) {
  const items = [
    {
      label: 'Pendentes',
      value: summary.pending,
      icon: CircleDashed,
      color: 'var(--status-pending)',
    },
    {
      label: 'Em andamento',
      value: summary.inProgress,
      icon: CirclePlay,
      color: 'var(--status-in-progress)',
    },
    {
      label: 'Concluídas',
      value: summary.completed,
      icon: CircleCheck,
      color: 'var(--status-completed)',
    },
    {
      label: 'Atrasadas',
      value: summary.overdue,
      icon: TriangleAlert,
      color: 'var(--status-overdue)',
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon

        return (
          <div
            key={item.label}
            className="border-overlay bg-layer rounded-xl border p-4"
          >
            <div className="flex items-center justify-between">
              <small className="text-foreground-secondary uppercase">
                {item.label}
              </small>

              <Icon size={18} style={{ color: item.color }} />
            </div>

            <strong className="mt-3 block font-semibold tracking-tight">
              {item.value}
            </strong>
          </div>
        )
      })}
    </div>
  )
}
