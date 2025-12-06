import { useFastingTimer } from '../hooks/useFastingTimer'
import { Play, Square } from 'lucide-react'

export default function TimerCircle() {
  const {
    isFasting,
    formattedElapsed,
    formattedRemaining,
    formattedStartTime,
    formattedEndTime,
    progress,
    startFasting,
    stopFasting,
  } = useFastingTimer()

  const radius = 120
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl shadow-indigo-500/20">
      <div className="flex flex-col items-center">
        {/* Circular Progress Ring */}
        <div className="relative mb-6">
          <svg
            width="280"
            height="280"
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-slate-700"
            />
            {/* Progress circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              className={`transition-all duration-300 ${
                isFasting ? 'text-indigo-500' : 'text-emerald-500'
              }`}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: 'stroke-dashoffset 0.5s ease-out',
              }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-100 mb-2">
                {formattedElapsed}
              </div>
              <div className="text-sm text-slate-400 mb-1">
                {isFasting ? 'Ayunando' : 'Ventana de Ingesta'}
              </div>
              {isFasting && (
                <div className="text-xs text-slate-500">
                  Restante: {formattedRemaining}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Time info */}
        {isFasting && (
          <div className="w-full space-y-2 mb-6 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Inicio:</span>
              <span className="text-slate-200">{formattedStartTime}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Fin estimado:</span>
              <span className="text-slate-200">{formattedEndTime}</span>
            </div>
          </div>
        )}

        {/* Action button */}
        <button
          onClick={isFasting ? stopFasting : startFasting}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
            isFasting
              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
          }`}
        >
          {isFasting ? (
            <>
              <Square size={20} />
              Terminar Ayuno
            </>
          ) : (
            <>
              <Play size={20} />
              Iniciar Ayuno
            </>
          )}
        </button>
      </div>
    </div>
  )
}

