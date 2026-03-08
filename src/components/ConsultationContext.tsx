'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import ConsultationDrawer from './ConsultationDrawer'

const ConsultationContext = createContext<{ open: () => void }>({ open: () => {} })

export function useConsultation() {
  return useContext(ConsultationContext)
}

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ConsultationContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <ConsultationDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ConsultationContext.Provider>
  )
}
