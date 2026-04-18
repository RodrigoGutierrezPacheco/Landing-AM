import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-6 flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="AM Pachuca Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-secondary-foreground">AM Pachuca</span>
                <span className="text-xs text-secondary-foreground/70">Agencia de Viajes</span>
              </div>
            </Link>
            <p className="mb-6 text-sm text-secondary-foreground/70">
              Tu agencia de viajes de confianza en Pachuca. 
              Hacemos realidad tus sueños de viajar con los mejores paquetes y promociones.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-secondary-foreground">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {["Inicio", "Promociones", "Destinos", "Servicios", "Contacto"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-secondary-foreground/70 transition-colors hover:text-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-semibold text-secondary-foreground">Servicios</h4>
            <ul className="space-y-3">
              {["Vuelos", "Hospedaje", "Paquetes Todo Incluido", "Renta de Autos", "Seguros de Viaje", "Tours y Excursiones"].map((service) => (
                <li key={service}>
                  <span className="text-sm text-secondary-foreground/70">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-secondary-foreground">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-secondary-foreground/70">
                  Blvd. Felipe Ángeles 123, Col. Centro, Pachuca, Hgo.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href="tel:+527711234567" className="text-sm text-secondary-foreground/70 hover:text-accent">
                  +52 771 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href="mailto:contacto@ampachuca.com" className="text-sm text-secondary-foreground/70 hover:text-accent">
                  contacto@ampachuca.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-secondary-foreground/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-secondary-foreground/60">
            © {currentYear} AM Pachuca. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-secondary-foreground/60 hover:text-accent">
              Términos y Condiciones
            </a>
            <a href="#" className="text-sm text-secondary-foreground/60 hover:text-accent">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
