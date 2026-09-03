import { useNavigate } from 'react-router-dom'

import { type RouteName, routes } from './routes'

type RouteArguments<T extends RouteName> = Parameters<(typeof routes)[T]>

export function useAppRouter() {
  const navigate = useNavigate()

  function navigateTo<T extends RouteName>(
    route: T,
    ...args: RouteArguments<T>
  ) {
    const buildRoute = routes[route] as (...args: RouteArguments<T>) => string

    navigate(buildRoute(...args))
  }

  function replace<T extends RouteName>(route: T, ...args: RouteArguments<T>) {
    const buildRoute = routes[route] as (...args: RouteArguments<T>) => string

    navigate(buildRoute(...args), {
      replace: true,
    })
  }

  function back() {
    navigate(-1)
  }

  function forward() {
    navigate(1)
  }

  return {
    navigate: navigateTo,
    replace,
    back,
    forward,
  }
}
