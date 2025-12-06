const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// Modelos a probar en orden de preferencia
// Con cuenta de facturación, deberías tener acceso a modelos más recientes
const MODEL_ENDPOINTS = [
  // Modelos más recientes (requieren facturación)
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
  // Versión v1 (más estable, funciona en todos los planes)
  'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
  'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
]

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Variable para cachear el endpoint que funciona
let workingEndpoint: string | null = null

export async function callGeminiAPI(
  prompt: string,
  maxRetries: number = 3
): Promise<string> {
  if (!API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY no está configurada')
  }

  // Intentar con el endpoint que funcionó antes, o probar todos
  const endpointsToTry = workingEndpoint 
    ? [workingEndpoint, ...MODEL_ENDPOINTS.filter(e => e !== workingEndpoint)]
    : MODEL_ENDPOINTS

  let lastError: Error | null = null

  // Probar cada endpoint hasta que uno funcione
  for (const API_URL of endpointsToTry) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          const errorMessage = errorData.error?.message || `Error HTTP: ${response.status}`
          
          // Si el modelo no está disponible, probar el siguiente
          if (errorMessage.includes('not found') || errorMessage.includes('not supported')) {
            lastError = new Error(errorMessage)
            break // Salir del loop de reintentos y probar siguiente endpoint
          }
          
          throw new Error(errorMessage)
        }

        const data: GeminiResponse = await response.json()

        if (
          data.candidates &&
          data.candidates[0]?.content?.parts?.[0]?.text
        ) {
          // Guardar el endpoint que funcionó para próximas llamadas
          workingEndpoint = API_URL
          return data.candidates[0].content.parts[0].text.trim()
        }

        throw new Error('Respuesta inválida de la API')
      } catch (error) {
        lastError = error as Error
        const waitTime = Math.pow(2, attempt) * 1000 // Exponential backoff
        if (attempt < maxRetries - 1) {
          await sleep(waitTime)
        }
      }
    }
  }

  // Mensaje de error más descriptivo
  const errorMessage = lastError?.message || 'Error desconocido'
  throw new Error(
    `No se pudo conectar con ningún modelo de Gemini.\n` +
    `Error: ${errorMessage}\n` +
    `Posibles causas:\n` +
    `- Tu API key puede no tener acceso a estos modelos\n` +
    `- Algunos modelos pueden requerir facturación habilitada\n` +
    `- Verifica en Google AI Studio qué modelos tienes disponibles\n` +
    `- El plan gratuito puede tener limitaciones en modelos disponibles`
  )
}

export function generateMotivationalPrompt(hoursFasted: number): string {
  return `Eres un coach de ayuno intermitente. El usuario lleva ${hoursFasted} horas en ayuno. Genera una frase motivacional corta (menos de 40 palabras) basada en la fase fisiológica actual del ayuno. Incluye un dato científico breve si es relevante. Responde solo con la frase, sin explicaciones adicionales.`
}

export function generateChefPrompt(fastingDuration: number): string {
  return `Eres un nutricionista experto. El usuario acaba de completar un ayuno de ${fastingDuration} horas. Sugiere la primera comida post-ayuno ideal (menos de 50 palabras). Debe ser ligera, nutritiva y fácil de digerir. Responde solo con la sugerencia, sin explicaciones adicionales.`
}

