import { Skeleton } from '@/components/ui/skeleton'

export function DashboardGreetingCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-(--greeting-border) bg-(--greeting-background)">
      <div className="relative p-6">
        {/* greeting */}
        <Skeleton className="h-5 w-28" />

        {/* subtitle */}
        <Skeleton className="mt-2 h-4 w-52" />

        {/* in progress */}
        <div className="mt-3 flex items-center gap-2">
          <Skeleton className="size-4.5 rounded-full" />
          <Skeleton className="h-4 w-56" />
        </div>

        {/* action */}
        <div className="mt-6 flex items-center gap-1.5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="size-4 rounded" />
        </div>
      </div>
    </div>
  )
}
