'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User } from './types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hardcoded credentials as requested
const VALID_CREDENTIALS = {
  email: 'prueba@prueba.com',
  password: 'prueba'
}

const ADMIN_USER: User = {
  id: '1',
  name: 'Administrador',
  email: 'prueba@prueba.com',
  role: 'admin',
  createdAt: '2024-01-01T00:00:00Z',
  lastLogin: new Date().toISOString(),
  status: 'active'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      setUser(ADMIN_USER)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
