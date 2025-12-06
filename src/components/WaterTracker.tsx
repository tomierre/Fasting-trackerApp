import { useEffect, useState } from 'react'
import { Droplet, Plus, RotateCcw, AlertCircle } from 'lucide-react'
import { useFirestore } from '../hooks/useFirestore'
import { requestNotificationPermission, notifyWaterReminder } from '../utils/notifications'
import { getStartOfDay, isSameDay } from '../utils/time'

const GLASS_SIZE = 250 // ml
const DAILY_GOAL = 2000 // ml

export default function WaterTracker() {
  const { hydrationData, updateHydrationData, loading } = useFirestore()
  const [showReminder, setShowReminder] = useState(false)
  const [hasCheckedReset, setHasCheckedReset] = useState(false)

  const waterCount = hydrationData?.waterCount || 0
  const lastDrinkTime = hydrationData?.lastDrinkTime || null
  const dailyGoal = hydrationData?.dailyGoal || DAILY_GOAL

  // Reset automático diario - solo ejecutar después de que los datos se hayan cargado
  useEffect(() => {
    // Esperar a que termine la carga inicial
    if (loading) return

    const checkDailyReset = async () => {
      const todayStart = getStartOfDay()
      
      // Si no hay datos, inicializar con el día de hoy
      if (!hydrationData) {
        await updateHydrationData({
          waterCount: 0,
          lastDrinkTime: null,
          dailyGoal: DAILY_GOAL,
          lastResetDate: todayStart,
        })
        setHasCheckedReset(true)
        return
      }

      // Verificar si necesitamos resetear (cambió el día)
      const currentLastResetDate = hydrationData.lastResetDate || null
      const shouldReset = currentLastResetDate === null || !isSameDay(todayStart, currentLastResetDate)

      if (shouldReset) {
        await updateHydrationData({
          waterCount: 0,
          lastDrinkTime: null,
          dailyGoal: hydrationData.dailyGoal || DAILY_GOAL,
          lastResetDate: todayStart,
        })
      }
      setHasCheckedReset(true)
    }

    // Solo verificar una vez al inicio, luego usar el intervalo
    if (!hasCheckedReset) {
      checkDailyReset()
    }

    // Verificar cada minuto si ha cambiado el día
    const interval = setInterval(checkDailyReset, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [loading, hydrationData, updateHydrationData, hasCheckedReset])

  useEffect(() => {
    if (!lastDrinkTime) return

    const checkReminder = () => {
      const now = Date.now()
      const timeSinceLastDrink = (now - lastDrinkTime) / 1000 / 60 // minutes

      if (timeSinceLastDrink > 60) {
        setShowReminder(true)
        requestNotificationPermission().then((granted) => {
          if (granted) {
            notifyWaterReminder()
          }
        })
      } else {
        setShowReminder(false)
      }
    }

    checkReminder()
    const interval = setInterval(checkReminder, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [lastDrinkTime])

  const addWater = async () => {
    const now = Date.now()
    const todayStart = getStartOfDay()
    
    // Verificar si necesitamos resetear antes de agregar agua
    const currentLastResetDate = hydrationData?.lastResetDate || null
    const shouldReset = currentLastResetDate === null || !isSameDay(todayStart, currentLastResetDate)
    
    await updateHydrationData({
      waterCount: shouldReset ? GLASS_SIZE : waterCount + GLASS_SIZE,
      lastDrinkTime: now,
      dailyGoal,
      lastResetDate: todayStart,
    })
    setShowReminder(false)
  }

  const resetDaily = async () => {
    if (window.confirm('¿Resetear el contador diario de agua?')) {
      const todayStart = getStartOfDay()
      await updateHydrationData({
        waterCount: 0,
        lastDrinkTime: null,
        dailyGoal,
        lastResetDate: todayStart,
      })
    }
  }

  const progress = Math.min((waterCount / dailyGoal) * 100, 100)
  const glasses = Math.floor(waterCount / GLASS_SIZE)

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl shadow-indigo-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplet className="text-blue-400" size={24} />
          <h2 className="text-xl font-bold text-slate-100">Hidratación</h2>
        </div>
        <button
          onClick={resetDaily}
          className="p-2 text-slate-400 hover:text-slate-100 transition-colors active:scale-95"
          title="Resetear contador"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {showReminder && (
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2 text-blue-400 text-sm">
          <AlertCircle size={18} />
          <span>Ha pasado más de una hora desde tu último trago</span>
        </div>
      )}

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">
            {waterCount}ml / {dailyGoal}ml
          </span>
          <span className="text-sm font-semibold text-slate-300">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Visual glasses */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: Math.floor(dailyGoal / GLASS_SIZE) }).map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 ${
                i < glasses
                  ? 'bg-blue-500 border-blue-400'
                  : 'bg-slate-700/50 border-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Add water button */}
      <button
        onClick={addWater}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Agregar {GLASS_SIZE}ml
      </button>
    </div>
  )
}

