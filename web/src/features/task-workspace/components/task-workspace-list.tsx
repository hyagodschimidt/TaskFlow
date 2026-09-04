import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { TaskPage } from '@/features/tasks/types/task-page'

import { TaskWorkspaceListRow } from './task-workspace-list-row'

type TaskWorkspaceListProps = {
  page: TaskPage
  isFetching: boolean
  onPageChange: (page: number) => void
}

type PaginationItem = number | 'ellipsis'

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ])

  const validPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)

  const result: PaginationItem[] = []

  validPages.forEach((page, index) => {
    const previousPage = validPages[index - 1]

    if (previousPage !== undefined && page - previousPage > 1) {
      result.push('ellipsis')
    }

    result.push(page)
  })

  return result
}

export function TaskWorkspaceList({
  page,
  isFetching,
  onPageChange,
}: TaskWorkspaceListProps) {
  const totalPages = Math.max(1, Math.ceil(page.total / page.pageSize))

  const paginationItems = getPaginationItems(page.page, totalPages)

  if (page.total === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground text-sm">
          Nenhuma tarefa encontrada.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border">
        <div className="bg-surface text-muted-foreground hidden gap-4 border-b px-4 py-3 font-medium lg:grid lg:grid-cols-[minmax(0,1fr)_120px_110px_150px]">
          <p>Tarefa</p>
          <p>Status</p>
          <p>Prioridade</p>
          <p>Prazo</p>
        </div>

        <div className={isFetching ? 'opacity-60' : undefined}>
          {page.items.map((task) => (
            <TaskWorkspaceListRow key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          {page.total} {page.total === 1 ? 'tarefa' : 'tarefas'}
        </p>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page.page <= 1 || isFetching}
            onClick={() => onPageChange(page.page - 1)}
          >
            <ChevronLeft />
            Anterior
          </Button>

          <div className="flex items-center gap-1">
            {paginationItems.map((item, index) =>
              item === 'ellipsis' ? (
                <p
                  key={`ellipsis-${index}`}
                  className="text-muted-foreground px-2"
                >
                  …
                </p>
              ) : (
                <Button
                  key={item}
                  type="button"
                  size="icon"
                  variant={item === page.page ? 'secondary' : 'ghost'}
                  disabled={isFetching}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </Button>
              ),
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!page.hasMore || isFetching}
            onClick={() => onPageChange(page.page + 1)}
          >
            Próxima
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
