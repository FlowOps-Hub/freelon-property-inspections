import { ServiceType, BookingStatus, SERVICE_LABELS, STATUS_LABELS } from '@/types'

/** Returns the first 8 chars of a UUID as a human-readable booking ID */
export function shortId(id: string): string {
  return id.slice(0, 8).toUpperCase()
}

export function formatDate(dateString: string): string {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getServiceLabel(type: ServiceType): string {
  return SERVICE_LABELS[type] ?? type
}

export function getStatusLabel(status: BookingStatus): string {
  return STATUS_LABELS[status] ?? status
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
