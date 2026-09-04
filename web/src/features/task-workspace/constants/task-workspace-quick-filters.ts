import type { TaskWorkspaceQuickFilterValues } from '@/features/task-workspace/types/task-workspace-filters'

export type TaskWorkspaceQuickFilter = {
  id: string
  label: string
  filters: TaskWorkspaceQuickFilterValues
}

export const taskWorkspaceQuickFilters: TaskWorkspaceQuickFilter[] = [
  {
    id: 'urgent',
    label: 'Urgentes',
    filters: {
      priority: 'urgent',
    },
  },
  {
    id: 'overdue',
    label: 'Atrasadas',
    filters: {
      due: 'overdue',
    },
  },
  {
    id: 'today',
    label: 'Vencem hoje',
    filters: {
      due: 'today',
    },
  },
  {
    id: 'this-week',
    label: 'Vencem esta semana',
    filters: {
      due: 'this-week',
    },
  },
  {
    id: 'urgent-this-week',
    label: 'Urgentes esta semana',
    filters: {
      priority: 'urgent',
      due: 'this-week',
    },
  },
  {
    id: 'due-soon',
    label: 'Próximas de vencer',
    filters: {
      preset: 'due-soon',
    },
  },
  {
    id: 'recently-created',
    label: 'Criadas recentemente',
    filters: {
      preset: 'recently-created',
    },
  },
]
