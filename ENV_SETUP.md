# Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_GEMINI_API_KEY=reemplazar_aqui_con_tu_api_key_de_gemini
VITE_FIREBASE_API_KEY=reemplazar_aqui_con_tu_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=reemplazar_aqui_con_tu_dominio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=reemplazar_aqui_con_tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=reemplazar_aqui_con_tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=reemplazar_aqui_con_tu_sender_id
VITE_FIREBASE_APP_ID=reemplazar_aqui_con_tu_app_id
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

