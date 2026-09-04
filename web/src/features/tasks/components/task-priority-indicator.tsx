import { ChevronDown, ChevronsUp, ChevronUp, Diamond } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { TaskPriority } from '../types/task'

type TaskPriorityIndicatorProps = {
  priority: TaskPriority
  showLabel?: boolean
  className?: string
}

const priorityConfig = {
  low: {
    label: 'Baixa',
    icon: ChevronDown,
    className: 'text-low',
  },

  medium: {
    label: 'Média',
    icon: ChevronUp,
    className: 'text-medium',
  },

  high: {
    label: 'Alta',
    icon: ChevronsUp,
    className: 'text-high',
  },

  urgent: {
    label: 'Urgente',
    icon: Diamond,
    className: 'text-urgent',
  },
} satisfies Record<
  TaskPriority,
  {
    label: string
    icon: typeof ChevronDown
    className: string
  }
>

export function TaskPriorityIndicator({
  priority,
  showLabel = true,
  className,
}: TaskPriorityIndicatorProps) {
  const config = priorityConfig[priority]

  const Icon = config.icon

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 whitespace-nowrap',
        config.className,
        className,
      )}
    >
      <Icon size={14} strokeWidth={2.25} className="shrink-0" />

      {showLabel && (
        <p className="text-foreground-secondary font-medium">{config.label}</p>
      )}
    </div>
  )
}
