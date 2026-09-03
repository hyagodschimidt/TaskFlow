import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/app/layouts/app-layout'
import { routes } from '@/app/router/routes'
import { LoginPage } from '@/pages/auth/login-page'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { OnboardingPage } from '@/pages/onboarding/create-company-page'
import { MyTasksPage } from '@/pages/tasks/my-tasks-page'

export const router = createBrowserRouter([
  {
    path: routes.dashboard(),
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'tasks',
        element: <MyTasksPage />,
      },
    ],
  },

  {
    path: routes.onboarding(),
    element: <OnboardingPage />,
  },

  {
    path: routes.login(),
    element: <LoginPage />,
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
])
