"use client"

import { Plane, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary pt-32 pb-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm text-primary-foreground">
          <Plane className="h-4 w-4" />
          <span>Tu próxima aventura comienza aquí</span>
        </div>

        {/* Main heading */}
        <h1 className="mb-6 text-4xl font-bold leading-tight text-secondary-foreground md:text-6xl lg:text-7xl text-balance">
          Descubre el Mundo con{" "}
          <span className="text-accent">AM Pachuca</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary-foreground/80 md:text-xl text-pretty">
          Somos tu agencia de viajes de confianza. Ofrecemos paquetes turísticos exclusivos, 
          promociones increíbles y experiencias inolvidables para ti y tu familia.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg" asChild>
            <a href="#promociones">Ver Promociones</a>
          </Button>
          <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-black hover:bg-secondary-foreground/10 hover:text-black px-8 py-6 text-lg" asChild>
            <a href="#contacto">Contáctanos</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <span className="text-3xl font-bold text-secondary-foreground">50+</span>
            <span className="text-sm text-secondary-foreground/70">Destinos</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Plane className="h-6 w-6 text-accent" />
            </div>
            <span className="text-3xl font-bold text-secondary-foreground">1000+</span>
            <span className="text-sm text-secondary-foreground/70">Viajes Realizados</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <span className="text-3xl font-bold text-secondary-foreground">10+</span>
            <span className="text-sm text-secondary-foreground/70">Años de Experiencia</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-secondary-foreground/30 p-1">
          <div className="h-2 w-1 mx-auto rounded-full bg-accent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
