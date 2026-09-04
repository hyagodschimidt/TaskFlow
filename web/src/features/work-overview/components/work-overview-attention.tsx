import { AlertTriangle, Clock3, Sparkles } from 'lucide-react'

import { WorkOverviewAttentionGroup } from '@/features/work-overview/components/work-overview-attention-group'

import type { WorkOverviewAttention as WorkOverviewAttentionType } from '../types/work-overview'

type WorkOverviewAttentionProps = {
  attention: WorkOverviewAttentionType
}

export function WorkOverviewAttention({
  attention,
}: WorkOverviewAttentionProps) {
  return (
    <section>
      <div>
        <h4 className="font-semibold tracking-tight">Atenção agora</h4>

        <p className="text-foreground-secondary mt-1">
          Tarefas que merecem sua atenção no momento.
        </p>
      </div>

      <div className="mt-4 grid gap-4">
        <WorkOverviewAttentionGroup
          title="Atrasadas"
          tasks={attention.overdue}
          dateType="dueDate"
          dateClassName="text-overdue"
          icon={<AlertTriangle size={16} className="text-overdue" />}
        />

        <WorkOverviewAttentionGroup
          title="Próximas de vencer"
          tasks={attention.dueSoon}
          dateType="dueDate"
          dateClassName="text-warning"
          icon={<Clock3 size={16} className="text-warning" />}
        />

        <WorkOverviewAttentionGroup
          title="Criadas recentemente"
          tasks={attention.recentlyCreated}
          dateType="createdAt"
          icon={<Sparkles size={16} className="text-primary" />}
        />
      </div>
    </section>
  )
}
