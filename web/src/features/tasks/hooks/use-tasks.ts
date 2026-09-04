import { useQuery } from '@tanstack/react-query'

import { taskService } from '@/features/tasks/services/task-service'

export function useTasks() {
  return useQuery({
    queryKey: ['tasks', 'current-user'],
    queryFn: taskService.getTasks,
  })
}
