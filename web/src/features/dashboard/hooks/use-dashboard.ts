import { getDashboardShortcuts } from '@/features/dashboard/utils/get-dashboard-shortcuts'
import { useMyTasks } from '@/features/tasks/hooks/use-my-tasks'
import { MOCK_REFERENCE_DATE } from '@/features/tasks/mocks/tasks.mock'
import { getTaskSummary } from '@/features/tasks/utils/get-task-summary'

import { getAttentionTasks } from '../utils/get-attention-tasks'

export function useDashboard() {
  const referenceDate = MOCK_REFERENCE_DATE

  const tasksQuery = useMyTasks()

  if (tasksQuery.isPending) {
    return {
      status: 'pending' as const,
    }
  }

  if (tasksQuery.isError) {
    return {
      status: 'error' as const,
    }
  }

  return {
    status: 'success' as const,

    summary: getTaskSummary(tasksQuery.data, referenceDate),

    attention: getAttentionTasks(tasksQuery.data, referenceDate),

    shortcuts: getDashboardShortcuts(tasksQuery.data, referenceDate),
  }
}
