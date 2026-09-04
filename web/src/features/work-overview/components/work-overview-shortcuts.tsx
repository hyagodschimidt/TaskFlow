import { AlertCircle, ChevronRight, Diamond, Loader } from 'lucide-react'
import { Link } from 'react-router-dom'

import { getTaskWorkspaceHref } from '@/features/task-workspace/utils/get-task-workspace-href'
import { cn } from '@/lib/utils'

type WorkOverviewShortcut = {
  label: string
  description: string
  icon: typeof Diamond

  style: {
    icon: string
    border: string
  }

  href: string
}

export function WorkOverviewShortcuts() {
  const shortcuts: WorkOverviewShortcut[] = [
    {
      label: 'Urgentes nesta semana',
      description: 'Tarefas urgentes com prazo nesta semana.',
      icon: Diamond,
      style: {
        icon: 'text-urgent',
        border: 'border-urgent',
      },
      href: getTaskWorkspaceHref({
        priority: 'urgent',
        due: 'this-week',
      }),
    },
    {
      label: 'Pendentes urgentes',
      description: 'Tarefas urgentes que ainda não foram iniciadas.',
      icon: AlertCircle,
      style: {
        icon: 'text-urgent',
        border: 'border-urgent',
      },
      href: getTaskWorkspaceHref({
        status: 'pending',
        priority: 'urgent',
      }),
    },
    {
      label: 'Urgentes em andamento',
      description: 'Tarefas urgentes que já estão em execução.',
      icon: Loader,
      style: {
        icon: 'text-in-progress',
        border: 'border-in-progress',
      },
      href: getTaskWorkspaceHref({
        status: 'in_progress',
        priority: 'urgent',
      }),
    },
  ]
  return (
    <section>
      <h4 className="font-semibold tracking-tight">Acessos rápidos</h4>

      <div className="mt-4 grid gap-3">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon

          return (
            <Link
              key={shortcut.label}
              to={shortcut.href}
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
            </Link>
          )
        })}
      </div>
    </section>
  )
}
