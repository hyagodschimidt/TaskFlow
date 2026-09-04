import { useInfiniteQuery } from '@tanstack/react-query'

import { taskService } from '@/features/tasks/services/task-service'
import type { TaskStatus } from '@/features/tasks/types/task'
import type { TaskBoardColumn } from '@/features/tasks/types/task-board'
import type { TaskQuery } from '@/features/tasks/types/task-query'

type UseTaskBoardColumnParams = {
  query: TaskQuery
  status: TaskStatus
  initialColumn: TaskBoardColumn
  pageSize?: number
}

export function useTaskBoardColumn({
  query,
  status,
  initialColumn,
  pageSize = 5,
}: UseTaskBoardColumnParams) {
  const matchesStatusFilter = !query.status || query.status === status

  const columnQuery: TaskQuery = {
    ...query,
    status,
  }

  const columnQueryResult = useInfiniteQuery({
    queryKey: ['tasks', 'board-column', query, status, pageSize],

    initialPageParam: 1,

    enabled: matchesStatusFilter,

    queryFn: ({ pageParam }) =>
      taskService.getTasksPage({
        query: columnQuery,
        page: pageParam,
        pageSize,
      }),

    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,

    initialData: {
      pages: [
        {
          items: initialColumn.items,
          page: 1,
          pageSize,
          total: initialColumn.total,
          hasMore: initialColumn.hasMore,
        },
      ],
      pageParams: [1],
    },

    staleTime: Infinity,
  })

  const items = columnQueryResult.data.pages.flatMap((page) => page.items)

  return {
    items,
    total: initialColumn.total,

    hasMore: matchesStatusFilter && columnQueryResult.hasNextPage,

    isLoadingMore: columnQueryResult.isFetchingNextPage,

    loadMoreError: columnQueryResult.isFetchNextPageError,

    loadMore: columnQueryResult.fetchNextPage,
  }
}
