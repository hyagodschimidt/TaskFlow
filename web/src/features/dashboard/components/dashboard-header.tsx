import { Bell, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'

import type { DashboardPeriod } from '../types/dashboard'

type DashboardHeaderProps = {
  period: DashboardPeriod
  periodLabel: string
  onPeriodChange: (period: DashboardPeriod) => void
}

const periodOptions: {
  value: DashboardPeriod
  label: string
}[] = [
  {
    value: 'week',
    label: 'Esta semana',
  },
  {
    value: 'month',
    label: 'Este mês',
  },
  {
    value: 'quarter',
    label: 'Últimos 3 meses',
  },
  {
    value: 'semester',
    label: 'Últimos 6 meses',
  },
]

export function DashboardHeader({
  period,
  periodLabel,
  onPeriodChange,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="font-semibold tracking-tight">Dashboard</h2>

        <p className="text-muted-foreground mt-1">{periodLabel}</p>
      </div>

      <div className="flex items-center gap-2">
        <NativeSelect
          value={period}
          onChange={(event) =>
            onPeriodChange(event.target.value as DashboardPeriod)
          }
          className="w-40"
          aria-label="Período do dashboard"
        >
          {periodOptions.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>

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
