export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400">Cargando...</p>
      </div>
    </div>
  )
}

