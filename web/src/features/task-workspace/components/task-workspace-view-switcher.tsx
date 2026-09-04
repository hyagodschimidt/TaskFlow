import { Columns3, List } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { TaskWorkspaceView } from '@/core/settings/app-settings-storage'

type TaskWorkspaceViewSwitcherProps = {
  value: TaskWorkspaceView
  onChange: (value: TaskWorkspaceView) => void
}

export function TaskWorkspaceViewSwitcher({
  value,
  onChange,
}: TaskWorkspaceViewSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={value === 'kanban' ? 'default' : 'outline'}
        aria-pressed={value === 'kanban'}
        aria-label="Visualização em Kanban"
        onClick={() => onChange('kanban')}
        className={value === 'kanban' ? 'min-w-28' : 'w-10 px-0'}
      >
        <Columns3 />

        {value === 'kanban' && <span>Kanban</span>}
      </Button>

      <Button
        type="button"
        variant={value === 'list' ? 'default' : 'outline'}
        aria-pressed={value === 'list'}
        aria-label="Visualização em lista"
        onClick={() => onChange('list')}
        className={value === 'list' ? 'min-w-28' : 'w-10 px-0'}
      >
        <List />

        {value === 'list' && <span>Lista</span>}
      </Button>
    </div>
  )
}
