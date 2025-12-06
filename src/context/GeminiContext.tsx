import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import {
  callGeminiAPI,
  generateMotivationalPrompt,
  generateChefPrompt,
} from '../utils/gemini'

export type GeminiFeature = 'coach' | 'chef' | null

interface GeminiContextType {
  loading: boolean
  error: string | null
  response: string | null
  activeFeature: GeminiFeature
  getMotivationalMessage: (hoursFasted: number) => Promise<void>
  getChefSuggestion: (fastingDuration: number) => Promise<void>
  clearResponse: () => void
}

const GeminiContext = createContext<GeminiContextType | undefined>(undefined)

export function useGeminiContext() {
  const context = useContext(GeminiContext)
  if (context === undefined) {
    throw new Error('useGeminiContext must be used within a GeminiProvider')
  }
  return context
}

interface GeminiProviderProps {
  children: ReactNode
}

export function GeminiProvider({ children }: GeminiProviderProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<string | null>(null)
  const [activeFeature, setActiveFeature] = useState<GeminiFeature>(null)

  const getMotivationalMessage = useCallback(async (hoursFasted: number) => {
    setLoading(true)
    setError(null)
    setResponse(null)
    setActiveFeature('coach')

    try {
      const prompt = generateMotivationalPrompt(hoursFasted)
      const result = await callGeminiAPI(prompt)
      setResponse(result)
    } catch (err: any) {
      setError(err.message || 'Error al obtener mensaje motivacional')
    } finally {
      setLoading(false)
    }
  }, [])

  const getChefSuggestion = useCallback(async (fastingDuration: number) => {
    setLoading(true)
    setError(null)
    setResponse(null)
    setActiveFeature('chef')

    try {
      const prompt = generateChefPrompt(fastingDuration)
      const result = await callGeminiAPI(prompt)
      setResponse(result)
    } catch (err: any) {
      setError(err.message || 'Error al obtener sugerencia de comida')
    } finally {
      setLoading(false)
    }
  }, [])

  const clearResponse = useCallback(() => {
    setResponse(null)
    setError(null)
    setActiveFeature(null)
  }, [])

  const value: GeminiContextType = {
    loading,
    error,
    response,
    activeFeature,
    getMotivationalMessage,
    getChefSuggestion,
    clearResponse,
  }

  return <GeminiContext.Provider value={value}>{children}</GeminiContext.Provider>
}

