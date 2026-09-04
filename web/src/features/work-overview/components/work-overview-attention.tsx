import { AlertTriangle, Clock3, Sparkles } from 'lucide-react'

import { getTaskWorkspaceHref } from '@/features/task-workspace/utils/get-task-workspace-href'
import { WorkOverviewAttentionGroup } from '@/features/work-overview/components/work-overview-attention-group'

import type { WorkOverviewAttention as WorkOverviewAttentionType } from '../types/work-overview'

type WorkOverviewAttentionProps = {
  attention: WorkOverviewAttentionType
}

export function WorkOverviewAttention({
  attention,
}: WorkOverviewAttentionProps) {
  const overdueHref = getTaskWorkspaceHref({
    due: 'overdue',
  })

  const dueSoonHref = getTaskWorkspaceHref({
    preset: 'due-soon',
  })

  const recentlyCreatedHref = getTaskWorkspaceHref({
    preset: 'recently-created',
  })

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
          href={overdueHref}
        />

        <WorkOverviewAttentionGroup
          title="Próximas de vencer"
          tasks={attention.dueSoon}
          dateType="dueDate"
          dateClassName="text-warning"
          icon={<Clock3 size={16} className="text-warning" />}
          href={dueSoonHref}
        />

        <WorkOverviewAttentionGroup
          title="Criadas recentemente"
          tasks={attention.recentlyCreated}
          dateType="createdAt"
          icon={<Sparkles size={16} className="text-primary" />}
          href={recentlyCreatedHref}
        />
      </div>
    </section>
  )
}
