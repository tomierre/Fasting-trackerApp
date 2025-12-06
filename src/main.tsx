import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { GeminiProvider } from './context/GeminiContext.tsx'
import { registerServiceWorker } from './utils/registerSW.ts'

registerServiceWorker()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <GeminiProvider>
        <App />
      </GeminiProvider>
    </AuthProvider>
  </React.StrictMode>,
)

