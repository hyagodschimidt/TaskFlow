import { Skeleton } from '@/components/ui/skeleton'

const SKELETON_ROWS = 5

export function TaskWorkspaceListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border">
        <div className="bg-surface hidden gap-4 border-b px-4 py-3 lg:grid lg:grid-cols-[minmax(0,1fr)_120px_110px_150px]">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>

        <div>
          {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
            <div
              key={index}
              className="grid gap-3 border-b px-4 py-4 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_120px_110px_150px] lg:items-center lg:gap-4"
            >
              <Skeleton className="h-5 w-3/5 max-w-80" />

              <div className="flex items-center gap-2">
                <Skeleton className="size-1.5 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>

              <Skeleton className="h-4 w-16" />

              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-16" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  )
}
