import { Outlet } from 'react-router-dom'

import { AppSidebar } from '@/components/layout/sidebar/app-sidebar'

export function AppLayout() {
  return (
    <div className="bg-background text-foreground flex min-h-dvh">
      <AppSidebar />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
