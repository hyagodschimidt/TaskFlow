import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { TaskStatus } from '@/features/tasks/types/task'

import { taskStatusFilterOptions } from '../constants/task-workspace-filter-options'

type TaskWorkspaceStatusFilterProps = {
  value?: TaskStatus
  onChange: (value?: TaskStatus) => void
}

export function TaskWorkspaceStatusFilter({
  value,
  onChange,
}: TaskWorkspaceStatusFilterProps) {
  return (
    <Select
      items={[
        {
          value: 'all',
          label: 'Todos os status',
        },
        ...taskStatusFilterOptions,
      ]}
      value={value ?? 'all'}
      onValueChange={(value) => {
        onChange(value === 'all' ? undefined : (value as TaskStatus))
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">Todos os status</SelectItem>

        {taskStatusFilterOptions.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
