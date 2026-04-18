'use client'

import { useData } from '@/lib/data-context'
import { Header } from './header'
import { StatCard } from './stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  DollarSign, 
  Tag, 
  Users,
  Clock,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

const statusConfig = {
  pending: { label: 'Pendiente', variant: 'outline' as const, color: 'text-yellow-600' },
  contacted: { label: 'Contactado', variant: 'secondary' as const, color: 'text-blue-600' },
  confirmed: { label: 'Confirmado', variant: 'default' as const, color: 'text-green-600' },
  cancelled: { label: 'Cancelado', variant: 'destructive' as const, color: 'text-red-600' }
}

export function DashboardPage() {
  const { orders, promotions, users, getStats } = useData()
  const stats = getStats()

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const featuredPromotions = promotions.filter(p => p.featured && p.active).slice(0, 3)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date))
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Dashboard" 
        description="Vista general del sistema"
      />
      
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Ordenes"
            value={stats.totalOrders}
            description={`${stats.pendingOrders} pendientes`}
            icon={ShoppingCart}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Ingresos Estimados"
            value={formatCurrency(stats.totalRevenue)}
            description="Ordenes confirmadas"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Promociones Activas"
            value={stats.activePromotions}
            description={`${promotions.length} totales`}
            icon={Tag}
          />
          <StatCard
            title="Usuarios"
            value={stats.totalUsers}
            description="En el sistema"
            icon={Users}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Ordenes Recientes</CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div 
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {order.customerName}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {order.packageName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm text-muted-foreground">
                          {order.travelers} viajero{order.travelers > 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <Badge variant={statusConfig[order.status].variant}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Promotions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Promociones Destacadas</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredPromotions.map(promo => (
                  <div 
                    key={promo.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">{promo.title}</p>
                        <p className="text-sm text-muted-foreground">{promo.destination}</p>
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        -{Math.round((1 - promo.discountedPrice / promo.originalPrice) * 100)}%
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(promo.discountedPrice)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(promo.originalPrice)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{promo.duration}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.confirmedOrders}</p>
                <p className="text-sm text-green-600/80">Ordenes Confirmadas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/20">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                <p className="text-sm text-yellow-600/80">Ordenes Pendientes</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{promotions.filter(p => p.featured).length}</p>
                <p className="text-sm text-primary/80">Promociones Destacadas</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
