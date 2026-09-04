import { useState } from 'react'

import { TaskWorkspaceListSkeleton } from '@/features/task-workspace/components/task-workspace-list.skeleton'
import { useTaskPage } from '@/features/tasks/hooks/use-task-page'
import type { TaskQuery } from '@/features/tasks/types/task-query'

import { TaskWorkspaceList } from './task-workspace-list'

type TaskWorkspaceListContentProps = {
  query: TaskQuery
}

const PAGE_SIZE = 10

export function TaskWorkspaceListContent({
  query,
}: TaskWorkspaceListContentProps) {
  const [page, setPage] = useState(1)

  const tasksQuery = useTaskPage({
    query,
    page,
    pageSize: PAGE_SIZE,
  })

  if (tasksQuery.isPending) {
    return <TaskWorkspaceListSkeleton />
  }

  if (tasksQuery.isError) {
    return (
      <div className="text-muted-foreground">
        Não foi possível carregar a lista.
      </div>
    )
  }

  return (
    <TaskWorkspaceList
      page={tasksQuery.data}
      isFetching={tasksQuery.isFetching}
      onPageChange={setPage}
    />
  )
}
