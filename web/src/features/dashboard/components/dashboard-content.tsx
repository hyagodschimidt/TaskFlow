import { DashboardAttention } from '@/features/dashboard/components/dashboard-attention'
import { DashboardAttentionSkeleton } from '@/features/dashboard/components/dashboard-attention-group.skeleton'
import { DashboardGreetingCard } from '@/features/dashboard/components/dashboard-greeting-card'
import { DashboardGreetingCardSkeleton } from '@/features/dashboard/components/dashboard-greeting-card.skeleton'
import { DashboardShortcuts } from '@/features/dashboard/components/dashboard-shortcuts'
import { DashboardShortcutsSkeleton } from '@/features/dashboard/components/dashboard-shortcuts.skeleton'
import { TaskSummary } from '@/features/tasks/components/task-summary'
import { TaskSummarySkeleton } from '@/features/tasks/components/task-summary.skeleton'

import type { useDashboard } from '../hooks/use-dashboard'

type DashboardContentProps = {
  dashboard: ReturnType<typeof useDashboard>
}

export function DashboardContent({ dashboard }: DashboardContentProps) {
  if (dashboard.status === 'pending') {
    return (
      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0 space-y-6">
          <TaskSummarySkeleton />
          <DashboardGreetingCardSkeleton />
          <DashboardAttentionSkeleton />
          <DashboardShortcutsSkeleton />
        </section>

        <aside className="min-w-0">{/* widgets skeleton futuramente */}</aside>
      </div>
    )
  }

  if (dashboard.status === 'error') {
    return (
      <div className="mt-8">
        <p className="text-muted-foreground">
          Não foi possível carregar o dashboard.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="min-w-0 space-y-6">
        <TaskSummary summary={dashboard.summary} />
        <DashboardGreetingCard inProgress={dashboard.summary.inProgress} />
        <DashboardAttention attention={dashboard.attention} />
        <DashboardShortcuts
          urgentThisWeekCount={dashboard.shortcuts.urgentThisWeek}
        />
      </section>

      <aside className="min-w-0">
        {/* Calendar */}
        {/* Activities */}
      </aside>
    </div>
  )
}
