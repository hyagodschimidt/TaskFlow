import type { LucideIcon } from 'lucide-react'

type SidebarDisabledItemProps = {
  label: string
  icon: LucideIcon
}

export function SidebarDisabledItem({
  label,
  icon: Icon,
}: SidebarDisabledItemProps) {
  return (
    <button
      type="button"
      disabled
      className="text-muted-foreground flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm opacity-60"
    >
      <Icon className="size-4" />

      <span>{label}</span>
    </button>
  )
}
