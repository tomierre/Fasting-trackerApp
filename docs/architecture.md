# 🏗️ Arquitectura

Esta sección describe la arquitectura técnica del proyecto Fasting Tracker.

## Visión General

Fasting Tracker es una Progressive Web App construida con React y TypeScript, utilizando Firebase como backend y Google Gemini API para funcionalidades de IA.

## Stack Tecnológico

### Frontend

- **React 18**: Biblioteca UI con hooks modernos
- **Vite**: Build tool y dev server ultra-rápido
- **TypeScript**: Type safety y mejor DX
- **Tailwind CSS**: Framework CSS utility-first
- **Lucide React**: Biblioteca de iconos

### Backend y Servicios

- **Firebase Authentication**: Autenticación de usuarios
- **Cloud Firestore**: Base de datos NoSQL en tiempo real
- **Google Gemini API**: Funcionalidades de IA

### PWA

- **Service Worker**: Para funcionamiento offline
- **Web App Manifest**: Para instalación como PWA

## Estructura de Carpetas

```
src/
├── components/          # Componentes React reutilizables
│   ├── TimerCircle.tsx      # Temporizador principal
│   ├── WaterTracker.tsx     # Tracker de hidratación
│   ├── SettingsPanel.tsx    # Panel de configuración
│   ├── HistoryPanel.tsx      # Historial y estadísticas
│   ├── Login.tsx            # Pantalla de autenticación
│   ├── GeminiModal.tsx      # Modal del asistente IA
│   ├── AIAssistantButtons.tsx # Botones de IA
│   ├── AuthGuard.tsx        # Protección de rutas
│   └── LoadingSpinner.tsx  # Componente de carga
│
├── context/            # Context API para estado global
│   ├── AuthContext.tsx      # Contexto de autenticación
│   └── GeminiContext.tsx    # Contexto de IA
│
├── hooks/              # Hooks personalizados
│   ├── useFastingTimer.ts  # Lógica del temporizador
│   ├── useFirestore.ts      # Manejo de Firestore
│   └── useGemini.ts         # Integración con Gemini
│
├── utils/              # Utilidades y helpers
│   ├── firestore.ts         # Funciones de Firestore
│   ├── gemini.ts            # Cliente de Gemini API
│   ├── time.ts              # Utilidades de tiempo
│   ├── notifications.ts     # Notificaciones del navegador
│   ├── stats.ts             # Cálculos de estadísticas
│   └── registerSW.ts        # Registro de Service Worker
│
└── config/             # Configuración
    └── firebase.ts          # Inicialización de Firebase
```

## Flujo de Datos

### Autenticación

```
Usuario → Login Component → AuthContext → Firebase Auth
                                    ↓
                            Estado de autenticación
                                    ↓
                            AuthGuard → App Component
```

### Temporizador de Ayuno

```
TimerCircle → useFastingTimer → useFirestore → Firestore
                                      ↓
                            Sincronización en tiempo real
                                      ↓
                            Actualización automática de UI
```

### Integración IA

```
AIAssistantButtons → GeminiContext → useGemini → gemini.ts
                                                      ↓
                                            Gemini API
                                                      ↓
                                            GeminiModal (respuesta)
```

## Patrones de Diseño Utilizados

### Context API

Se utiliza Context API para compartir estado global:

- **AuthContext**: Estado de autenticación del usuario
- **GeminiContext**: Estado de las peticiones de IA

### Custom Hooks

Hooks personalizados encapsulan lógica compleja:

- `useFastingTimer`: Maneja toda la lógica del temporizador
- `useFirestore`: Abstrae las operaciones de Firestore
- `useGemini`: Maneja las interacciones con Gemini API

### Component Composition

Los componentes se componen de manera modular:

- Componentes pequeños y enfocados
- Reutilización de componentes
- Props bien definidas con TypeScript

## Gestión de Estado

### Estado Local

- `useState` para estado de componentes individuales
- `useEffect` para efectos secundarios y sincronización

### Estado Global

- Context API para estado compartido (auth, IA)
- Firestore listeners para sincronización en tiempo real

### Persistencia

- Firestore para persistencia en la nube
- Service Worker cache para funcionamiento offline

## Manejo de Errores

### Niveles de Manejo

1. **Componente**: Manejo local de errores de UI
2. **Hook**: Manejo de errores de lógica de negocio
3. **Utils**: Manejo de errores de API y servicios

### Estrategias

- **Exponential Backoff**: Para reintentos de API
- **Fallback**: Múltiples endpoints de Gemini
- **Error Boundaries**: Para errores de React (futuro)

## Optimizaciones

### Performance

- Code splitting con Vite
- Lazy loading de componentes pesados
- Memoización donde es necesario
- Optimización de re-renders

### PWA

- Service Worker para cache de assets
- Manifest para instalación
- Offline-first approach

### Build

- Tree-shaking automático
- Minificación de código
- Optimización de assets

## Seguridad

### Autenticación

- Firebase Auth maneja toda la seguridad
- Tokens JWT automáticos
- Sesiones persistentes seguras

### Firestore Rules

- Reglas de seguridad por usuario
- Validación de datos en el servidor
- Aislamiento de datos por usuario

### Variables de Entorno

- Variables sensibles en `.env`
- No se incluyen en el código fuente
- Configuración por ambiente

## Escalabilidad

### Firestore

- Escala automáticamente
- Queries optimizadas
- Índices donde es necesario

### Arquitectura

- Componentes modulares
- Separación de concerns
- Fácil agregar nuevas features

## Testing (Futuro)

Estrategia planificada:

- Unit tests para utils y hooks
- Integration tests para componentes
- E2E tests para flujos críticos

---

**¿Quieres conocer más detalles?** Revisa la [guía de desarrollo](development.md) o explora el código fuente.

