"use client"

import { useState } from "react"
import { Calendar, Users, Clock, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Promotion {
  id: number
  title: string
  destination: string
  description: string
  originalPrice: number
  discountPrice: number
  duration: string
  groupSize: string
  rating: number
  image: string
  featured: boolean
  dates: string
}

const promotions: Promotion[] = [
  {
    id: 1,
    title: "Cancún Todo Incluido",
    destination: "Cancún, México",
    description: "Disfruta de las playas paradisíacas del Caribe mexicano con hospedaje de lujo y todas las comidas incluidas.",
    originalPrice: 25999,
    discountPrice: 18999,
    duration: "5 días / 4 noches",
    groupSize: "2-6 personas",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=800&h=600&fit=crop",
    featured: true,
    dates: "Mayo - Julio 2026"
  },
  {
    id: 2,
    title: "Riviera Maya Aventura",
    destination: "Riviera Maya, México",
    description: "Explora cenotes, ruinas mayas y las mejores playas de la Riviera con guías expertos.",
    originalPrice: 22999,
    discountPrice: 16999,
    duration: "4 días / 3 noches",
    groupSize: "2-8 personas",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800&h=600&fit=crop",
    featured: true,
    dates: "Junio - Agosto 2026"
  },
  {
    id: 3,
    title: "Los Cabos Premium",
    destination: "Los Cabos, México",
    description: "Vive la experiencia de lujo en Los Cabos con actividades acuáticas y gastronomía de primer nivel.",
    originalPrice: 32999,
    discountPrice: 26999,
    duration: "6 días / 5 noches",
    groupSize: "2-4 personas",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
    featured: false,
    dates: "Abril - Septiembre 2026"
  },
  {
    id: 4,
    title: "Oaxaca Cultural",
    destination: "Oaxaca, México",
    description: "Descubre la riqueza cultural, gastronómica y artesanal de Oaxaca en un viaje inolvidable.",
    originalPrice: 15999,
    discountPrice: 12999,
    duration: "4 días / 3 noches",
    groupSize: "2-10 personas",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&h=600&fit=crop",
    featured: false,
    dates: "Todo el año"
  },
  {
    id: 5,
    title: "Puerto Vallarta Romántico",
    destination: "Puerto Vallarta, México",
    description: "Escapada romántica perfecta con cenas a la luz de las velas y atardeceres espectaculares.",
    originalPrice: 19999,
    discountPrice: 14999,
    duration: "3 días / 2 noches",
    groupSize: "2 personas",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    featured: true,
    dates: "Todo el año"
  },
  {
    id: 6,
    title: "CDMX Histórico",
    destination: "Ciudad de México",
    description: "Explora la capital mexicana: museos, gastronomía, arquitectura y vida nocturna única.",
    originalPrice: 11999,
    discountPrice: 8999,
    duration: "3 días / 2 noches",
    groupSize: "1-8 personas",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518659526054-190340b32735?w=800&h=600&fit=crop",
    featured: false,
    dates: "Todo el año"
  }
]

interface PromotionsProps {
  onSelectPromotion: (promotion: Promotion) => void
}

export function Promotions({ onSelectPromotion }: PromotionsProps) {
  const [filter, setFilter] = useState<"all" | "featured">("all")

  const filteredPromotions = filter === "featured" 
    ? promotions.filter(p => p.featured) 
    : promotions

  return (
    <section id="promociones" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
            Ofertas Exclusivas
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            Nuestras Mejores Promociones
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Descubre nuestros paquetes turísticos con descuentos especiales. 
            ¡Reserva ahora y ahorra en tu próxima aventura!
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mb-8 flex justify-center gap-4">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-primary text-primary-foreground" : ""}
          >
            Todas las Ofertas
          </Button>
          <Button
            variant={filter === "featured" ? "default" : "outline"}
            onClick={() => setFilter("featured")}
            className={filter === "featured" ? "bg-primary text-primary-foreground" : ""}
          >
            Destacadas
          </Button>
        </div>

        {/* Promotions grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPromotions.map((promotion) => (
            <Card 
              key={promotion.id} 
              className="group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {promotion.featured && (
                    <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                      Destacado
                    </Badge>
                  )}
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-secondary/90 px-2 py-1 text-sm text-secondary-foreground">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span>{promotion.rating}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/90 to-transparent p-4">
                    <p className="text-sm text-secondary-foreground/80">{promotion.destination}</p>
                    <h3 className="text-xl font-bold text-secondary-foreground">{promotion.title}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {promotion.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{promotion.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{promotion.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{promotion.dates}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    ${promotion.discountPrice.toLocaleString()} MXN
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${promotion.originalPrice.toLocaleString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors group"
                  onClick={() => onSelectPromotion(promotion)}
                >
                  <span>Me Interesa</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export type { Promotion }
