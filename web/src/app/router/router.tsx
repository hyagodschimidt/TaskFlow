import { createBrowserRouter } from 'react-router-dom'

import { LoginPage } from '@/pages/auth/login-page'
import { HomePage } from '@/pages/home/home-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { OnboardingPage } from '@/pages/onboarding/create-company-page'

import { routes } from './routes'

export const router = createBrowserRouter([
  {
    path: routes.home(),
    element: <HomePage />,
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
