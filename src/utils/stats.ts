import { FastingSession } from './firestore'

export interface Stats {
  totalSessions: number
  totalHours: number
  averageHours: number
  longestFast: number
  completionRate: number // porcentaje de objetivos alcanzados
  currentStreak: number // días consecutivos
}

export function calculateStats(sessions: FastingSession[]): Stats {
  if (sessions.length === 0) {
    return {
      totalSessions: 0,
      totalHours: 0,
      averageHours: 0,
      longestFast: 0,
      completionRate: 0,
      currentStreak: 0,
    }
  }

  const totalHours = sessions.reduce((sum, session) => sum + session.duration, 0)
  const averageHours = totalHours / sessions.length
  const longestFast = Math.max(...sessions.map((s) => s.duration))
  const completedSessions = sessions.filter((s) => s.completed).length
  const completionRate = (completedSessions / sessions.length) * 100

  // Calcular racha (días consecutivos con al menos un ayuno)
  const currentStreak = calculateStreak(sessions)

  return {
    totalSessions: sessions.length,
    totalHours: Math.round(totalHours * 10) / 10,
    averageHours: Math.round(averageHours * 10) / 10,
    longestFast: Math.round(longestFast * 10) / 10,
    completionRate: Math.round(completionRate),
    currentStreak,
  }
}

function calculateStreak(sessions: FastingSession[]): number {
  if (sessions.length === 0) return 0

  // Ordenar por fecha de finalización (más reciente primero)
  const sortedSessions = [...sessions].sort((a, b) => b.endTime - a.endTime)

  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  // Agrupar sesiones por día
  const sessionsByDay = new Map<string, FastingSession[]>()
  sortedSessions.forEach((session) => {
    const sessionDate = new Date(session.endTime)
    sessionDate.setHours(0, 0, 0, 0)
    const dateKey = sessionDate.toISOString()
    
    if (!sessionsByDay.has(dateKey)) {
      sessionsByDay.set(dateKey, [])
    }
    sessionsByDay.get(dateKey)!.push(session)
  })

  // Calcular racha desde hoy hacia atrás
  while (true) {
    const dateKey = currentDate.toISOString()
    const daySessions = sessionsByDay.get(dateKey)

    if (daySessions && daySessions.length > 0) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      // Si hay sesiones en días anteriores, continuar
      const previousDate = new Date(currentDate)
      previousDate.setDate(previousDate.getDate() - 1)
      const prevDateKey = previousDate.toISOString()

      if (sessionsByDay.has(prevDateKey)) {
        streak++
        currentDate = previousDate
      } else {
        break
      }
    }

    // Limitar búsqueda a máximo 365 días atrás
    const daysAgo = (Date.now() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    if (daysAgo > 365) break
  }

  return streak
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

