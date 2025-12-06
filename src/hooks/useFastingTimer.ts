import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useFirestore } from './useFirestore'
import { formatTime, getTimeRemaining, getEndTime, formatDate } from '../utils/time'
import { requestNotificationPermission, notifyFastingGoalReached } from '../utils/notifications'
import { saveFastingSession } from '../utils/firestore'

export function useFastingTimer() {
  const { currentUser } = useAuth()
  const { fastingData, updateFastingData, userSettings } = useFirestore()
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [hasRequestedNotification, setHasRequestedNotification] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)

  const isFasting = fastingData?.isFasting || false
  const startTime = fastingData?.startTime || null
  const targetHours = fastingData?.targetHours || userSettings?.targetHours || 16
  const targetSeconds = targetHours * 3600

  useEffect(() => {
    if (!isFasting || !startTime) {
      setElapsedSeconds(0)
      setSessionStartTime(null)
      return
    }

    // Inicializar sessionStartTime si hay un ayuno activo
    if (startTime && !sessionStartTime) {
      setSessionStartTime(startTime)
    }

    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = Math.floor((now - startTime) / 1000)
      setElapsedSeconds(elapsed)

      // Check if goal is reached
      if (elapsed >= targetSeconds && !hasRequestedNotification) {
        requestNotificationPermission().then((granted) => {
          if (granted) {
            notifyFastingGoalReached()
            setHasRequestedNotification(true)
          }
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isFasting, startTime, targetSeconds, hasRequestedNotification, sessionStartTime])

  const startFasting = useCallback(async () => {
    if (!hasRequestedNotification) {
      await requestNotificationPermission()
      setHasRequestedNotification(true)
    }

    const now = Date.now()
    setSessionStartTime(now)
    await updateFastingData({
      isFasting: true,
      startTime: now,
      targetHours,
    })
  }, [targetHours, updateFastingData, hasRequestedNotification])

  const stopFasting = useCallback(async () => {
    if (window.confirm('¿Terminar el ayuno ahora?')) {
      const endTime = Date.now()
      const startTimeToSave = sessionStartTime || startTime

      // Guardar sesión en historial si hay un startTime
      if (startTimeToSave && currentUser) {
        const durationHours = elapsedSeconds / 3600 // Convertir segundos a horas
        const completed = elapsedSeconds >= targetSeconds

        try {
          await saveFastingSession(currentUser.uid, {
            startTime: startTimeToSave,
            endTime,
            duration: durationHours,
            targetHours,
            completed,
          })
        } catch (error) {
          console.error('Error al guardar sesión:', error)
        }
      }

      await updateFastingData({
        isFasting: false,
        startTime: null,
        targetHours,
      })
      setElapsedSeconds(0)
      setSessionStartTime(null)
      setHasRequestedNotification(false)
    }
  }, [targetHours, targetSeconds, updateFastingData, sessionStartTime, startTime, elapsedSeconds, currentUser])

  const timeRemaining = getTimeRemaining(targetSeconds, elapsedSeconds)
  const endTime = startTime ? getEndTime(startTime, targetHours) : null

  return {
    isFasting,
    elapsedSeconds,
    timeRemaining,
    targetHours,
    targetSeconds,
    startTime: startTime ? new Date(startTime) : null,
    endTime,
    formattedElapsed: formatTime(elapsedSeconds),
    formattedRemaining: formatTime(timeRemaining),
    formattedStartTime: startTime ? formatDate(new Date(startTime)) : null,
    formattedEndTime: endTime ? formatDate(endTime) : null,
    progress: isFasting && targetSeconds > 0 ? Math.min((elapsedSeconds / targetSeconds) * 100, 100) : 0,
    startFasting,
    stopFasting,
  }
}

