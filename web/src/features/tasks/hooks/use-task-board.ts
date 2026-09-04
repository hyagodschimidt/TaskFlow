import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/features/tasks/services/task-service'
import type { TaskQuery } from '@/features/tasks/types/task-query'

export function useTaskBoard(query: TaskQuery, take = 5) {
  return useQuery({
    queryKey: ['tasks', 'board', query, take],
    queryFn: () => taskService.getBoard(query, take),
  })
}
