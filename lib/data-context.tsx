'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { User, Order, Promotion, Destination, Service, DashboardStats } from './types'
import { 
  initialUsers, 
  initialOrders, 
  initialPromotions, 
  initialDestinations, 
  initialServices,
  generateId 
} from './store'

interface DataContextType {
  // Users
  users: User[]
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
  
  // Orders
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateOrder: (id: string, order: Partial<Order>) => void
  deleteOrder: (id: string) => void
  
  // Promotions
  promotions: Promotion[]
  addPromotion: (promotion: Omit<Promotion, 'id' | 'createdAt'>) => void
  updatePromotion: (id: string, promotion: Partial<Promotion>) => void
  deletePromotion: (id: string) => void
  
  // Destinations
  destinations: Destination[]
  addDestination: (destination: Omit<Destination, 'id'>) => void
  updateDestination: (id: string, destination: Partial<Destination>) => void
  deleteDestination: (id: string) => void
  
  // Services
  services: Service[]
  addService: (service: Omit<Service, 'id'>) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
  
  // Stats
  getStats: () => DashboardStats
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions)
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations)
  const [services, setServices] = useState<Service[]>(initialServices)

  // Users CRUD
  const addUser = useCallback((user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    setUsers(prev => [...prev, newUser])
  }, [])

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u))
  }, [])

  const deleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }, [])

  // Orders CRUD
  const addOrder = useCallback((order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newOrder: Order = {
      ...order,
      id: generateId(),
      createdAt: now,
      updatedAt: now
    }
    setOrders(prev => [...prev, newOrder])
  }, [])

  const updateOrder = useCallback((id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => 
      o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o
    ))
  }, [])

  const deleteOrder = useCallback((id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id))
  }, [])

  // Promotions CRUD
  const addPromotion = useCallback((promotion: Omit<Promotion, 'id' | 'createdAt'>) => {
    const newPromotion: Promotion = {
      ...promotion,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    setPromotions(prev => [...prev, newPromotion])
  }, [])

  const updatePromotion = useCallback((id: string, updates: Partial<Promotion>) => {
    setPromotions(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }, [])

  const deletePromotion = useCallback((id: string) => {
    setPromotions(prev => prev.filter(p => p.id !== id))
  }, [])

  // Destinations CRUD
  const addDestination = useCallback((destination: Omit<Destination, 'id'>) => {
    const newDestination: Destination = {
      ...destination,
      id: generateId()
    }
    setDestinations(prev => [...prev, newDestination])
  }, [])

  const updateDestination = useCallback((id: string, updates: Partial<Destination>) => {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d))
  }, [])

  const deleteDestination = useCallback((id: string) => {
    setDestinations(prev => prev.filter(d => d.id !== id))
  }, [])

  // Services CRUD
  const addService = useCallback((service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: generateId()
    }
    setServices(prev => [...prev, newService])
  }, [])

  const updateService = useCallback((id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }, [])

  const deleteService = useCallback((id: string) => {
    setServices(prev => prev.filter(s => s.id !== id))
  }, [])

  // Dashboard Stats
  const getStats = useCallback((): DashboardStats => {
    const confirmedOrders = orders.filter(o => o.status === 'confirmed')
    return {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      confirmedOrders: confirmedOrders.length,
      totalRevenue: confirmedOrders.reduce((acc, o) => {
        const promo = promotions.find(p => p.id === o.packageId)
        return acc + (promo?.discountedPrice || 0) * o.travelers
      }, 0),
      activePromotions: promotions.filter(p => p.active).length,
      totalUsers: users.length
    }
  }, [orders, promotions, users])

  return (
    <DataContext.Provider value={{
      users, addUser, updateUser, deleteUser,
      orders, addOrder, updateOrder, deleteOrder,
      promotions, addPromotion, updatePromotion, deletePromotion,
      destinations, addDestination, updateDestination, deleteDestination,
      services, addService, updateService, deleteService,
      getStats
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
