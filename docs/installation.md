# 📦 Instalación

Guía completa para instalar y configurar Fasting Tracker en tu entorno local.

## Requisitos del Sistema

- **Node.js**: Versión 18 o superior
- **npm**: Versión 9 o superior (viene con Node.js)
- **Git**: Para clonar el repositorio

## Instalación Paso a Paso

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tomierre/Fasting-trackerApp.git
cd Fasting-trackerApp
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias, incluyendo:

- React y React DOM
- Vite
- TypeScript
- Tailwind CSS
- Firebase SDK
- Lucide React (iconos)

### Paso 3: Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita **Authentication** con:
   - Email/Password
   - Google Sign-In
4. Crea una base de datos **Firestore** en modo producción o prueba
5. Obtén las credenciales de configuración

### Paso 4: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_GEMINI_API_KEY=tu_gemini_api_key
```

**Nota**: Reemplaza los valores con tus credenciales reales de Firebase y Gemini.

### Paso 5: Configurar Firestore Security Rules

En Firebase Console, ve a Firestore Database → Rules y configura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Paso 6: Verificar la Instalación

```bash
npm run build
```

Si el build se completa sin errores, la instalación fue exitosa.

## Scripts Disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo en `http://localhost:5173` con hot-reload.

### Build de Producción

```bash
npm run build
```

Genera los archivos optimizados en la carpeta `dist/`.

### Preview del Build

```bash
npm run preview
```

Sirve los archivos de producción localmente para probar el build.

### Linting

```bash
npm run lint
```

Ejecuta el linter para verificar el código.

```bash
npm run lint:fix
```

Ejecuta el linter y corrige automáticamente los problemas.

## Estructura del Proyecto

```
Fasting-trackerApp/
├── public/           # Archivos estáticos
│   ├── icons/       # Iconos PWA
│   ├── manifest.json
│   └── sw.js        # Service Worker
├── src/
│   ├── components/  # Componentes React
│   ├── context/     # Context API
│   ├── hooks/       # Hooks personalizados
│   ├── utils/       # Utilidades
│   └── config/      # Configuración
├── docs/            # Documentación MkDocs
├── .env             # Variables de entorno (no se sube a Git)
└── package.json     # Dependencias y scripts
```

## Solución de Problemas

### Error: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Variables de entorno no funcionan

- Verifica que el archivo `.env` esté en la raíz del proyecto
- Asegúrate de que las variables comiencen con `VITE_`
- Reinicia el servidor de desarrollo después de cambiar `.env`

### Error: Firebase no se conecta

- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que Authentication y Firestore estén habilitados
- Verifica las reglas de seguridad de Firestore

### Error: Build falla

```bash
npm run lint
```

Revisa y corrige los errores de linting antes de hacer build.

## Próximos Pasos

Una vez instalado correctamente:

1. Lee la [guía de inicio rápido](getting-started.md)
2. Explora las [características](features.md)
3. Revisa la [arquitectura](architecture.md) si planeas desarrollar

---

**¿Tienes problemas?** Revisa la sección de solución de problemas arriba o consulta los issues en GitHub.

