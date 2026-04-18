"use client"

import { useState, useEffect } from "react"
import { X, Send, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Promotion } from "./promotions"

interface InterestFormProps {
  promotion: Promotion | null
  isOpen: boolean
  onClose: () => void
}

export function InterestForm({ promotion, isOpen, onClose }: InterestFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "2",
    preferredDate: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log("[v0] Order submitted:", {
      promotion: promotion?.title,
      ...formData,
      timestamp: new Date().toISOString()
    })

    setIsSubmitting(false)
    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        travelers: "2",
        preferredDate: "",
        message: ""
      })
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative z-10 w-full max-w-lg bg-card border-border shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-foreground">
            {isSuccess ? "¡Registro Exitoso!" : "Registro de Interés"}
          </CardTitle>
          {promotion && !isSuccess && (
            <CardDescription className="text-muted-foreground">
              Paquete seleccionado: <span className="font-semibold text-primary">{promotion.title}</span>
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center py-8">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <Check className="h-8 w-8 text-accent" />
              </div>
              <p className="text-center text-foreground">
                ¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Promotion preview */}
              {promotion && (
                <div className="mb-6 flex gap-4 rounded-lg bg-muted p-3">
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{promotion.title}</h4>
                    <p className="text-sm text-muted-foreground">{promotion.destination}</p>
                    <p className="text-sm font-bold text-primary">
                      ${promotion.discountPrice.toLocaleString()} MXN
                    </p>
                  </div>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Correo electrónico *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="bg-input border-border"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Teléfono *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="771 123 4567"
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="travelers" className="text-sm font-medium text-foreground">
                    Número de viajeros
                  </label>
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="preferredDate" className="text-sm font-medium text-foreground">
                  Fecha preferida de viaje
                </label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Mensaje adicional
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="¿Tienes alguna pregunta o requerimiento especial?"
                  rows={3}
                  className="bg-input border-border resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Registro
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Al enviar este formulario, aceptas que nos comuniquemos contigo 
                para darte más información sobre este paquete.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
