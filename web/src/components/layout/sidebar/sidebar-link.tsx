import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

type SidebarLinkProps = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

export function SidebarLink({ to, label, icon: Icon, end }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'flex h-9 items-center gap-3 rounded-sm px-3',
          'mb-2 text-sm transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-layer',
        ].join(' ')
      }
    >
      <Icon className="size-4" />

      <span>{label}</span>
    </NavLink>
  )
}
