'use client'

import { useState } from 'react'
import { useData } from '@/lib/data-context'
import { useAuth } from '@/lib/auth-context'
import { Header } from './header'
import { DataTable } from './data-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
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
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users,
  Shield,
  UserCheck,
  UserX
} from 'lucide-react'
import type { User } from '@/lib/types'

const roleConfig = {
  admin: { label: 'Administrador', variant: 'default' as const, color: 'bg-primary' },
  editor: { label: 'Editor', variant: 'secondary' as const, color: 'bg-blue-500' },
  viewer: { label: 'Visor', variant: 'outline' as const, color: 'bg-gray-500' }
}

const statusConfig = {
  active: { label: 'Activo', variant: 'default' as const, color: 'bg-green-500' },
  inactive: { label: 'Inactivo', variant: 'secondary' as const, color: 'bg-gray-500' }
}

export function UsersPage() {
  const { users, addUser, updateUser, deleteUser } = useData()
  const { user: currentUser } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'viewer' as User['role'],
    status: 'active' as User['status']
  })

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'viewer',
      status: 'active'
    })
    setEditingUser(null)
  }

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    })
    setEditingUser(user)
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status
    }

    if (editingUser) {
      updateUser(editingUser.id, userData)
    } else {
      addUser(userData)
    }

    setShowForm(false)
    resetForm()
  }

  const handleDelete = () => {
    if (editingUser) {
      deleteUser(editingUser.id)
      setShowDelete(false)
      setEditingUser(null)
    }
  }

  const handleToggleStatus = (user: User) => {
    updateUser(user.id, { 
      status: user.status === 'active' ? 'inactive' : 'active' 
    })
  }

  const columns = [
    {
      key: 'name',
      header: 'Usuario',
      sortable: true,
      render: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Rol',
      render: (user: User) => (
        <Badge variant={roleConfig[user.role].variant}>
          {roleConfig[user.role].label}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Estado',
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={user.status === 'active'}
            onCheckedChange={() => handleToggleStatus(user)}
            disabled={user.email === currentUser?.email}
          />
          <Badge variant={statusConfig[user.status].variant}>
            {statusConfig[user.status].label}
          </Badge>
        </div>
      )
    },
    {
      key: 'createdAt',
      header: 'Fecha Registro',
      sortable: true,
      render: (user: User) => (
        <span className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</span>
      )
    },
    {
      key: 'lastLogin',
      header: 'Ultimo Acceso',
      render: (user: User) => (
        <span className="text-sm text-muted-foreground">
          {user.lastLogin ? formatDate(user.lastLogin) : 'Nunca'}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (user: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(user)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            {user.email !== currentUser?.email && (
              <DropdownMenuItem 
                onClick={() => { setEditingUser(user); setShowDelete(true) }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="min-h-screen">
      <Header 
        title="Usuarios" 
        description="Gestiona los usuarios del sistema"
      />
      
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Usuarios</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <UserCheck className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Activos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <UserX className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'inactive').length}</p>
                <p className="text-sm text-muted-foreground">Inactivos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Shield className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
                <p className="text-sm text-muted-foreground">Administradores</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="flex justify-end">
          <Button onClick={() => { resetForm(); setShowForm(true) }}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>

        {/* Data Table */}
        <DataTable
          data={users as unknown as Record<string, unknown>[]}
          columns={columns as { key: string; header: string; render?: (item: Record<string, unknown>) => React.ReactNode; sortable?: boolean }[]}
          searchKey="name"
          searchPlaceholder="Buscar por nombre..."
        />
      </div>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Editar' : 'Nuevo'} Usuario</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Modifica los datos del usuario' : 'Agrega un nuevo usuario al sistema'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Nombre completo</FieldLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Juan Perez"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Correo electronico</FieldLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="juan@ampachuca.com"
                  required
                  disabled={editingUser?.email === currentUser?.email}
                />
              </Field>

              <Field>
                <FieldLabel>Rol</FieldLabel>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value as User['role'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Estado</FieldLabel>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as User['status'] })}
                  disabled={editingUser?.email === currentUser?.email}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Usuario</DialogTitle>
            <DialogDescription>
              Estas seguro de que deseas eliminar este usuario? Esta accion no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {editingUser && (
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">{editingUser.name}</p>
              <p className="text-sm text-muted-foreground">{editingUser.email}</p>
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
