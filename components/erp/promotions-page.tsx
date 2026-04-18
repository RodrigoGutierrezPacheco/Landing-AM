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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Star,
  Search,
  Tag
} from 'lucide-react'
import type { Promotion } from '@/lib/types'

export function PromotionsPage() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = useData()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    description: '',
    originalPrice: '',
    discountedPrice: '',
    duration: '',
    includes: '',
    imageUrl: '',
    featured: false,
    active: true,
    validUntil: ''
  })

  const filteredPromotions = promotions.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.destination.toLowerCase().includes(search.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      destination: '',
      description: '',
      originalPrice: '',
      discountedPrice: '',
      duration: '',
      includes: '',
      imageUrl: '',
      featured: false,
      active: true,
      validUntil: ''
    })
    setEditingPromotion(null)
  }

  const handleEdit = (promotion: Promotion) => {
    setFormData({
      title: promotion.title,
      destination: promotion.destination,
      description: promotion.description,
      originalPrice: promotion.originalPrice.toString(),
      discountedPrice: promotion.discountedPrice.toString(),
      duration: promotion.duration,
      includes: promotion.includes.join(', '),
      imageUrl: promotion.imageUrl,
      featured: promotion.featured,
      active: promotion.active,
      validUntil: promotion.validUntil
    })
    setEditingPromotion(promotion)
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const promotionData = {
      title: formData.title,
      destination: formData.destination,
      description: formData.description,
      originalPrice: parseFloat(formData.originalPrice),
      discountedPrice: parseFloat(formData.discountedPrice),
      duration: formData.duration,
      includes: formData.includes.split(',').map(s => s.trim()).filter(Boolean),
      imageUrl: formData.imageUrl || '/images/default.jpg',
      featured: formData.featured,
      active: formData.active,
      validUntil: formData.validUntil
    }

    if (editingPromotion) {
      updatePromotion(editingPromotion.id, promotionData)
    } else {
      addPromotion(promotionData)
    }

    setShowForm(false)
    resetForm()
  }

  const handleDelete = () => {
    if (editingPromotion) {
      deletePromotion(editingPromotion.id)
      setShowDelete(false)
      setEditingPromotion(null)
    }
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Promociones" 
        description="Gestiona los paquetes turisticos y ofertas"
      />
      
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar promociones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => { resetForm(); setShowForm(true) }}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Promocion
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{promotions.length}</p>
                <p className="text-sm text-muted-foreground">Total Promociones</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Tag className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{promotions.filter(p => p.active).length}</p>
                <p className="text-sm text-muted-foreground">Activas</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{promotions.filter(p => p.featured).length}</p>
                <p className="text-sm text-muted-foreground">Destacadas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Promotions Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPromotions.map(promotion => (
            <Card key={promotion.id} className={`overflow-hidden ${!promotion.active ? 'opacity-60' : ''}`}>
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {promotion.featured && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Star className="mr-1 h-3 w-3" /> Destacado
                    </Badge>
                  )}
                  {!promotion.active && (
                    <Badge variant="secondary">Inactivo</Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(promotion)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => { setEditingPromotion(promotion); setShowDelete(true) }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-semibold text-white">{promotion.title}</h3>
                  <p className="text-sm text-white/80">{promotion.destination}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(promotion.discountedPrice)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(promotion.originalPrice)}
                  </span>
                  <Badge variant="outline" className="ml-auto text-accent border-accent">
                    -{Math.round((1 - promotion.discountedPrice / promotion.originalPrice) * 100)}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{promotion.duration}</p>
                <div className="flex flex-wrap gap-1">
                  {promotion.includes.slice(0, 3).map((item, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                  {promotion.includes.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{promotion.includes.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPromotion ? 'Editar' : 'Nueva'} Promocion</DialogTitle>
            <DialogDescription>
              {editingPromotion ? 'Modifica los datos de la promocion' : 'Crea un nuevo paquete turistico'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>Titulo</FieldLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Cancun Todo Incluido"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Destino</FieldLabel>
                <Input
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="Cancun, Quintana Roo"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Descripcion</FieldLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descripcion del paquete..."
                  rows={3}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Precio Original</FieldLabel>
                  <Input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="25000"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>Precio con Descuento</FieldLabel>
                  <Input
                    type="number"
                    value={formData.discountedPrice}
                    onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                    placeholder="18500"
                    required
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel>Duracion</FieldLabel>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="5 dias / 4 noches"
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Incluye (separado por comas)</FieldLabel>
                <Input
                  value={formData.includes}
                  onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                  placeholder="Vuelo redondo, Hotel, Todo incluido"
                />
              </Field>

              <Field>
                <FieldLabel>Valido hasta</FieldLabel>
                <Input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  required
                />
              </Field>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <span className="text-sm">Destacado</span>
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
                {editingPromotion ? 'Guardar Cambios' : 'Crear Promocion'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Promocion</DialogTitle>
            <DialogDescription>
              Estas seguro de que deseas eliminar esta promocion? Esta accion no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {editingPromotion && (
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">{editingPromotion.title}</p>
              <p className="text-sm text-muted-foreground">{editingPromotion.destination}</p>
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
