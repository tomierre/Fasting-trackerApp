# Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_GEMINI_API_KEY=tu_clave_de_gemini_aqui
VITE_FIREBASE_API_KEY=AIzaSyCDZrw28v4Zb_kVFLQLjcMKgLNgs1h9GJw
VITE_FIREBASE_AUTH_DOMAIN=fastingpro-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fastingpro-app
VITE_FIREBASE_STORAGE_BUCKET=fastingpro-app.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=725583095818
VITE_FIREBASE_APP_ID=1:725583095818:web:3204e059a065456369d7f3
```

## Pasos:

1. Copia este contenido
2. Crea un archivo llamado `.env` en la raíz del proyecto (mismo nivel que `package.json`)
3. Pega el contenido y reemplaza `tu_clave_de_gemini_aqui` con tu API key de Gemini
4. Guarda el archivo

## Obtener API Key de Gemini:

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia la clave y pégala en el archivo `.env`

## Verificar configuración de Firebase:

Asegúrate de que en Firebase Console tengas:
- ✅ Authentication habilitado (Email/Password y Google)
- ✅ Firestore Database creada (modo de producción o prueba)

