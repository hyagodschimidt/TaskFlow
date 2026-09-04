export const routes = {
  workOverview: () => '/',

  taskWorkspace: () => '/tasks',

  onboarding: () => '/onboarding/create',

  login: () => '/login',

  // Futuro:
  taskDetails: (taskId: string) => `/tasks/${taskId}`,
} as const

export type RouteName = keyof typeof routes
