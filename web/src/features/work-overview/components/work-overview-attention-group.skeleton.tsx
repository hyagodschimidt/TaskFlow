import { Skeleton } from '@/components/ui/skeleton'

function AttentionGroupSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="bg-surface/10 flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          {/* ícone */}
          <Skeleton className="size-4 rounded" />

          {/* título */}
          <Skeleton className="h-4 w-28" />

          {/* contador */}
          <Skeleton className="h-5 w-6 rounded-full" />
        </div>

        {/* ver mais */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="size-3 rounded" />
        </div>
      </div>

      <div className="divide-overlay divide-y">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[minmax(0,1fr)_60px_140px] items-center px-4 py-3"
          >
            {/* título da task */}
            <Skeleton
              className={index === 1 ? 'h-4 w-48' : 'h-4 w-64 max-w-full'}
            />

            {/* prioridade */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-3.5 rounded" />
              <Skeleton className="h-3 w-9" />
            </div>

            {/* data */}
            <div className="flex justify-end">
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function WorkOverviewAttentionSkeleton() {
  return (
    <section>
      <div>
        <Skeleton className="h-5 w-28" />
        <Skeleton className="mt-2 h-4 w-72 max-w-full" />
      </div>

      <div className="mt-4 grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <AttentionGroupSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
