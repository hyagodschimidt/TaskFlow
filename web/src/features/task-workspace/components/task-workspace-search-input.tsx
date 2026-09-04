import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'

type TaskWorkspaceSearchInputProps = {
  initialValue: string
  onCommit: (value?: string) => void
}

export function TaskWorkspaceSearchInput({
  initialValue,
  onCommit,
}: TaskWorkspaceSearchInputProps) {
  const [value, setValue] = useState(initialValue)

  const timeoutRef = useRef<number | null>(null)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value

    setValue(nextValue)

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      const normalizedValue = nextValue.trim()

      setValue(normalizedValue)

      onCommit(normalizedValue || undefined)

      timeoutRef.current = null
    }, 600)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />

      <Input
        value={value}
        onChange={handleChange}
        placeholder="Buscar tarefas..."
        className="pl-9"
      />
    </div>
  )
}
