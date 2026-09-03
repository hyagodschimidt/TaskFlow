import { ArrowRight, Briefcase } from 'lucide-react'
import { useState } from 'react'

import { getGreeting } from '@/features/dashboard/utils/get-greeting'

type DashboardGreetingCardProps = {
  inProgress: number
}

export function DashboardGreetingCard({
  inProgress,
}: DashboardGreetingCardProps) {
  const [greeting] = useState(() => getGreeting())

  return (
    <div className="relative overflow-hidden rounded-2xl border border-(--greeting-border) bg-(--greeting-background)">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--greeting-highlight) to-transparent" />

      <div
        className={`absolute inset-y-0 right-0 w-48 ${greeting.rightGlow}`}
      />

      <div className={`absolute inset-y-0 left-0 w-52 ${greeting.leftGlow}`} />

      <div className="relative p-6">
        <h3 className="font-semibold tracking-tight">{greeting.message}</h3>

        <p className="text-foreground-secondary mt-1">
          Panorama geral do seu trabalho.
        </p>

        <div className="mt-3">
          <div className="flex items-center gap-2">
            <Briefcase size={18} className="text-foreground-secondary" />
            <p className="text-foreground-secondary text-sm">
              Você tem <span className="text-foreground">{inProgress}</span>{' '}
              {inProgress === 1
                ? 'tarefa em andamento'
                : 'tarefas em andamento'}
              .
            </p>
          </div>
        </div>

        <button
          type="button"
          className="text-primary mt-6 flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
        >
          Ver minhas tarefas
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
