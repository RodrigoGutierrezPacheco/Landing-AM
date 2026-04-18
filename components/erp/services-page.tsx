'use client'

import { useState } from 'react'
import { useData } from '@/lib/data-context'
import { Header } from './header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Briefcase,
  Plane,
  Building,
  Car,
  Map,
  Shield,
  FileText
} from 'lucide-react'
import type { Service } from '@/lib/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane,
  Building,
  Car,
  Map,
  Shield,
  FileText,
  Briefcase
}

const iconOptions = [
  { value: 'Plane', label: 'Avion' },
  { value: 'Building', label: 'Edificio' },
  { value: 'Car', label: 'Auto' },
  { value: 'Map', label: 'Mapa' },
  { value: 'Shield', label: 'Escudo' },
  { value: 'FileText', label: 'Documento' },
  { value: 'Briefcase', label: 'Maletin' }
]

export function ServicesPage() {
  const { services, addService, updateService, deleteService } = useData()
  const [showForm, setShowForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Briefcase',
    active: true
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: 'Briefcase',
      active: true
    })
    setEditingService(null)
  }

  const handleEdit = (service: Service) => {
    setFormData({
      name: service.name,
      description: service.description,
      icon: service.icon,
      active: service.active
    })
    setEditingService(service)
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const serviceData = {
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      active: formData.active
    }

    if (editingService) {
      updateService(editingService.id, serviceData)
    } else {
      addService(serviceData)
    }

    setShowForm(false)
    resetForm()
  }

  const handleDelete = () => {
    if (editingService) {
      deleteService(editingService.id)
      setShowDelete(false)
      setEditingService(null)
    }
  }

  const handleToggleActive = (service: Service) => {
    updateService(service.id, { active: !service.active })
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Servicios" 
        description="Gestiona los servicios que ofrece la agencia"
      />
      
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Card>
              <CardContent className="flex items-center gap-3 p-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-bold">{services.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-3">
                <Briefcase className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-bold">{services.filter(s => s.active).length}</p>
                  <p className="text-xs text-muted-foreground">Activos</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button onClick={() => { resetForm(); setShowForm(true) }}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Servicio
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(service => {
            const IconComponent = iconMap[service.icon] || Briefcase
            return (
              <Card 
                key={service.id} 
                className={`${!service.active ? 'opacity-60' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={service.active}
                        onCheckedChange={() => handleToggleActive(service)}
                      />
                      {service.active ? (
                        <Badge variant="default" className="bg-green-500">Activo</Badge>
                      ) : (
                        <Badge variant="secondary">Inactivo</Badge>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => { setEditingService(service); setShowDelete(true) }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Editar' : 'Nuevo'} Servicio</DialogTitle>
            <DialogDescription>
              {editingService ? 'Modifica los datos del servicio' : 'Agrega un nuevo servicio a la agencia'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Nombre</FieldLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Vuelos"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Descripcion</FieldLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripcion del servicio..."
                  rows={3}
                />
              </Field>

              <Field>
                <FieldLabel>Icono</FieldLabel>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(option => {
                      const Icon = iconMap[option.value]
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </Field>

              <div className="flex items-center gap-2 py-2">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <span className="text-sm">Activo</span>
              </div>
            </FieldGroup>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingService ? 'Guardar Cambios' : 'Crear Servicio'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Servicio</DialogTitle>
            <DialogDescription>
              Estas seguro de que deseas eliminar este servicio? Esta accion no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {editingService && (
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">{editingService.name}</p>
              <p className="text-sm text-muted-foreground">{editingService.description}</p>
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
