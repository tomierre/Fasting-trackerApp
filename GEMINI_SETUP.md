# Configuración de Gemini IA - Solución de Problemas

## 🔍 Diagnóstico del Error

Si recibes el error: `models/gemini-pro is not found for API version v1beta`

Significa que el modelo que estás intentando usar no está disponible en tu cuenta o en esa versión de la API.

## ✅ Solución Implementada

El código ahora **prueba automáticamente múltiples modelos** hasta encontrar uno que funcione:

1. `gemini-1.5-flash` (v1) - Más común en plan gratuito
2. `gemini-1.5-flash` (v1beta)
3. `gemini-1.5-flash-latest` (v1beta)
4. `gemini-2.0-flash-exp` (v1beta)
5. `gemini-pro` (v1) - Fallback

## 🔧 Verificar Modelos Disponibles

### Opción 1: Google AI Studio

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Inicia sesión
3. En el panel, deberías ver qué modelos tienes disponibles
4. Prueba hacer una consulta de prueba para ver qué modelo funciona

### Opción 2: Listar Modelos Programáticamente

Puedes usar esta URL para listar los modelos disponibles:

```
https://generativelanguage.googleapis.com/v1beta/models?key=TU_API_KEY
```

O para v1:
```
https://generativelanguage.googleapis.com/v1/models?key=TU_API_KEY
```

## 💡 Plan Gratuito - Limitaciones

El plan **gratuito de Gemini** puede tener:
- Acceso limitado a ciertos modelos
- Algunos modelos pueden requerir facturación habilitada
- Modelos experimentales (exp) pueden no estar disponibles

## 🎯 Modelos Recomendados para Plan Gratuito

Según la documentación actual:
- **`gemini-1.5-flash`** - Generalmente disponible en plan gratuito
- **`gemini-pro`** (v1) - Puede estar disponible

## 📝 Si Ningún Modelo Funciona

Si después de probar todos los modelos sigues teniendo errores:

1. **Verifica tu API Key**: Asegúrate de que sea válida y activa
2. **Verifica permisos**: Algunos modelos requieren acceso especial
3. **Habilita facturación**: Algunos modelos avanzados requieren facturación (aunque no cobres)
4. **Revisa cuotas**: Puede que hayas alcanzado límites del plan gratuito

## 🔗 Recursos

- [Documentación Gemini API](https://ai.google.dev/gemini-api/docs)
- [Modelos Disponibles](https://ai.google.dev/gemini-api/docs/models/gemini)
- [Google AI Studio](https://aistudio.google.com/)

## ⚙️ Configuración Manual (Opcional)

Si sabes qué modelo funciona en tu cuenta, puedes forzarlo editando `src/utils/gemini.ts` y poniendo solo ese modelo en `MODEL_ENDPOINTS`.

