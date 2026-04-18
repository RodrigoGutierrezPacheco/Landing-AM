import { Plane, Hotel, Car, Compass, Shield, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Plane,
    title: "Vuelos",
    description: "Boletos de avión nacionales e internacionales con las mejores aerolíneas a precios competitivos."
  },
  {
    icon: Hotel,
    title: "Hospedaje",
    description: "Reserva hoteles de todas las categorías, desde económicos hasta resorts de lujo todo incluido."
  },
  {
    icon: Car,
    title: "Transporte",
    description: "Renta de autos, traslados al aeropuerto y tours privados para tu comodidad."
  },
  {
    icon: Compass,
    title: "Paquetes Turísticos",
    description: "Viajes organizados con todo incluido: vuelo, hotel, tours y actividades."
  },
  {
    icon: Shield,
    title: "Seguros de Viaje",
    description: "Protección completa para ti y tu familia durante todos tus viajes."
  },
  {
    icon: Headphones,
    title: "Atención 24/7",
    description: "Soporte durante todo tu viaje para cualquier emergencia o consulta."
  }
]

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-secondary-foreground md:text-4xl lg:text-5xl text-balance">
            Nuestros Servicios
          </h2>
          <p className="mx-auto max-w-2xl text-secondary-foreground/70 text-pretty">
            Ofrecemos una amplia gama de servicios para hacer tu viaje perfecto. 
            Desde la planificación hasta tu regreso, estamos contigo.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group border-secondary-foreground/10 bg-secondary-foreground/5 backdrop-blur transition-all duration-300 hover:bg-primary hover:shadow-xl"
            >
              <CardContent className="p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 transition-colors group-hover:bg-accent/20">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-secondary-foreground group-hover:text-primary-foreground">
                  {service.title}
                </h3>
                <p className="text-secondary-foreground/70 group-hover:text-primary-foreground/80">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
