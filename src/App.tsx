import { useState } from 'react'
import AuthGuard from './components/AuthGuard'
import TimerCircle from './components/TimerCircle'
import WaterTracker from './components/WaterTracker'
import SettingsPanel from './components/SettingsPanel'
import HistoryPanel from './components/HistoryPanel'
import GeminiModal from './components/GeminiModal'
import AIAssistantButtons from './components/AIAssistantButtons'
import { useAuth } from './context/AuthContext'
import { LogOut, History } from 'lucide-react'

function App() {
  const { logout } = useAuth()
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-900 pb-20">
        <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
          <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-100">Fasting Tracker</h1>
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors active:scale-95"
              title="Cerrar sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <main className="max-w-md mx-auto px-4 py-6 space-y-6">
          <TimerCircle />
          <WaterTracker />
          
          <AIAssistantButtons />
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowHistory(true)}
              className="flex-1 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 font-medium hover:bg-slate-800 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
              <History size={18} />
              Historial
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="flex-1 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 font-medium hover:bg-slate-800 transition-all duration-300 active:scale-95"
            >
              Configuración
            </button>
          </div>
        </main>

        {showSettings && (
          <SettingsPanel onClose={() => setShowSettings(false)} />
        )}

        {showHistory && (
          <HistoryPanel onClose={() => setShowHistory(false)} />
        )}

        <GeminiModal />
      </div>
    </AuthGuard>
  )
}

export default App

