import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/app/layouts/app-layout'
import { routes } from '@/app/router/routes'
import { LoginPage } from '@/pages/auth/login-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { OnboardingPage } from '@/pages/onboarding/create-company-page'
import { MyTasksPage } from '@/pages/tasks/my-tasks-page'
import { WorkOverviewPage } from '@/pages/work-overview/work-overview-page'

export const router = createBrowserRouter([
  {
    path: routes.workOverview(),
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <WorkOverviewPage />,
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
