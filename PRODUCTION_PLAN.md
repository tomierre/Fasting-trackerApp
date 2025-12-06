# Plan de Producción - Fasting Tracker PWA

## 📋 Resumen Ejecutivo

Este documento detalla los pasos necesarios para llevar la aplicación Fasting Tracker a producción de manera segura, escalable y profesional.

**Tiempo estimado total**: 4-6 horas  
**Dificultad**: Media  
**Costos estimados**: $0-20/mes (dependiendo de tráfico y servicios adicionales)

---

## 🎯 Fase 1: Preparación del Código (1-2 horas)

### 1.1 Verificación de Código

- [ ] **Ejecutar linter y corregir errores**
  ```bash
  npm run lint
  ```
  - Corregir todos los warnings y errores
  - Asegurar código consistente

- [ ] **Verificar TypeScript**
  ```bash
  npm run build
  ```
  - Asegurar que no haya errores de tipos
  - Verificar que el build se complete correctamente

- [ ] **Revisar dependencias**
  ```bash
  npm audit
  ```
  - Verificar vulnerabilidades de seguridad
  - Actualizar dependencias si es necesario

### 1.2 Optimizaciones de Código

- [ ] **Minificar y optimizar assets**
  - Configurar Vite para producción (ya está configurado por defecto)
  - Verificar que las imágenes estén optimizadas
  - Asegurar tree-shaking de dependencias

- [ ] **Verificar tamaño del bundle**
  ```bash
  npm run build
  # Revisar el tamaño de los archivos en dist/
  ```
  - Idealmente el bundle principal debería ser < 500KB
  - Considerar code-splitting si es necesario

### 1.3 Variables de Entorno

- [ ] **Crear archivo `.env.production`**
  ```env
  VITE_GEMINI_API_KEY=tu_clave_de_produccion
  VITE_FIREBASE_API_KEY=tu_firebase_api_key
  VITE_FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
  VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
  VITE_FIREBASE_APP_ID=tu_app_id
  ```

- [ ] **Verificar que `.env` esté en `.gitignore`** ✅ (Ya está)

---

## 🔥 Fase 2: Configuración de Firebase (1 hora)

### 2.1 Verificación de Firebase Console

- [ ] **Autenticación (Authentication)**
  - [ ] Habilitar Email/Password
  - [ ] Habilitar Google Sign-In
  - [ ] Configurar dominios autorizados:
    - `localhost` (para desarrollo)
    - Tu dominio de producción (ej: `tudominio.com`, `app.tudominio.com`)

- [ ] **Firestore Database**
  - [ ] Crear base de datos en modo **Producción**
  - [ ] Configurar ubicación (recomendado: `us-central` o región cercana)

### 2.2 Reglas de Seguridad de Firestore

Crear o actualizar las reglas de seguridad en Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function para verificar autenticación
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function para verificar que el usuario es el dueño del documento
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Usuarios - solo pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if isOwner(userId);
      
      // Fasting data del usuario
      match /fasting/{document=**} {
        allow read, write: if isOwner(userId);
      }
      
      // Hydration data del usuario
      match /hydration/{document=**} {
        allow read, write: if isOwner(userId);
      }
      
      // Settings del usuario
      match /settings {
        allow read, write: if isOwner(userId);
      }
      
      // History del usuario
      match /history/{document=**} {
        allow read, write: if isOwner(userId);
      }
    }
  }
}
```

**Pasos:**
1. Ir a Firebase Console → Firestore Database → Reglas
2. Pegar las reglas arriba
3. Hacer clic en "Publicar"
4. Verificar que no haya errores de sintaxis

### 2.3 Configuración de Hosting (Firebase Hosting)

Si usas Firebase Hosting:

- [ ] Instalar Firebase CLI globalmente
  ```bash
  npm install -g firebase-tools
  ```

- [ ] Iniciar sesión
  ```bash
  firebase login
  ```

- [ ] Inicializar hosting
  ```bash
  firebase init hosting
  ```
  - Seleccionar el proyecto correcto
  - Directorio público: `dist`
  - Single-page app: `Yes`
  - Overwrite index.html: `No`

- [ ] Crear archivo `firebase.json` (se crea automáticamente)
- [ ] Crear archivo `.firebaserc` (se crea automáticamente)

### 2.4 Configurar CORS y Headers

Crear archivo `firebase.json` con configuración completa:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "/manifest.json",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0"
          }
        ]
      },
      {
        "source": "/sw.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          }
        ]
      }
    ]
  }
}
```

---

## 🏗️ Fase 3: Build y Testing (30 minutos)

### 3.1 Build de Producción

- [ ] **Limpiar builds anteriores**
  ```bash
  rm -rf dist
  ```

- [ ] **Ejecutar build**
  ```bash
  npm run build
  ```

- [ ] **Verificar output**
  - Revisar que todos los archivos estén en `dist/`
  - Verificar tamaño de los bundles
  - Asegurar que los iconos PWA estén incluidos

### 3.2 Testing Local del Build

- [ ] **Preview local del build**
  ```bash
  npm run preview
  ```
  
- [ ] **Probar funcionalidades críticas:**
  - [ ] Login/Registro
  - [ ] Iniciar ayuno
  - [ ] Agregar agua
  - [ ] Ver historial
  - [ ] Usar asistente IA
  - [ ] Verificar que PWA sea instalable
  - [ ] Probar modo offline (con Service Worker)

- [ ] **Testing en dispositivos móviles**
  - Usar la URL de preview en tu red local
  - Probar en iOS Safari
  - Probar en Android Chrome

### 3.3 Verificación de Performance

- [ ] **Lighthouse Audit**
  - Abrir Chrome DevTools → Lighthouse
  - Ejecutar audit para:
    - Performance (objetivo: > 90)
    - Accessibility (objetivo: > 90)
    - Best Practices (objetivo: > 90)
    - SEO (objetivo: > 90)
    - PWA (objetivo: 100)

---

## 🚀 Fase 4: Deployment (1-2 horas)

### Opción A: Firebase Hosting (Recomendado)

**Ventajas:**
- Integración nativa con Firebase
- SSL automático
- CDN global
- Gratis hasta 10GB/mes

**Pasos:**

1. [ ] **Build del proyecto**
   ```bash
   npm run build
   ```

2. [ ] **Deploy a Firebase Hosting**
   ```bash
   firebase deploy --only hosting
   ```

3. [ ] **Verificar deployment**
   - Visitar la URL proporcionada (ej: `https://tu-proyecto.web.app`)
   - Probar todas las funcionalidades

4. [ ] **Configurar dominio personalizado** (Opcional)
   - En Firebase Console → Hosting → Agregar dominio personalizado
   - Seguir las instrucciones para verificar dominio
   - Configurar DNS según instrucciones

### Opción B: Vercel

**Ventajas:**
- Deploy automático desde Git
- SSL automático
- CDN global
- Gratis para proyectos personales

**Pasos:**

1. [ ] **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. [ ] **Crear archivo `vercel.json`**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ],
     "headers": [
       {
         "source": "/manifest.json",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=0, must-revalidate"
           }
         ]
       },
       {
         "source": "/sw.js",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=0, must-revalidate"
           },
           {
             "key": "Service-Worker-Allowed",
             "value": "/"
           }
         ]
       }
     ]
   }
   ```

3. [ ] **Deploy**
   ```bash
   vercel
   ```
   - Seguir las instrucciones
   - Configurar variables de entorno en el dashboard de Vercel

4. [ ] **Configurar variables de entorno en Vercel Dashboard**
   - Ir a Settings → Environment Variables
   - Agregar todas las variables `VITE_*`

### Opción C: Netlify

**Ventajas:**
- Deploy automático desde Git
- SSL automático
- Gratis para proyectos personales

**Pasos:**

1. [ ] **Crear archivo `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [[headers]]
     for = "/manifest.json"
     [headers.values]
       Cache-Control = "public, max-age=0, must-revalidate"

   [[headers]]
     for = "/sw.js"
     [headers.values]
       Cache-Control = "public, max-age=0, must-revalidate"
       Service-Worker-Allowed = "/"
   ```

2. [ ] **Deploy**
   - Opción 1: Conectar repositorio Git en Netlify Dashboard
   - Opción 2: Usar Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod
     ```

3. [ ] **Configurar variables de entorno**
   - En Netlify Dashboard → Site settings → Build & deploy → Environment

---

## 🔒 Fase 5: Seguridad y Monitoreo (1 hora)

### 5.1 Seguridad

- [ ] **Verificar que las API keys no estén expuestas**
  - Las claves de Firebase están diseñadas para ser públicas (OK)
  - La clave de Gemini está en el cliente (considerar restricciones de dominio)

- [ ] **Configurar restricciones de API Key de Gemini** (Recomendado)
  1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
  2. API & Services → Credentials
  3. Seleccionar tu API Key de Gemini
  4. En "Application restrictions" seleccionar "HTTP referrers"
  5. Agregar tu dominio de producción
  6. En "API restrictions" seleccionar solo Gemini API

- [ ] **Revisar reglas de Firestore** (Ya configuradas en Fase 2)

- [ ] **Configurar Content Security Policy** (Opcional pero recomendado)
  - Agregar en `index.html`:
  ```html
  <meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.firebase.com;
    frame-src 'self' https://*.google.com;
  ">
  ```

### 5.2 Monitoreo y Analytics

- [ ] **Firebase Analytics** (Opcional)
  - Ya está incluido en el proyecto
  - Verificar que esté funcionando en Firebase Console

- [ ] **Error Tracking con Sentry** (Opcional pero recomendado)
  1. Crear cuenta en [Sentry](https://sentry.io/)
  2. Instalar SDK:
     ```bash
     npm install @sentry/react
     ```
  3. Configurar en `src/main.tsx`
  4. Agregar DSN en variables de entorno

- [ ] **Uptime Monitoring** (Opcional)
  - Configurar [UptimeRobot](https://uptimerobot.com/) o similar
  - Monitorear URL de producción cada 5 minutos

### 5.3 Performance Monitoring

- [ ] **Firebase Performance Monitoring** (Opcional)
  1. Habilitar en Firebase Console
  2. Ver métricas de carga y rendimiento

---

## 📱 Fase 6: Verificación Post-Deployment (30 minutos)

### 6.1 Checklist de Funcionalidades

- [ ] **Autenticación**
  - [ ] Login con email/password funciona
  - [ ] Login con Google funciona
  - [ ] Logout funciona

- [ ] **Temporizador**
  - [ ] Iniciar ayuno funciona
  - [ ] Timer cuenta correctamente
  - [ ] Detener ayuno funciona
  - [ ] Datos se guardan en Firestore

- [ ] **Hidratación**
  - [ ] Agregar agua funciona
  - [ ] Reset automático diario funciona
  - [ ] Recordatorios funcionan

- [ ] **Historial**
  - [ ] Se guardan sesiones completadas
  - [ ] Se muestran estadísticas correctamente

- [ ] **IA (Gemini)**
  - [ ] Coach motivacional funciona
  - [ ] Chef funciona

- [ ] **PWA**
  - [ ] App es instalable
  - [ ] Service Worker funciona
  - [ ] Funciona offline
  - [ ] Iconos se muestran correctamente

### 6.2 Testing Cross-Browser

- [ ] Chrome (Desktop)
- [ ] Safari (Desktop)
- [ ] Firefox (Desktop)
- [ ] Chrome (Android)
- [ ] Safari (iOS)

### 6.3 Testing de Performance

- [ ] Lighthouse score > 90 en todas las categorías
- [ ] Tiempo de carga inicial < 3 segundos
- [ ] First Contentful Paint < 1.5 segundos

---

## 📝 Fase 7: Documentación y Mantenimiento

### 7.1 Documentación

- [ ] **Actualizar README.md** con:
  - [ ] Instrucciones de deployment
  - [ ] Variables de entorno necesarias
  - [ ] Enlaces a producción
  - [ ] Troubleshooting común

- [ ] **Crear CHANGELOG.md**
  - Documentar versiones
  - Cambios por versión

- [ ] **Actualizar STATUS.md**
  - Marcar como "En Producción"
  - Documentar URL de producción

### 7.2 Plan de Mantenimiento

- [ ] **Backup de datos**
  - Configurar backups automáticos de Firestore
  - Firebase ofrece backups automáticos (revisar configuración)

- [ ] **Actualizaciones regulares**
  - Revisar dependencias cada mes
  - Actualizar cuando haya vulnerabilidades
  - Mantener Firebase SDK actualizado

- [ ] **Monitoreo de costos**
  - Revisar uso de Firestore (gratis hasta 50K lecturas/día)
  - Revisar uso de Firebase Hosting (gratis hasta 10GB/mes)
  - Revisar uso de Gemini API (según tu plan)

---

## 🔧 Scripts Útiles

Agregar a `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:prod": "tsc && vite build --mode production",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "deploy": "npm run build:prod && firebase deploy --only hosting",
    "deploy:preview": "npm run build:prod && firebase hosting:channel:deploy preview"
  }
}
```

---

## 🎯 Checklist Final de Producción

- [ ] ✅ Código sin errores de lint
- [ ] ✅ Build de producción exitoso
- [ ] ✅ Firebase configurado correctamente
- [ ] ✅ Reglas de seguridad de Firestore configuradas
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ App desplegada y accesible
- [ ] ✅ Todas las funcionalidades probadas
- [ ] ✅ PWA funciona correctamente
- [ ] ✅ Performance optimizado (Lighthouse > 90)
- [ ] ✅ Seguridad configurada (CSP, API key restrictions)
- [ ] ✅ Documentación actualizada

---

## 🚨 Troubleshooting Común

### Problema: Build falla
- **Solución**: Verificar errores de TypeScript con `npm run build`
- Verificar que todas las dependencias estén instaladas

### Problema: Variables de entorno no funcionan
- **Solución**: Asegurar que las variables comiencen con `VITE_`
- Reiniciar servidor de desarrollo después de cambiar `.env`

### Problema: Service Worker no se actualiza
- **Solución**: Limpiar cache del navegador
- Verificar que `sw.js` tenga headers de no-cache

### Problema: Firebase Auth no funciona en producción
- **Solución**: Verificar que el dominio esté en "Authorized domains" en Firebase Console

### Problema: Gemini API no funciona
- **Solución**: Verificar que la API key tenga restricciones correctas
- Verificar que el dominio esté autorizado en Google Cloud Console

---

## 📞 Soporte y Recursos

- **Firebase Documentation**: https://firebase.google.com/docs
- **Vite Documentation**: https://vitejs.dev/
- **PWA Documentation**: https://web.dev/progressive-web-apps/
- **Google Gemini API**: https://ai.google.dev/

---

**Última actualización**: 2024  
**Versión del plan**: 1.0

