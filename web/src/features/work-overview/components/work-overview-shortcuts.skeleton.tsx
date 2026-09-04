import { Skeleton } from '@/components/ui/skeleton'

export function WorkOverviewShortcutsSkeleton() {
  return (
    <section>
      <Skeleton className="h-5 w-28" />

      <div className="mt-4 grid gap-3">
        {Array.from({ length: 1 }).map((_, index) => (
          <div
            key={index}
            className="border-overlay bg-surface flex items-center justify-between rounded-xl border px-4 py-2"
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* ícone */}
              <Skeleton className="size-9 shrink-0 rounded-lg" />

              <div className="min-w-0">
                {/* título + contador */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-5 w-6 rounded-full" />
                </div>

                {/* descrição */}
                <Skeleton className="mt-1 h-3 w-56 max-w-full" />
              </div>
            </div>

            {/* ação */}
            <div className="ml-6 flex shrink-0 items-center gap-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="size-3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
