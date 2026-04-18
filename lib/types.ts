export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  avatar?: string
  createdAt: string
  lastLogin?: string
  status: 'active' | 'inactive'
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  packageId: string
  packageName: string
  travelers: number
  preferredDate: string
  message?: string
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface Promotion {
  id: string
  title: string
  destination: string
  description: string
  originalPrice: number
  discountedPrice: number
  duration: string
  includes: string[]
  imageUrl: string
  featured: boolean
  active: boolean
  validUntil: string
  createdAt: string
}

export interface Destination {
  id: string
  name: string
  country: string
  description: string
  imageUrl: string
  popular: boolean
  active: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  active: boolean
}

export interface DashboardStats {
  totalOrders: number
  pendingOrders: number
  confirmedOrders: number
  totalRevenue: number
  activePromotions: number
  totalUsers: number
}
