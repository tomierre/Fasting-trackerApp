# Fasting Tracker - PWA

Una Progressive Web App (PWA) moderna para seguimiento de ayuno intermitente con autenticación de usuarios, sincronización en la nube y asistente de IA.

## Características

- 🔐 **Autenticación**: Login con Email/Password y Google Sign-In usando Firebase
- ⏱️ **Temporizador de Ayuno**: Anillo circular animado con seguimiento en tiempo real
- 💧 **Tracker de Hidratación**: Contador de agua con recordatorios automáticos
- 🤖 **Asistente IA**: Coach motivacional y sugerencias de comida post-ayuno (Gemini API)
- 📱 **PWA**: Instalable, funciona offline con Service Worker
- ☁️ **Sincronización**: Datos guardados en Firestore, sincronización entre dispositivos
- 🔔 **Notificaciones**: Recordatorios cuando se cumple el objetivo o falta hidratación

## Stack Tecnológico

- **React** + **Vite** + **TypeScript**
- **Tailwind CSS** para estilos
- **Firebase Authentication** + **Firestore**
- **Google Gemini API** para IA
- **Lucide React** para iconos

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_GEMINI_API_KEY=tu_clave_de_gemini
VITE_FIREBASE_API_KEY=AIzaSyCDZrw28v4Zb_kVFLQLjcMKgLNgs1h9GJw
VITE_FIREBASE_AUTH_DOMAIN=fastingpro-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fastingpro-app
VITE_FIREBASE_STORAGE_BUCKET=fastingpro-app.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=725583095818
VITE_FIREBASE_APP_ID=1:725583095818:web:3204e059a065456369d7f3
```

**Nota**: Solo falta agregar tu `VITE_GEMINI_API_KEY`. Puedes obtenerla en [Google AI Studio](https://makersuite.google.com/app/apikey).

### 3. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication con Email/Password y Google Sign-In
3. Crea una base de datos Firestore
4. Obtén las credenciales y añádelas al archivo `.env`

### 4. Generar iconos PWA

Los iconos deben estar en `public/icons/`. Puedes generarlos usando:
- [PWA Builder](https://www.pwabuilder.com/imageGenerator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Estructura del Proyecto

```
src/
├── components/       # Componentes React
├── context/         # Context API (AuthContext)
├── hooks/           # Hooks personalizados
├── utils/           # Utilidades y helpers
└── config/          # Configuración de Firebase
```

## Funcionalidades Principales

### Temporizador de Ayuno
- Anillo circular SVG con animación de progreso
- Display de tiempo transcurrido y restante
- Estados: "Ayunando" vs "Ventana de Ingesta"
- Sincronización en tiempo real con Firestore

### Configuración de Objetivos
- Presets rápidos: 13h, 16h, 18h, 20h, 24h, 36h
- Ajuste manual con botones +/-
- Validación: no permite cambiar objetivo durante ayuno activo

### Tracker de Hidratación
- Incrementos de 250ml (un vaso)
- Barra de progreso visual
- Recordatorio automático si pasan >60min sin agua
- Reset diario

### Integración IA (Gemini)
- **Coach Motivacional**: Frases basadas en fase fisiológica del ayuno
- **Chef**: Sugerencias de comida post-ayuno
- Exponential Backoff para reintentos

## Licencia

MIT

