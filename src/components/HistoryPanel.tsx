import { useEffect, useState } from 'react'
import { X, TrendingUp, Target, Calendar, Award } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getFastingHistory, FastingSession } from '../utils/firestore'
import { calculateStats, formatDateTime, formatDate } from '../utils/stats'

interface HistoryPanelProps {
  onClose: () => void
}

export default function HistoryPanel({ onClose }: HistoryPanelProps) {
  const { currentUser } = useAuth()
  const [sessions, setSessions] = useState<FastingSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) {
      setLoading(false)
      return
    }

    loadHistory()
  }, [currentUser])

  const loadHistory = async () => {
    if (!currentUser) return

    try {
      const history = await getFastingHistory(currentUser.uid, 100)
      setSessions(history)
    } catch (error) {
      console.error('Error al cargar historial:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = calculateStats(sessions)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl shadow-indigo-500/20 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Historial</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors active:scale-95"
            >
              <X size={24} />
            </button>
          </div>

          {/* Estadísticas */}
          {sessions.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Target size={16} />
                  <span className="text-xs">Total Sesiones</span>
                </div>
                <p className="text-2xl font-bold text-slate-100">{stats.totalSessions}</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <TrendingUp size={16} />
                  <span className="text-xs">Promedio</span>
                </div>
                <p className="text-2xl font-bold text-slate-100">{stats.averageHours}h</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Award size={16} />
                  <span className="text-xs">Racha</span>
                </div>
                <p className="text-2xl font-bold text-emerald-400">{stats.currentStreak} días</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Target size={16} />
                  <span className="text-xs">Completados</span>
                </div>
                <p className="text-2xl font-bold text-indigo-400">{stats.completionRate}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Lista de sesiones */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto text-slate-500 mb-4" size={48} />
              <p className="text-slate-400">No hay sesiones registradas</p>
              <p className="text-sm text-slate-500 mt-2">
                Completa tu primer ayuno para verlo aquí
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-slate-400">
                        {formatDate(new Date(session.endTime))}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatDateTime(new Date(session.startTime))} -{' '}
                        {formatDateTime(new Date(session.endTime))}
                      </p>
                    </div>
                    {session.completed && (
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                        Completado
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl font-bold text-slate-100">
                        {session.duration.toFixed(1)}h
                      </p>
                      <p className="text-xs text-slate-400">
                        Objetivo: {session.targetHours}h
                      </p>
                    </div>
                    {!session.completed && (
                      <span className="text-xs text-slate-500">
                        {((session.duration / session.targetHours) * 100).toFixed(0)}% del objetivo
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

