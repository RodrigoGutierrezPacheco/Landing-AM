import type { User, Order, Promotion, Destination, Service } from './types'

// Initial mock data
export const initialUsers: User[] = [
  {
    id: '1',
    name: 'Administrador',
    email: 'prueba@prueba.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '2',
    name: 'Carlos Mendez',
    email: 'carlos@ampachuca.com',
    role: 'editor',
    createdAt: '2024-02-15T00:00:00Z',
    lastLogin: '2024-03-10T14:30:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria@ampachuca.com',
    role: 'viewer',
    createdAt: '2024-03-01T00:00:00Z',
    status: 'inactive'
  }
]

export const initialOrders: Order[] = [
  {
    id: '1',
    customerName: 'Juan Perez',
    customerEmail: 'juan@email.com',
    customerPhone: '+52 771 123 4567',
    packageId: '1',
    packageName: 'Cancun Todo Incluido',
    travelers: 2,
    preferredDate: '2024-04-15',
    message: 'Quisiera saber si incluye snorkel',
    status: 'pending',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    customerName: 'Ana Lopez',
    customerEmail: 'ana@email.com',
    customerPhone: '+52 771 234 5678',
    packageId: '2',
    packageName: 'Los Cabos Premium',
    travelers: 4,
    preferredDate: '2024-05-01',
    status: 'contacted',
    createdAt: '2024-03-14T08:00:00Z',
    updatedAt: '2024-03-15T09:00:00Z'
  },
  {
    id: '3',
    customerName: 'Roberto Martinez',
    customerEmail: 'roberto@email.com',
    customerPhone: '+52 771 345 6789',
    packageId: '3',
    packageName: 'Riviera Maya Familiar',
    travelers: 5,
    preferredDate: '2024-06-10',
    message: 'Viajamos con 2 ninos',
    status: 'confirmed',
    createdAt: '2024-03-10T14:00:00Z',
    updatedAt: '2024-03-12T16:00:00Z'
  },
  {
    id: '4',
    customerName: 'Sofia Ramirez',
    customerEmail: 'sofia@email.com',
    customerPhone: '+52 771 456 7890',
    packageId: '1',
    packageName: 'Cancun Todo Incluido',
    travelers: 2,
    preferredDate: '2024-04-20',
    status: 'cancelled',
    createdAt: '2024-03-08T11:00:00Z',
    updatedAt: '2024-03-09T10:00:00Z'
  },
  {
    id: '5',
    customerName: 'Diego Hernandez',
    customerEmail: 'diego@email.com',
    customerPhone: '+52 771 567 8901',
    packageId: '4',
    packageName: 'Huasteca Potosina Aventura',
    travelers: 3,
    preferredDate: '2024-04-25',
    status: 'pending',
    createdAt: '2024-03-16T09:00:00Z',
    updatedAt: '2024-03-16T09:00:00Z'
  }
]

export const initialPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Cancun Todo Incluido',
    destination: 'Cancun, Quintana Roo',
    description: 'Disfruta de las playas paradisiacas de Cancun con todo incluido en un hotel 5 estrellas.',
    originalPrice: 25000,
    discountedPrice: 18500,
    duration: '5 dias / 4 noches',
    includes: ['Vuelo redondo', 'Hotel 5 estrellas', 'Todo incluido', 'Traslados'],
    imageUrl: '/images/cancun.jpg',
    featured: true,
    active: true,
    validUntil: '2024-06-30',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Los Cabos Premium',
    destination: 'Los Cabos, BCS',
    description: 'Vive la experiencia premium en Los Cabos con actividades exclusivas.',
    originalPrice: 32000,
    discountedPrice: 26500,
    duration: '4 dias / 3 noches',
    includes: ['Vuelo redondo', 'Hotel boutique', 'Desayuno', 'Tour en yate'],
    imageUrl: '/images/cabos.jpg',
    featured: true,
    active: true,
    validUntil: '2024-05-31',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Riviera Maya Familiar',
    destination: 'Riviera Maya, Quintana Roo',
    description: 'Paquete ideal para familias con acceso a parques tematicos.',
    originalPrice: 45000,
    discountedPrice: 38000,
    duration: '6 dias / 5 noches',
    includes: ['Vuelo redondo', 'Hotel familiar', 'Todo incluido', 'Entrada a Xcaret'],
    imageUrl: '/images/riviera.jpg',
    featured: false,
    active: true,
    validUntil: '2024-07-31',
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '4',
    title: 'Huasteca Potosina Aventura',
    destination: 'San Luis Potosi',
    description: 'Aventura extrema en las cascadas y rios de la Huasteca.',
    originalPrice: 12000,
    discountedPrice: 9500,
    duration: '3 dias / 2 noches',
    includes: ['Transporte', 'Hotel', 'Tours guiados', 'Equipo de rapel'],
    imageUrl: '/images/huasteca.jpg',
    featured: true,
    active: true,
    validUntil: '2024-08-31',
    createdAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '5',
    title: 'Oaxaca Cultural',
    destination: 'Oaxaca de Juarez',
    description: 'Descubre la riqueza cultural y gastronomica de Oaxaca.',
    originalPrice: 15000,
    discountedPrice: 12500,
    duration: '4 dias / 3 noches',
    includes: ['Vuelo redondo', 'Hotel centrico', 'Desayuno', 'Tour gastronomico'],
    imageUrl: '/images/oaxaca.jpg',
    featured: false,
    active: true,
    validUntil: '2024-09-30',
    createdAt: '2024-03-10T00:00:00Z'
  },
  {
    id: '6',
    title: 'CDMX Express',
    destination: 'Ciudad de Mexico',
    description: 'Fin de semana en la capital con los mejores museos y restaurantes.',
    originalPrice: 8000,
    discountedPrice: 6500,
    duration: '3 dias / 2 noches',
    includes: ['Autobus primera clase', 'Hotel 4 estrellas', 'Desayuno', 'City tour'],
    imageUrl: '/images/cdmx.jpg',
    featured: false,
    active: false,
    validUntil: '2024-04-30',
    createdAt: '2024-01-20T00:00:00Z'
  }
]

export const initialDestinations: Destination[] = [
  { id: '1', name: 'Cancun', country: 'Mexico', description: 'Playas de arena blanca y aguas turquesa', imageUrl: '/images/cancun.jpg', popular: true, active: true },
  { id: '2', name: 'Los Cabos', country: 'Mexico', description: 'Desierto y mar en armonia perfecta', imageUrl: '/images/cabos.jpg', popular: true, active: true },
  { id: '3', name: 'Riviera Maya', country: 'Mexico', description: 'Paraiso del Caribe mexicano', imageUrl: '/images/riviera.jpg', popular: true, active: true },
  { id: '4', name: 'Huasteca Potosina', country: 'Mexico', description: 'Cascadas y naturaleza impresionante', imageUrl: '/images/huasteca.jpg', popular: false, active: true },
  { id: '5', name: 'Oaxaca', country: 'Mexico', description: 'Cultura, arte y gastronomia', imageUrl: '/images/oaxaca.jpg', popular: false, active: true },
  { id: '6', name: 'Ciudad de Mexico', country: 'Mexico', description: 'La capital cultural de America Latina', imageUrl: '/images/cdmx.jpg', popular: true, active: true }
]

export const initialServices: Service[] = [
  { id: '1', name: 'Vuelos', description: 'Reservacion de vuelos nacionales e internacionales', icon: 'Plane', active: true },
  { id: '2', name: 'Hospedaje', description: 'Hoteles, resorts y alojamientos alternativos', icon: 'Building', active: true },
  { id: '3', name: 'Transporte', description: 'Traslados, renta de autos y transporte terrestre', icon: 'Car', active: true },
  { id: '4', name: 'Tours', description: 'Excursiones y actividades guiadas', icon: 'Map', active: true },
  { id: '5', name: 'Seguros', description: 'Seguros de viaje y asistencia medica', icon: 'Shield', active: true },
  { id: '6', name: 'Visa', description: 'Asesoria y tramite de visas', icon: 'FileText', active: false }
]

// Generate unique IDs
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
