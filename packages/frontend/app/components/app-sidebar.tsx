import React from 'react'
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react'

import { NavFavorites } from '@/components/nav-favorites'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavWorkspaces } from '@/components/nav-workspaces'
import { TeamSwitcher } from '@/components/team-switcher'
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

const data = {
  teams: [
    {
      name: 'APP',
      logo: Command,
      plan: 'Owner',
    },
  ],
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
    {
      title: 'File Manager',
      url: '/file-manager',
      icon: Upload,
      badge: '10',
    },
    {
      title: 'Product Managment',
      url: '/products',
      icon: ShoppingBag,
      badge: '10',
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>

      <SidebarRail />
    </Sidebar>
  )
}
