import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { TaskPriority } from '@/features/tasks/types/task'

import { taskPriorityFilterOptions } from '../constants/task-workspace-filter-options'

type TaskWorkspacePriorityFilterProps = {
  value?: TaskPriority
  onChange: (value?: TaskPriority) => void
}

export function TaskWorkspacePriorityFilter({
  value,
  onChange,
}: TaskWorkspacePriorityFilterProps) {
  return (
    <Select
      items={[
        {
          value: 'all',
          label: 'Todas as prioridades',
        },
        ...taskPriorityFilterOptions,
      ]}
      value={value ?? 'all'}
      onValueChange={(value) => {
        onChange(value === 'all' ? undefined : (value as TaskPriority))
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Prioridade" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">Todas as prioridades</SelectItem>

        {taskPriorityFilterOptions.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
