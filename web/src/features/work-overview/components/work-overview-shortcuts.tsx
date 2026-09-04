import { ChevronRight, Diamond } from 'lucide-react'

import { cn } from '@/lib/utils'

type WorkOverviewShortcut = {
  label: string
  description: string
  count: number
  icon: typeof Diamond
  style: { icon: string; border: string }
  href: string
}

type WorkOverviewShortcutsProps = {
  urgentThisWeekCount: number
}

export function WorkOverviewShortcuts({
  urgentThisWeekCount,
}: WorkOverviewShortcutsProps) {
  const shortcuts: WorkOverviewShortcut[] = [
    {
      label: 'Urgentes nesta semana',
      description: 'Tarefas urgentes com prazo nesta semana.',
      count: urgentThisWeekCount,
      icon: Diamond,
      style: {
        icon: 'text-urgent',
        border: 'border-urgent',
      },
      href: '/tasks?priority=urgent&due=this-week',
    },
  ]

  return (
    <section>
      <h4 className="font-semibold tracking-tight">Acessos rápidos</h4>

      <div className="mt-4 grid gap-3">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon

          return (
            <a
              key={shortcut.label}
              href={shortcut.href}
              className="border-overlay bg-surface hover:bg-layer group flex items-center justify-between rounded-xl border px-4 py-2 transition-colors"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={cn(
                    'bg-surface flex size-9 shrink-0 items-center justify-center rounded-lg border',
                    shortcut.style.border,
                  )}
                >
                  <Icon size={18} className={shortcut.style.icon} />
                </div>

                <div className="min-w-0">
                  <div className="flex gap-3">
                    <p className="font-medium">{shortcut.label}</p>
                    <small className="bg-overlay text-foreground-secondary rounded-full px-2 py-0.5 font-bold">
                      {shortcut.count}
                    </small>
                  </div>

                  <small className="text-foreground-secondary">
                    {shortcut.description}
                  </small>
                </div>
              </div>

              <div className="text-muted-foreground group-hover:text-primary flex items-center gap-1 text-xs transition-colors">
                Ver tarefas
                <ChevronRight size={14} />
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
