'use client'

import { useState } from 'react'
import { useData } from '@/lib/data-context'
import { Header } from './header'
import { DataTable } from './data-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { MoreHorizontal, Eye, Trash2, Mail, Phone, Calendar, Users, MessageSquare } from 'lucide-react'
import type { Order } from '@/lib/types'

const statusConfig = {
  pending: { label: 'Pendiente', variant: 'outline' as const, color: 'bg-yellow-500' },
  contacted: { label: 'Contactado', variant: 'secondary' as const, color: 'bg-blue-500' },
  confirmed: { label: 'Confirmado', variant: 'default' as const, color: 'bg-green-500' },
  cancelled: { label: 'Cancelado', variant: 'destructive' as const, color: 'bg-red-500' }
}

export function OrdersPage() {
  const { orders, updateOrder, deleteOrder } = useData()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === statusFilter)

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrder(orderId, { status })
  }

  const handleDelete = () => {
    if (selectedOrder) {
      deleteOrder(selectedOrder.id)
      setShowDelete(false)
      setSelectedOrder(null)
    }
  }

  const columns = [
    {
      key: 'customerName',
      header: 'Cliente',
      sortable: true,
      render: (order: Order) => (
        <div>
          <p className="font-medium">{order.customerName}</p>
          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
        </div>
      )
    },
    {
      key: 'packageName',
      header: 'Paquete',
      sortable: true,
      render: (order: Order) => (
        <div>
          <p className="font-medium">{order.packageName}</p>
          <p className="text-sm text-muted-foreground">{order.travelers} viajero(s)</p>
        </div>
      )
    },
    {
      key: 'preferredDate',
      header: 'Fecha Preferida',
      sortable: true,
      render: (order: Order) => (
        <span className="text-sm">{formatDate(order.preferredDate)}</span>
      )
    },
    {
      key: 'status',
      header: 'Estado',
      render: (order: Order) => (
        <Select
          value={order.status}
          onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
        >
          <SelectTrigger className="w-32 h-8">
            <SelectValue>
              <Badge variant={statusConfig[order.status].variant}>
                {statusConfig[order.status].label}
              </Badge>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(statusConfig).map(([key, config]) => (
              <SelectItem key={key} value={key}>
                <Badge variant={config.variant}>{config.label}</Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
    {
      key: 'createdAt',
      header: 'Fecha Registro',
      sortable: true,
      render: (order: Order) => (
        <span className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</span>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (order: Order) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setSelectedOrder(order); setShowDetails(true) }}>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => { setSelectedOrder(order); setShowDelete(true) }}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="min-h-screen">
      <Header 
        title="Ordenes de Interes" 
        description="Gestiona las solicitudes de los clientes"
      />
      
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          {Object.entries(statusConfig).map(([key, config]) => {
            const count = orders.filter(o => o.status === key).length
            return (
              <Card 
                key={key}
                className={`cursor-pointer transition-all ${statusFilter === key ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`h-3 w-3 rounded-full ${config.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground">{config.label}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Data Table */}
        <DataTable
          data={filteredOrders as unknown as Record<string, unknown>[]}
          columns={columns as { key: string; header: string; render?: (item: Record<string, unknown>) => React.ReactNode; sortable?: boolean }[]}
          searchKey="customerName"
          searchPlaceholder="Buscar por nombre de cliente..."
        />
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalles de la Orden</DialogTitle>
            <DialogDescription>
              Informacion completa de la solicitud del cliente
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant={statusConfig[selectedOrder.status].variant} className="text-sm">
                  {statusConfig[selectedOrder.status].label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ID: {selectedOrder.id}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Informacion del Cliente</h4>
                  <div className="space-y-2">
                    <p className="font-medium text-lg">{selectedOrder.customerName}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${selectedOrder.customerEmail}`} className="text-primary hover:underline">
                        {selectedOrder.customerEmail}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${selectedOrder.customerPhone}`} className="text-primary hover:underline">
                        {selectedOrder.customerPhone}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Detalles del Paquete</h4>
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <p className="font-medium">{selectedOrder.packageName}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedOrder.travelers} viajero(s)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(selectedOrder.preferredDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedOrder.message && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Mensaje del Cliente</h4>
                    <div className="p-4 rounded-lg bg-muted/50 flex gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{selectedOrder.message}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                  <span>Creado: {formatDate(selectedOrder.createdAt)}</span>
                  <span>Actualizado: {formatDate(selectedOrder.updatedAt)}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Orden</DialogTitle>
            <DialogDescription>
              Estas seguro de que deseas eliminar esta orden? Esta accion no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">{selectedOrder.customerName}</p>
              <p className="text-sm text-muted-foreground">{selectedOrder.packageName}</p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
