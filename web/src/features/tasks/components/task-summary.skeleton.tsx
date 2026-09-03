import { Skeleton } from '@/components/ui/skeleton'

export function TaskSummarySkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => {
        const hasProgress = index === 2

        return (
          <div
            key={index}
            className="border-overlay bg-layer min-h-33 rounded-xl border p-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="size-9 rounded-full" />
            </div>

            <div className="mt-3 flex items-end gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="mb-1 h-4 w-14" />
            </div>

            {hasProgress ? (
              <div className="mt-4">
                <Skeleton className="h-1 w-full rounded-full" />
                <Skeleton className="mt-2 h-4 w-24" />
              </div>
            ) : (
              <Skeleton className="mt-4 h-4 w-20" />
            )}
          </div>
        )
      })}
    </div>
  )
}
