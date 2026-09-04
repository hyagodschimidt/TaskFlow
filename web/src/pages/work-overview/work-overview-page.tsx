import { WorkOverviewContent } from '@/features/work-overview/components/work-overview-content'
import { WorkOverviewHeader } from '@/features/work-overview/components/work-overview-header'
import { useWorkOverview } from '@/features/work-overview/hooks/use-work-overview'

export function WorkOverviewPage() {
  const workOverviewData = useWorkOverview()

  return (
    <div className="mx-auto w-full max-w-[1600px] p-6 pb-10 lg:p-8 lg:pb-16">
      <WorkOverviewHeader />
      <WorkOverviewContent workOverviewData={workOverviewData} />
    </div>
  )
}
