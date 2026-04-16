export type ServiceType =
  | 'home_inspection'
  | 'condo_inspection'
  | 'radon_testing'
  | 'wdi_termite'
  | 'water_sampling'
  | 'commercial_inspection'

export type BookingStatus =
  | 'pending'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export interface Booking {
  id: string
  created_at: string
  client_name: string
  client_email: string
  client_phone: string
  property_address: string
  service_type: ServiceType
  preferred_date: string
  preferred_time: 'morning' | 'afternoon' | 'evening'
  notes: string | null
  status: BookingStatus
  report_url: string | null
}

export type BookingInsert = Omit<Booking, 'id' | 'created_at' | 'status' | 'report_url'>

export const SERVICE_LABELS: Record<ServiceType, string> = {
  home_inspection: 'Home Inspection',
  condo_inspection: 'Condo Inspection',
  radon_testing: 'Radon Testing',
  wdi_termite: 'WDI / Termite Inspection',
  water_sampling: 'Water Sampling',
  commercial_inspection: 'Commercial Inspection',
}

export const TIME_LABELS: Record<string, string> = {
  morning: 'Morning (8am – 12pm)',
  afternoon: 'Afternoon (12pm – 5pm)',
  evening: 'Evening (5pm – 8pm)',
}

export const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: 'Pending',
  scheduled: 'Scheduled',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  scheduled: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}
