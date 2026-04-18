"use client"

import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const destinations = [
  {
    name: "Cancún",
    country: "México",
    image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600&h=800&fit=crop",
    popular: true
  },
  {
    name: "Los Cabos",
    country: "México",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop",
    popular: true
  },
  {
    name: "Riviera Maya",
    country: "México",
    image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=600&h=400&fit=crop",
    popular: false
  },
  {
    name: "Puerto Vallarta",
    country: "México",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    popular: true
  },
  {
    name: "Oaxaca",
    country: "México",
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600&h=800&fit=crop",
    popular: false
  }
]

export function Destinations() {
  return (
    <section id="destinos" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            Explora
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            Destinos Populares
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Descubre los destinos más solicitados por nuestros clientes. 
            Playas paradisíacas, ciudades históricas y aventuras inolvidables.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
          {destinations.map((destination, index) => (
            <div
              key={destination.name}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 md:row-span-2" : 
                index === 4 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "h-80 md:h-full" : "h-56 md:h-full min-h-[200px]"}`}>
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
                
                {destination.popular && (
                  <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground">
                    Popular
                  </Badge>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-secondary-foreground/80 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-foreground">
                    {destination.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
