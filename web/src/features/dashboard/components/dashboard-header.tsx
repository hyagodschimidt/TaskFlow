import { Bell, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="font-semibold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          Tenha uma visão geral das suas tarefas.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          disabled
          aria-label="Notificações"
        >
          <Bell />
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled
          aria-label="Perfil"
          className="rounded-full"
        >
          <UserRound />
        </Button>
      </div>
    </header>
  )
}
