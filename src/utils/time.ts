export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function formatHours(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours === 0) {
    return `${minutes}m`
  }
  return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`
}

export function getTimeRemaining(targetSeconds: number, elapsedSeconds: number): number {
  return Math.max(0, targetSeconds - elapsedSeconds)
}

export function getEndTime(startTime: number, targetHours: number): Date {
  return new Date(startTime + targetHours * 3600 * 1000)
}

export function formatDate(date: Date): string {
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

/**
 * Obtiene el inicio del día actual (medianoche) en milisegundos
 */
export function getStartOfDay(date: Date = new Date()): number {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  return startOfDay.getTime()
}

/**
 * Verifica si dos timestamps pertenecen al mismo día
 */
export function isSameDay(timestamp1: number, timestamp2: number): boolean {
  const date1 = new Date(timestamp1)
  const date2 = new Date(timestamp2)
  
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

