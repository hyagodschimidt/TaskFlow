import type { ReactNode } from 'react'

type SidebarSectionProps = {
  title: string
  children: ReactNode
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="space-y-2">
      <small className="text-muted-foreground px-3 uppercase">{title}</small>

      <div className="space-y-1">{children}</div>
    </div>
  )
}
