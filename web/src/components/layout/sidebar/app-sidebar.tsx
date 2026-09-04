import {
  Bell,
  LayoutDashboard,
  ListTodo,
  LogOut,
  UserRound,
} from 'lucide-react'

import { routes } from '@/app/router/routes'
import IconBrand from '@/assets/icon-brand.svg'
import { SidebarDisabledItem } from '@/components/layout/sidebar/sidebar-disabled-item'
import { SidebarLink } from '@/components/layout/sidebar/sidebar-link'
import { SidebarSection } from '@/components/layout/sidebar/sidebar-section'

export function AppSidebar() {
  return (
    <aside className="bg-base/60 border-overlay sticky top-0 flex h-dvh w-56 shrink-0 flex-col border-r">
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="relative flex size-6 items-center justify-center">
          <div className="bg-primary absolute z-0 size-2.5 rounded blur-md" />
          <img src={IconBrand} className="z-1 size-6" />
        </div>

        <span className="font-semibold">TaskFlow</span>
      </div>

      <nav className="flex flex-1 flex-col gap-6 p-4">
        <SidebarSection title="Principal">
          <SidebarLink
            to={routes.workOverview()}
            icon={LayoutDashboard}
            label="Dashboard"
            end
          />

          <SidebarLink
            to={routes.taskWorkspace()}
            icon={ListTodo}
            label="Minhas tarefas"
          />

          <SidebarDisabledItem icon={Bell} label="Notificações" />
        </SidebarSection>

        <SidebarSection title="Configurações">
          <SidebarDisabledItem icon={UserRound} label="Perfil" />

          <SidebarDisabledItem icon={LogOut} label="Sair" />
        </SidebarSection>
      </nav>
    </aside>
  )
}
