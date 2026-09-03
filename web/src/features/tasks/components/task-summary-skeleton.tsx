import { Skeleton } from '@/components/ui/skeleton'

export function TaskSummarySkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-layer border-overlay rounded-xl border p-4"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="size-5 rounded-full" />
          </div>

          <Skeleton className="mt-3 h-8 w-10" />
        </div>
      ))}
    </div>
  )
}
