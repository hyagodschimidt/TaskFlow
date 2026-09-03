import { mockTasks } from '../mocks/tasks.mock'
import type { Task } from '../types/task'

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const taskService = {
  async getMyTasks(): Promise<Task[]> {
    await delay(1200)

    return mockTasks
  },
}
