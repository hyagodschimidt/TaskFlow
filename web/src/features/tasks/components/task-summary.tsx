import { CircleCheck, CircleDashed, Loader, TriangleAlert } from 'lucide-react'

import type { TaskSummary as TaskSummaryType } from '../types/task-summary'
import { TaskSummaryCard } from './task-summary-card'

type TaskSummaryProps = {
  summary: TaskSummaryType
}

function getPercentage(value: number, total: number) {
  if (total === 0) return 0

  return Math.round((value / total) * 100)
}

export function TaskSummary({ summary }: TaskSummaryProps) {
  const items = [
    {
      label: 'Pendentes',
      value: summary.pending,
      percentage: getPercentage(summary.pending, summary.total),
      icon: CircleDashed,
      styles: {
        background: 'bg-pending/10',
        border: 'border-pending/25',
        icon: 'text-pending',
        hover: 'hover:border-pending/35',
      },
    },

    {
      label: 'Em andamento',
      value: summary.inProgress,
      percentage: getPercentage(summary.inProgress, summary.total),
      icon: Loader,
      styles: {
        background: 'bg-in-progress/12',
        border: 'border-in-progress/25',
        icon: 'text-in-progress',
        hover: 'hover:border-in-progress/35',
      },
    },

    {
      label: 'Concluídas',
      value: summary.completed,
      percentage: getPercentage(summary.completed, summary.total),
      progress: getPercentage(summary.completed, summary.total),
      icon: CircleCheck,
      styles: {
        background: 'bg-completed/10',
        border: 'border-completed/25',
        icon: 'text-completed',
        bar: 'bg-completed',
        hover: 'hover:border-completed/35',
      },
    },

    {
      label: 'Atrasadas',
      value: summary.overdue,
      percentage: getPercentage(summary.overdue, summary.total),
      icon: TriangleAlert,
      styles: {
        background: 'bg-overdue/10',
        border: 'border-overdue/25',
        icon: 'text-overdue',
        hover: 'hover:border-overdue/40',
      },
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <TaskSummaryCard key={item.label} {...item} />
      ))}
    </div>
  )
}
