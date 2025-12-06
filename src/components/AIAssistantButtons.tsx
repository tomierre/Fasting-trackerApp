import { useState, useEffect } from 'react'
import { Sparkles, ChefHat } from 'lucide-react'
import { useGeminiContext } from '../context/GeminiContext'
import { useFastingTimer } from '../hooks/useFastingTimer'
import { useFirestore } from '../hooks/useFirestore'

export default function AIAssistantButtons() {
  const { getMotivationalMessage, getChefSuggestion } = useGeminiContext()
  const { isFasting, elapsedSeconds, targetHours } = useFastingTimer()
  const { fastingData } = useFirestore()
  const [lastCompletedHours, setLastCompletedHours] = useState<number | null>(null)

  const hoursFasted = Math.floor(elapsedSeconds / 3600)

  // Guardar las horas completadas cuando termina el ayuno
  useEffect(() => {
    if (!isFasting && fastingData?.startTime && elapsedSeconds > 0) {
      const completedHours = Math.floor(elapsedSeconds / 3600)
      if (completedHours > 0) {
        setLastCompletedHours(completedHours)
      }
    }
  }, [isFasting, fastingData, elapsedSeconds])

  const handleCoachClick = () => {
    if (isFasting) {
      const hours = hoursFasted > 0 ? hoursFasted : 1
      getMotivationalMessage(hours)
    }
  }

  const handleChefClick = () => {
    if (!isFasting) {
      const hours = lastCompletedHours || targetHours
      getChefSuggestion(hours)
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl shadow-indigo-500/20">
      <h3 className="text-lg font-semibold text-slate-100 mb-4 text-center">
        Asistente IA
      </h3>
      <div className="flex gap-3">
        {isFasting && (
          <button
            onClick={handleCoachClick}
            className="flex-1 py-3 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 rounded-lg text-indigo-400 font-medium transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            Coach Motivacional
          </button>
        )}
        {!isFasting && (lastCompletedHours || targetHours) && (
          <button
            onClick={handleChefClick}
            className="flex-1 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-400 font-medium transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <ChefHat size={20} />
            Sugerencia de Comida
          </button>
        )}
      </div>
      <p className="text-xs text-slate-400 text-center mt-3">
        {isFasting
          ? 'Obtén motivación basada en tu progreso'
          : 'Obtén sugerencias para tu primera comida'}
      </p>
    </div>
  )
}

