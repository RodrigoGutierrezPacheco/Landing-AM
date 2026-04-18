'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  ShoppingCart,
  Tag,
  MapPin,
  Briefcase,
  Users,
  LogOut,
  Plane,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/erp', icon: LayoutDashboard },
  { name: 'Ordenes', href: '/erp/ordenes', icon: ShoppingCart },
  { name: 'Promociones', href: '/erp/promociones', icon: Tag },
  { name: 'Destinos', href: '/erp/destinos', icon: MapPin },
  { name: 'Servicios', href: '/erp/servicios', icon: Briefcase },
  { name: 'Usuarios', href: '/erp/usuarios', icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <Link href="/erp" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Plane className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">AM Pachuca</span>
            </Link>
          )}
          {collapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary mx-auto">
              <Plane className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-border/50",
              collapsed && "absolute -right-3 top-6 bg-sidebar border border-sidebar-border rounded-full"
            )}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/erp' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-border/50 hover:text-sidebar-foreground",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          {!collapsed && user && (
            <div className="mb-3 px-2">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {user.email}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            onClick={logout}
            className={cn(
              "w-full text-sidebar-foreground/70 hover:text-red-400 hover:bg-red-500/10",
              collapsed ? "justify-center px-2" : "justify-start"
            )}
            title={collapsed ? "Cerrar sesion" : undefined}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Cerrar sesion</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}
