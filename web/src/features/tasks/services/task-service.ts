import { filterMockTasks } from '@/features/tasks/mocks/filter-mock-tasks'
import {
  MOCK_REFERENCE_DATE,
  mockTasks,
} from '@/features/tasks/mocks/tasks.mock'
import type { Task } from '@/features/tasks/types/task'
import type {
  TaskBoard,
  TaskBoardColumn,
} from '@/features/tasks/types/task-board'
import type {
  TaskPage,
  TaskPageRequest,
} from '@/features/tasks/types/task-page'
import type { TaskQuery } from '@/features/tasks/types/task-query'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function createBoardColumn(tasks: Task[], take: number): TaskBoardColumn {
  const total = tasks.length
  const items = tasks.slice(0, take)

  return {
    items,
    total,
    hasMore: total > items.length,
  }
}

export const taskService = {
  async getTasks(): Promise<Task[]> {
    await delay(1200)

    return mockTasks
  },

  async getBoard(query: TaskQuery, take = 5): Promise<TaskBoard> {
    await delay(1200)

    const filteredTasks = filterMockTasks(mockTasks, query, MOCK_REFERENCE_DATE)

    const pending = filteredTasks.filter((task) => task.status === 'pending')

    const inProgress = filteredTasks.filter(
      (task) => task.status === 'in_progress',
    )

    const completed = filteredTasks.filter(
      (task) => task.status === 'completed',
    )

    return {
      pending: createBoardColumn(pending, take),
      inProgress: createBoardColumn(inProgress, take),
      completed: createBoardColumn(completed, take),
    }
  },

  async getTasksPage({
    query,
    page,
    pageSize,
  }: TaskPageRequest): Promise<TaskPage> {
    await delay(700)

    const filteredTasks = filterMockTasks(mockTasks, query, MOCK_REFERENCE_DATE)

    const start = (page - 1) * pageSize
    const end = start + pageSize

    const items = filteredTasks.slice(start, end)
    const total = filteredTasks.length

    return {
      items,
      page,
      pageSize,
      total,
      hasMore: end < total,
    }
  },
}
