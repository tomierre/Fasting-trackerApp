// Utilidad para probar qué modelos de Gemini están disponibles
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

interface ModelInfo {
  name: string
  version: string
  endpoint: string
}

export const AVAILABLE_MODELS: ModelInfo[] = [
  { name: 'gemini-2.0-flash-exp', version: 'v1beta', endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent' },
  { name: 'gemini-1.5-flash', version: 'v1beta', endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent' },
  { name: 'gemini-1.5-flash-latest', version: 'v1beta', endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent' },
  { name: 'gemini-1.5-flash', version: 'v1', endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent' },
  { name: 'gemini-pro', version: 'v1', endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent' },
]

export async function testGeminiModel(endpoint: string): Promise<boolean> {
  if (!API_KEY) return false

  try {
    const response = await fetch(`${endpoint}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'test' }] }],
      }),
    })

    return response.ok
  } catch {
    return false
  }
}

