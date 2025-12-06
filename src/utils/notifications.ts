export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('Este navegador no soporta notificaciones')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export function showNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      ...options,
    })
  }
}

export function notifyFastingGoalReached() {
  showNotification('¡Objetivo alcanzado! 🎉', {
    body: 'Has completado tu objetivo de ayuno. ¡Felicitaciones!',
    tag: 'fasting-goal',
  })
}

export function notifyWaterReminder() {
  showNotification('💧 Recordatorio de agua', {
    body: 'Ha pasado más de una hora desde tu último trago. ¡Hidrátate!',
    tag: 'water-reminder',
  })
}

