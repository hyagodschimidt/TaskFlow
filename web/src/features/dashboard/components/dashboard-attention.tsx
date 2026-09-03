import { AlertTriangle, Clock3, Sparkles } from 'lucide-react'

import type { DashboardAttention as DashboardAttentionType } from '../types/dashboard'
import { DashboardAttentionGroup } from './dashboard-attention-group'

type DashboardAttentionProps = {
  attention: DashboardAttentionType
}

export function DashboardAttention({ attention }: DashboardAttentionProps) {
  return (
    <section>
      <div>
        <h4 className="font-semibold tracking-tight">Atenção agora</h4>

        <p className="text-foreground-secondary mt-1">
          Tarefas que merecem sua atenção no momento.
        </p>
      </div>

      <div className="mt-4 grid gap-4">
        <DashboardAttentionGroup
          title="Atrasadas"
          tasks={attention.overdue}
          dateType="dueDate"
          dateClassName="text-overdue"
          icon={<AlertTriangle size={16} className="text-overdue" />}
        />

        <DashboardAttentionGroup
          title="Próximas de vencer"
          tasks={attention.dueSoon}
          dateType="dueDate"
          dateClassName="text-warning"
          icon={<Clock3 size={16} className="text-warning" />}
        />

        <DashboardAttentionGroup
          title="Criadas recentemente"
          tasks={attention.recentlyCreated}
          dateType="createdAt"
          icon={<Sparkles size={16} className="text-primary" />}
        />
      </div>
    </section>
  )
}
