import { useTasks } from '@/features/tasks/hooks/use-tasks'
import { MOCK_REFERENCE_DATE } from '@/features/tasks/mocks/tasks.mock'
import { getTaskSummary } from '@/features/tasks/utils/get-task-summary'
import { getWorkOverviewShortcuts } from '@/features/work-overview/utils/get-work-overview-shortcuts'

import { getAttentionTasks } from '../utils/get-attention-tasks'

export function useWorkOverview() {
  const referenceDate = MOCK_REFERENCE_DATE

  const tasksQuery = useTasks()

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

    shortcuts: getWorkOverviewShortcuts(tasksQuery.data, referenceDate),
  }
}
