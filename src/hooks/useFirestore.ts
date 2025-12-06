import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  getFastingData,
  setFastingData,
  subscribeToFastingData,
  getHydrationData,
  setHydrationData,
  subscribeToHydrationData,
  getUserSettings,
  setUserSettings,
  FastingData,
  HydrationData,
  UserSettings,
} from '../utils/firestore'

export function useFirestore() {
  const { currentUser } = useAuth()
  const [fastingData, setFastingDataState] = useState<FastingData | null>(null)
  const [hydrationData, setHydrationDataState] = useState<HydrationData | null>(null)
  const [userSettings, setUserSettingsState] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      setLoading(false)
      return
    }

    const userId = currentUser.uid

    // Load initial data
    Promise.all([
      getFastingData(userId),
      getHydrationData(userId),
      getUserSettings(userId),
    ]).then(([fasting, hydration, settings]) => {
      setFastingDataState(fasting)
      setHydrationDataState(hydration)
      setUserSettingsState(settings)
      setLoading(false)
    })

    // Subscribe to real-time updates
    const unsubscribeFasting = subscribeToFastingData(userId, (data) => {
      setFastingDataState(data)
    })

    const unsubscribeHydration = subscribeToHydrationData(userId, (data) => {
      setHydrationDataState(data)
    })

    return () => {
      unsubscribeFasting()
      unsubscribeHydration()
    }
  }, [currentUser])

  const updateFastingData = async (data: FastingData) => {
    if (!currentUser) return
    await setFastingData(currentUser.uid, data)
  }

  const updateHydrationData = async (data: HydrationData) => {
    if (!currentUser) return
    await setHydrationData(currentUser.uid, data)
  }

  const updateSettings = async (settings: Partial<UserSettings>) => {
    if (!currentUser) return
    await setUserSettings(currentUser.uid, settings)
  }

  return {
    fastingData,
    hydrationData,
    userSettings,
    loading,
    updateFastingData,
    updateHydrationData,
    updateSettings,
  }
}

