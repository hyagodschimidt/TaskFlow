import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { TaskWorkspaceDueFilter } from '@/features/task-workspace/types/task-workspace-filters'

import { taskDueFilterOptions } from '../constants/task-workspace-filter-options'

type TaskWorkspaceDueFilterProps = {
  value?: TaskWorkspaceDueFilter
  onChange: (value?: TaskWorkspaceDueFilter) => void
}

export function TaskWorkspaceDueFilterSelect({
  value,
  onChange,
}: TaskWorkspaceDueFilterProps) {
  return (
    <Select
      items={[
        {
          value: 'all',
          label: 'Qualquer prazo',
        },
        ...taskDueFilterOptions,
      ]}
      value={value ?? 'all'}
      onValueChange={(value) => {
        onChange(
          value === 'all' ? undefined : (value as TaskWorkspaceDueFilter),
        )
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Prazo" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">Qualquer prazo</SelectItem>

        {taskDueFilterOptions.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
