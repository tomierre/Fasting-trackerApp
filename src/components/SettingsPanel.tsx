import { useState, useEffect } from 'react'
import { X, Plus, Minus, AlertCircle } from 'lucide-react'
import { useFirestore } from '../hooks/useFirestore'
import { useFastingTimer } from '../hooks/useFastingTimer'

interface SettingsPanelProps {
  onClose: () => void
}

const PRESETS = [13, 16, 18, 20, 24, 36]

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { fastingData, updateFastingData, userSettings, updateSettings } = useFirestore()
  const { isFasting } = useFastingTimer()
  const [targetHours, setTargetHours] = useState(
    fastingData?.targetHours || userSettings?.targetHours || 16
  )
  const [error, setError] = useState('')

  useEffect(() => {
    if (fastingData?.targetHours) {
      setTargetHours(fastingData.targetHours)
    } else if (userSettings?.targetHours) {
      setTargetHours(userSettings.targetHours)
    }
  }, [fastingData, userSettings])

  const handlePresetClick = async (hours: number) => {
    if (isFasting) {
      setError('No puedes cambiar el objetivo mientras estás ayunando')
      return
    }

    setTargetHours(hours)
    setError('')
    await updateFastingData({
      ...fastingData!,
      targetHours: hours,
    })
    await updateSettings({ targetHours: hours })
  }

  const handleAdjust = async (delta: number) => {
    if (isFasting) {
      setError('No puedes cambiar el objetivo mientras estás ayunando')
      return
    }

    const newHours = Math.max(1, Math.min(48, targetHours + delta))
    setTargetHours(newHours)
    setError('')
    await updateFastingData({
      ...fastingData!,
      targetHours: newHours,
    })
    await updateSettings({ targetHours: newHours })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl shadow-indigo-500/20 animate-in slide-in-from-bottom sm:slide-in-from-bottom-0">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Configuración</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors active:scale-95"
            >
              <X size={24} />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Objetivo de Ayuno (horas)
              </label>

              {/* Presets */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {PRESETS.map((hours) => (
                  <button
                    key={hours}
                    onClick={() => handlePresetClick(hours)}
                    disabled={isFasting}
                    className={`py-2 px-4 rounded-lg font-medium transition-all duration-300 active:scale-95 ${
                      targetHours === hours
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600'
                    } ${isFasting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {hours}h
                  </button>
                ))}
              </div>

              {/* Manual adjustment */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleAdjust(-1)}
                  disabled={isFasting || targetHours <= 1}
                  className="p-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={20} />
                </button>

                <div className="text-3xl font-bold text-slate-100 min-w-[80px] text-center">
                  {targetHours}h
                </div>

                <button
                  onClick={() => handleAdjust(1)}
                  disabled={isFasting || targetHours >= 48}
                  className="p-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

