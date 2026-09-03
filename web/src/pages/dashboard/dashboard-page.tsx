import { DashboardContent } from '@/features/dashboard/components/dashboard-content'
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header'
import { useDashboard } from '@/features/dashboard/hooks/use-dashboard'

export function DashboardPage() {
  const dashboard = useDashboard()

  return (
    <div className="mx-auto w-full max-w-[1600px] p-6 lg:p-8">
      <DashboardHeader
        period={dashboard.period}
        periodLabel={dashboard.periodLabel}
        onPeriodChange={dashboard.setPeriod}
      />
      <DashboardContent dashboard={dashboard} />
    </div>
  )
}
