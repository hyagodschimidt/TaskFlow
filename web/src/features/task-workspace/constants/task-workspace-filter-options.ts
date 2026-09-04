import type { TaskWorkspacePreset } from '@/features/task-workspace/types/task-workspace-filters'
import type { TaskPriority, TaskStatus } from '@/features/tasks/types/task'

import type { TaskWorkspaceDueFilter } from '../types/task-workspace-filters'

export const taskStatusFilterOptions = [
  {
    value: 'pending',
    label: 'Pendente',
  },
  {
    value: 'in_progress',
    label: 'Em andamento',
  },
  {
    value: 'completed',
    label: 'Concluída',
  },
] satisfies {
  value: TaskStatus
  label: string
}[]

export const taskPriorityFilterOptions = [
  {
    value: 'low',
    label: 'Baixa',
  },
  {
    value: 'medium',
    label: 'Média',
  },
  {
    value: 'high',
    label: 'Alta',
  },
  {
    value: 'urgent',
    label: 'Urgente',
  },
] satisfies {
  value: TaskPriority
  label: string
}[]

export const taskDueFilterOptions = [
  {
    value: 'today',
    label: 'Hoje',
  },
  {
    value: 'this-week',
    label: 'Esta semana',
  },
  {
    value: 'overdue',
    label: 'Atrasadas',
  },
] satisfies {
  value: TaskWorkspaceDueFilter
  label: string
}[]

export const taskPresetFilterOptions = [
  {
    value: 'due-soon',
    label: 'Próximas de vencer',
  },
  {
    value: 'recently-created',
    label: 'Criadas recentemente',
  },
] satisfies {
  value: TaskWorkspacePreset
  label: string
}[]
