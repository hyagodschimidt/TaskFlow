import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { taskService } from '@/features/tasks/services/task-service'
import type { TaskQuery } from '@/features/tasks/types/task-query'

type UseTaskPageParams = {
  query: TaskQuery
  page: number
  pageSize: number
}

export function useTaskPage({ query, page, pageSize }: UseTaskPageParams) {
  return useQuery({
    queryKey: ['tasks', 'page', query, page, pageSize],

    queryFn: () =>
      taskService.getTasksPage({
        query,
        page,
        pageSize,
      }),

    placeholderData: keepPreviousData,
  })
}
