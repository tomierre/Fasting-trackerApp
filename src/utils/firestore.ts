import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  onSnapshot,
  Unsubscribe,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'

export interface FastingData {
  isFasting: boolean
  startTime: number | null
  targetHours: number
}

export interface HydrationData {
  waterCount: number
  lastDrinkTime: number | null
  dailyGoal: number
  lastResetDate: number | null // Timestamp del inicio del último día reseteado
}

export interface UserSettings {
  targetHours: number
  notificationsEnabled: boolean
  createdAt: number
  updatedAt: number
}

export interface FastingSession {
  id: string
  startTime: number
  endTime: number
  duration: number // en horas
  targetHours: number
  completed: boolean // si alcanzó el objetivo
  createdAt: number
}

// Fasting data
export async function getFastingData(userId: string): Promise<FastingData | null> {
  const docRef = doc(db, 'users', userId, 'fasting', 'current')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return {
      isFasting: data.isFasting || false,
      startTime: data.startTime?.toMillis() || null,
      targetHours: data.targetHours || 16,
    }
  }

  return null
}

export async function setFastingData(userId: string, data: FastingData): Promise<void> {
  const docRef = doc(db, 'users', userId, 'fasting', 'current')
  await setDoc(docRef, {
    isFasting: data.isFasting,
    startTime: data.startTime ? Timestamp.fromMillis(data.startTime) : null,
    targetHours: data.targetHours,
  })
}

export function subscribeToFastingData(
  userId: string,
  callback: (data: FastingData | null) => void
): Unsubscribe {
  const docRef = doc(db, 'users', userId, 'fasting', 'current')
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data()
      callback({
        isFasting: data.isFasting || false,
        startTime: data.startTime?.toMillis() || null,
        targetHours: data.targetHours || 16,
      })
    } else {
      callback(null)
    }
  })
}

// Hydration data
export async function getHydrationData(userId: string): Promise<HydrationData | null> {
  const docRef = doc(db, 'users', userId, 'hydration', 'current')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return {
      waterCount: data.waterCount || 0,
      lastDrinkTime: data.lastDrinkTime?.toMillis() || null,
      dailyGoal: data.dailyGoal || 2000,
      lastResetDate: data.lastResetDate?.toMillis() || null,
    }
  }

  return null
}

export async function setHydrationData(userId: string, data: HydrationData): Promise<void> {
  const docRef = doc(db, 'users', userId, 'hydration', 'current')
  await setDoc(docRef, {
    waterCount: data.waterCount,
    lastDrinkTime: data.lastDrinkTime ? Timestamp.fromMillis(data.lastDrinkTime) : null,
    dailyGoal: data.dailyGoal,
    lastResetDate: data.lastResetDate ? Timestamp.fromMillis(data.lastResetDate) : null,
  })
}

export function subscribeToHydrationData(
  userId: string,
  callback: (data: HydrationData | null) => void
): Unsubscribe {
  const docRef = doc(db, 'users', userId, 'hydration', 'current')
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data()
      callback({
        waterCount: data.waterCount || 0,
        lastDrinkTime: data.lastDrinkTime?.toMillis() || null,
        dailyGoal: data.dailyGoal || 2000,
        lastResetDate: data.lastResetDate?.toMillis() || null,
      })
    } else {
      callback(null)
    }
  })
}

// User settings
export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  const docRef = doc(db, 'users', userId, 'settings')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return {
      targetHours: data.targetHours || 16,
      notificationsEnabled: data.notificationsEnabled ?? true,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
    }
  }

  return null
}

export async function setUserSettings(userId: string, settings: Partial<UserSettings>): Promise<void> {
  const docRef = doc(db, 'users', userId, 'settings')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      ...settings,
      updatedAt: Timestamp.now(),
    })
  } else {
    await setDoc(docRef, {
      targetHours: settings.targetHours || 16,
      notificationsEnabled: settings.notificationsEnabled ?? true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}

// History functions
export async function saveFastingSession(
  userId: string,
  session: Omit<FastingSession, 'id' | 'createdAt'>
): Promise<string> {
  const sessionsRef = collection(db, 'users', userId, 'history')
  const sessionDoc = doc(sessionsRef)
  const sessionId = sessionDoc.id

  await setDoc(sessionDoc, {
    startTime: Timestamp.fromMillis(session.startTime),
    endTime: Timestamp.fromMillis(session.endTime),
    duration: session.duration,
    targetHours: session.targetHours,
    completed: session.completed,
    createdAt: Timestamp.now(),
  })

  return sessionId
}

export async function getFastingHistory(
  userId: string,
  maxResults: number = 50
): Promise<FastingSession[]> {
  const sessionsRef = collection(db, 'users', userId, 'history')
  const q = query(sessionsRef, orderBy('createdAt', 'desc'), limit(maxResults))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      startTime: data.startTime?.toMillis() || 0,
      endTime: data.endTime?.toMillis() || 0,
      duration: data.duration || 0,
      targetHours: data.targetHours || 16,
      completed: data.completed || false,
      createdAt: data.createdAt?.toMillis() || Date.now(),
    }
  })
}

export function subscribeToFastingHistory(
  userId: string,
  callback: (sessions: FastingSession[]) => void,
  maxResults: number = 50
): Unsubscribe {
  const sessionsRef = collection(db, 'users', userId, 'history')
  const q = query(sessionsRef, orderBy('createdAt', 'desc'), limit(maxResults))

  return onSnapshot(q, (querySnapshot) => {
    const sessions = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        startTime: data.startTime?.toMillis() || 0,
        endTime: data.endTime?.toMillis() || 0,
        duration: data.duration || 0,
        targetHours: data.targetHours || 16,
        completed: data.completed || false,
        createdAt: data.createdAt?.toMillis() || Date.now(),
      }
    })
    callback(sessions)
  })
}

