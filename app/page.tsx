"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Promotions, type Promotion } from "@/components/promotions"
import { Destinations } from "@/components/destinations"
import { Services } from "@/components/services"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { InterestForm } from "@/components/interest-form"

export default function Home() {
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleSelectPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedPromotion(null)
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Promotions onSelectPromotion={handleSelectPromotion} />
      <Destinations />
      <Services />
      <Contact />
      <Footer />
      
      {/* Interest Form Modal */}
      <InterestForm 
        promotion={selectedPromotion}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
      />
    </main>
  )
}
