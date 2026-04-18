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
  Plus, 
  Edit, 
  Trash2, 
  MapPin,
  Search,
  Star
} from 'lucide-react'
import type { Destination } from '@/lib/types'

export function DestinationsPage() {
  const { destinations, addDestination, updateDestination, deleteDestination } = useData()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    description: '',
    imageUrl: '',
    popular: false,
    active: true
  })

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.country.toLowerCase().includes(search.toLowerCase())
  )

  const resetForm = () => {
    setFormData({
      name: '',
      country: '',
      description: '',
      imageUrl: '',
      popular: false,
      active: true
    })
    setEditingDestination(null)
  }

  const handleEdit = (destination: Destination) => {
    setFormData({
      name: destination.name,
      country: destination.country,
      description: destination.description,
      imageUrl: destination.imageUrl,
      popular: destination.popular,
      active: destination.active
    })
    setEditingDestination(destination)
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const destinationData = {
      name: formData.name,
      country: formData.country,
      description: formData.description,
      imageUrl: formData.imageUrl || '/images/default.jpg',
      popular: formData.popular,
      active: formData.active
    }

    if (editingDestination) {
      updateDestination(editingDestination.id, destinationData)
    } else {
      addDestination(destinationData)
    }

    setShowForm(false)
    resetForm()
  }

  const handleDelete = () => {
    if (editingDestination) {
      deleteDestination(editingDestination.id)
      setShowDelete(false)
      setEditingDestination(null)
    }
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Destinos" 
        description="Gestiona los destinos turisticos disponibles"
      />
      
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar destinos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => { resetForm(); setShowForm(true) }}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Destino
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{destinations.length}</p>
                <p className="text-sm text-muted-foreground">Total Destinos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <MapPin className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{destinations.filter(d => d.active).length}</p>
                <p className="text-sm text-muted-foreground">Activos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{destinations.filter(d => d.popular).length}</p>
                <p className="text-sm text-muted-foreground">Populares</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Destinations Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDestinations.map(destination => (
            <Card 
              key={destination.id} 
              className={`overflow-hidden group ${!destination.active ? 'opacity-60' : ''}`}
            >
              <div className="aspect-[4/3] bg-muted relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {destination.popular && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Star className="mr-1 h-3 w-3" /> Popular
                    </Badge>
                  )}
                  {!destination.active && (
                    <Badge variant="secondary">Inactivo</Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleEdit(destination)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => { setEditingDestination(destination); setShowDelete(true) }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
                  <p className="text-sm text-white/80">{destination.country}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {destination.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingDestination ? 'Editar' : 'Nuevo'} Destino</DialogTitle>
            <DialogDescription>
              {editingDestination ? 'Modifica los datos del destino' : 'Agrega un nuevo destino turistico'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Nombre</FieldLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Cancun"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Pais</FieldLabel>
                <Input
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Mexico"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Descripcion</FieldLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripcion del destino..."
                  rows={3}
                />
              </Field>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.popular}
                    onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
                  />
                  <span className="text-sm">Popular</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <span className="text-sm">Activo</span>
                </div>
              </div>
            </FieldGroup>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingDestination ? 'Guardar Cambios' : 'Crear Destino'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Destino</DialogTitle>
            <DialogDescription>
              Estas seguro de que deseas eliminar este destino? Esta accion no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {editingDestination && (
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">{editingDestination.name}</p>
              <p className="text-sm text-muted-foreground">{editingDestination.country}</p>
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
