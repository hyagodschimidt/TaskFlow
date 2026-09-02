export const routes = {
  home: () => '/',

  onboarding: () => '/onboarding/create',

  login: () => '/login',

  // Futuro:
  taskDetails: (taskId: string) => `/tasks/${taskId}`,
} as const

export type RouteName = keyof typeof routes
