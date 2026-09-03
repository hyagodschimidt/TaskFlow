import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type TaskSummaryCardProps = {
  label: string
  value: number
  percentage: number
  icon: LucideIcon
  progress?: number
  styles: {
    background: string
    border: string
    icon: string
    bar?: string
    hover: string
  }
}

export function TaskSummaryCard({
  label,
  value,
  percentage,
  icon: Icon,
  progress,
  styles,
}: TaskSummaryCardProps) {
  return (
    <div
      className={cn(
        'border-overlay bg-layer rounded-xl border p-3',
        'transition-colors',
        styles.hover,
      )}
    >
      <div className="flex items-center justify-between">
        <small className="text-foreground-secondary uppercase">{label}</small>

        <div
          className={cn(
            'flex size-9 items-center justify-center rounded-full border',
            styles.background,
            styles.border,
          )}
        >
          <Icon size={18} className={styles.icon} />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <h2 className="mt-3 font-semibold tracking-tight">{value}</h2>

        <small className="text-foreground-secondary leading-7">tarefas</small>
      </div>

      {progress !== undefined ? (
        <div className="mt-4">
          <div className="bg-overlay/60 h-1 overflow-hidden rounded-full">
            <div
              className={cn(
                'h-full rounded-full transition-[width]',
                styles.bar,
              )}
              style={{
                width: `${Math.min(progress, 100)}%`,
              }}
            />
          </div>

          <small className="text-muted-foreground mt-2 block">
            {progress}% concluído
          </small>
        </div>
      ) : (
        <small className="text-muted-foreground mt-4 block">
          {percentage}% do total
        </small>
      )}
    </div>
  )
}
