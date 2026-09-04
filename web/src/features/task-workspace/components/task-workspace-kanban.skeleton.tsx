import { Skeleton } from '@/components/ui/skeleton'

const COLUMNS = 3
const CARDS_PER_COLUMN = 3

export function TaskWorkspaceKanbanSkeleton() {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {Array.from({ length: COLUMNS }).map((_, columnIndex) => (
        <div key={columnIndex} className="rounded-lg border p-4">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-6 w-8 rounded-full" />
          </div>

          <div className="space-y-3">
            {Array.from({
              length: CARDS_PER_COLUMN,
            }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="bg-surface/20 rounded-lg border p-4"
              >
                <Skeleton className="h-5 w-3/4" />

                <div className="mt-4 flex items-center gap-2">
                  <Skeleton className="size-4" />
                  <Skeleton className="h-4 w-28" />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />

                  <Skeleton className="size-9 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
