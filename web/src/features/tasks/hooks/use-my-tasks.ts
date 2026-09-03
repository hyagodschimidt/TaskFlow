import { useQuery } from '@tanstack/react-query'

import { taskService } from '../services/task-service'

export function useMyTasks() {
  return useQuery({
    queryKey: ['tasks', 'current-user'],
    queryFn: taskService.getMyTasks,
  })
}
