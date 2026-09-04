import { TaskSummary } from '@/features/tasks/components/task-summary'
import { TaskSummarySkeleton } from '@/features/tasks/components/task-summary.skeleton'
import { WorkOverviewAttention } from '@/features/work-overview/components/work-overview-attention'
import { WorkOverviewAttentionSkeleton } from '@/features/work-overview/components/work-overview-attention-group.skeleton'
import { WorkOverviewGreetingCard } from '@/features/work-overview/components/work-overview-greeting-card'
import { WorkOverviewGreetingCardSkeleton } from '@/features/work-overview/components/work-overview-greeting-card.skeleton'
import { WorkOverviewShortcuts } from '@/features/work-overview/components/work-overview-shortcuts'
import { WorkOverviewShortcutsSkeleton } from '@/features/work-overview/components/work-overview-shortcuts.skeleton'
import type { useWorkOverview } from '@/features/work-overview/hooks/use-work-overview'

type WorkOverviewContentProps = {
  workOverviewData: ReturnType<typeof useWorkOverview>
}

export function WorkOverviewContent({
  workOverviewData,
}: WorkOverviewContentProps) {
  if (workOverviewData.status === 'pending') {
    return (
      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0 space-y-6">
          <TaskSummarySkeleton />
          <WorkOverviewGreetingCardSkeleton />
          <WorkOverviewAttentionSkeleton />
          <WorkOverviewShortcutsSkeleton />
        </section>

        <aside className="min-w-0">{/* widgets skeleton futuramente */}</aside>
      </div>
    )
  }

  if (workOverviewData.status === 'error') {
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
        <TaskSummary summary={workOverviewData.summary} />
        <WorkOverviewGreetingCard
          inProgress={workOverviewData.summary.inProgress}
        />
        <WorkOverviewAttention attention={workOverviewData.attention} />
        <WorkOverviewShortcuts
          urgentThisWeekCount={workOverviewData.shortcuts.urgentThisWeek}
        />
      </section>

      <aside className="min-w-0">
        {/* Calendar */}
        {/* Activities */}
      </aside>
    </div>
  )
}
