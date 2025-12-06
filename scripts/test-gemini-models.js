// Script para probar diferentes modelos de Gemini
import 'dotenv/config'

const API_KEY = process.env.VITE_GEMINI_API_KEY || 'test'

const modelsToTest = [
  'gemini-pro',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'gemini-2.0-flash-exp',
]

const versions = ['v1', 'v1beta']

async function testModel(version, model) {
  const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent`
  
  try {
    const response = await fetch(`${url}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: 'Hola' }]
        }]
      }),
    })

    if (response.ok) {
      console.log(`✅ ${version}/${model} - FUNCIONA`)
      return true
    } else {
      const error = await response.json().catch(() => ({}))
      console.log(`❌ ${version}/${model} - ${error.error?.message || response.status}`)
      return false
    }
  } catch (error) {
    console.log(`❌ ${version}/${model} - Error: ${error.message}`)
    return false
  }
}

async function main() {
  console.log('🔍 Probando modelos de Gemini...\n')
  
  for (const version of versions) {
    console.log(`\n📡 Versión: ${version}`)
    for (const model of modelsToTest) {
      await testModel(version, model)
      await new Promise(resolve => setTimeout(resolve, 500)) // Delay entre requests
    }
  }
}

main()

