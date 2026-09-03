import { useState } from 'react'

import { getPeriodLabel } from '@/features/dashboard/utils/get-period-label'
import { useMyTasks } from '@/features/tasks/hooks/use-my-tasks'
import { MOCK_REFERENCE_DATE } from '@/features/tasks/mocks/tasks.mock'
import { getTaskSummary } from '@/features/tasks/utils/get-task-summary'

import type { DashboardPeriod } from '../types/dashboard'
import { getDashboardSummary } from '../utils/get-dashboard-summary'
import { getPeriodRange } from '../utils/get-period-range'

export function useDashboard() {
  const [period, setPeriod] = useState<DashboardPeriod>('week')

  const referenceDate = MOCK_REFERENCE_DATE

  const periodRange = getPeriodRange(period, referenceDate)

  const periodLabel = getPeriodLabel(periodRange)

  const tasksQuery = useMyTasks()

  const base = {
    period,
    setPeriod,
    periodRange,
    periodLabel,
    referenceDate,
  }

  if (tasksQuery.isPending) {
    return {
      ...base,
      status: 'pending' as const,
    }
  }

  if (tasksQuery.isError) {
    return {
      ...base,
      status: 'error' as const,
    }
  }

  const summary = getDashboardSummary(
    tasksQuery.data,
    periodRange,
    referenceDate,
  )

  const taskSummary = getTaskSummary(tasksQuery.data, referenceDate)

  return {
    ...base,
    status: 'success' as const,

    summary,
    taskSummary,
  }
}
