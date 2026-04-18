"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#promociones", label: "Promociones" },
    { href: "#destinos", label: "Destinos" },
    { href: "#servicios", label: "Servicios" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="border-b border-secondary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <div className="flex items-center justify-between text-sm text-secondary-foreground/80">
            <div className="hidden items-center gap-6 md:flex">
              <a href="tel:+527711234567" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                <span>+52 771 123 4567</span>
              </a>
              <a href="mailto:contacto@ampachuca.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                <span>contacto@ampachuca.com</span>
              </a>
            </div>
            <p className="text-xs md:text-sm">¡Viaja con nosotros y descubre el mundo!</p>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-secondary-foreground/90 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="#reservar">Reservar Ahora</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-secondary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-4 border-t border-secondary-foreground/10 pt-4 lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-secondary-foreground/90 transition-colors hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                <a href="#reservar">Reservar Ahora</a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
