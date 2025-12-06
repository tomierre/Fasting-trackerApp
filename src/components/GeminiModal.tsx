import { X, Sparkles, ChefHat, AlertCircle } from 'lucide-react'
import { useGeminiContext } from '../context/GeminiContext'

export default function GeminiModal() {
  const { loading, error, response, activeFeature, clearResponse } = useGeminiContext()

  const isOpen = loading || !!response || !!error

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl shadow-indigo-500/20 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {activeFeature === 'coach' && <Sparkles className="text-indigo-400" size={24} />}
              {activeFeature === 'chef' && <ChefHat className="text-emerald-400" size={24} />}
              <h2 className="text-xl font-bold text-slate-100">
                {activeFeature === 'coach' ? 'Coach Motivacional' : 'Chef'}
              </h2>
            </div>
            <button
              onClick={clearResponse}
              className="p-2 text-slate-400 hover:text-slate-100 transition-colors active:scale-95"
            >
              <X size={24} />
            </button>
          </div>

          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-slate-400">Generando respuesta...</p>
            </div>
          )}

          {error && (
            <div className="py-6">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-red-400 font-medium mb-1">Error</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {response && (
            <div className="py-6">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <p className="text-slate-100 leading-relaxed whitespace-pre-wrap">{response}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

