import { DashboardGreetingCard } from '@/features/dashboard/components/dashboard-greeting-card'
import { TaskSummary } from '@/features/tasks/components/task-summary'
import { TaskSummarySkeleton } from '@/features/tasks/components/task-summary-skeleton'

import type { useDashboard } from '../hooks/use-dashboard'

type DashboardContentProps = {
  dashboard: ReturnType<typeof useDashboard>
}

export function DashboardContent({ dashboard }: DashboardContentProps) {
  if (dashboard.status === 'pending') {
    return (
      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0">
          <TaskSummarySkeleton />
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
        <DashboardGreetingCard inProgress={dashboard.taskSummary.inProgress} />
        {/* Greeting */}
        {/* Attention */}
      </section>

      <aside className="min-w-0">
        {/* Calendar */}
        {/* Activities */}
      </aside>
    </div>
  )
}
