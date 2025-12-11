# 🧩 Componentes

Descripción detallada de los componentes principales de Fasting Tracker.

## Componentes Principales

### TimerCircle

Componente principal que muestra el temporizador de ayuno con anillo circular animado.

**Props**: Ninguna (usa hooks internos)

**Características**:
- Anillo SVG circular con animación de progreso
- Display de tiempo transcurrido (HH:MM:SS)
- Tiempo restante hasta completar objetivo
- Hora de inicio y hora estimada de finalización
- Botón para iniciar/terminar ayuno
- Estados visuales: "Ayunando" vs "Ventana de Ingesta"

**Hooks utilizados**:
- `useFastingTimer`: Lógica del temporizador
- `useFirestore`: Sincronización con Firestore

### WaterTracker

Componente para monitorear la ingesta de agua durante el ayuno.

**Props**: Ninguna

**Características**:
- Contador con incrementos de 250ml
- Barra de progreso visual
- Grid de vasos visuales
- Recordatorio automático (>60min sin agua)
- Reset diario automático
- Botón para reset manual

**Hooks utilizados**:
- `useFirestore`: Para datos de hidratación

### SettingsPanel

Panel modal para configurar objetivos de ayuno.

**Props**:
- `onClose: () => void`: Callback para cerrar el panel

**Características**:
- Presets rápidos: 13h, 16h, 18h, 20h, 24h, 36h
- Ajuste manual con botones +/-
- Validación: no permite cambiar si ayuno está activo
- Persistencia automática

### HistoryPanel

Panel modal que muestra el historial de sesiones y estadísticas.

**Props**:
- `onClose: () => void`: Callback para cerrar el panel

**Características**:
- Lista de sesiones pasadas
- Estadísticas: promedio, racha, completados
- Ordenamiento por fecha
- Visualización clara y organizada

### Login

Componente de autenticación con formulario de login/registro.

**Props**: Ninguna

**Características**:
- Formulario de Email/Password
- Botón de Google Sign-In
- Toggle entre Login y Registro
- Manejo de errores
- Validación de formularios

**Hooks utilizados**:
- `useAuth`: Para funciones de autenticación

### GeminiModal

Modal que muestra las respuestas del asistente IA.

**Props**: Ninguna (usa GeminiContext)

**Características**:
- Estados de carga (skeleton/spinner)
- Display de respuestas formateadas
- Manejo de errores amigable
- Botón de cerrar

**Hooks utilizados**:
- `useGemini`: Para estado de IA

### AIAssistantButtons

Botones para acceder a las funcionalidades de IA.

**Props**: Ninguna

**Características**:
- Botón "Coach IA" para motivación
- Botón "Chef" para sugerencias de comida
- Estados visuales según disponibilidad

### AuthGuard

Componente de orden superior que protege rutas.

**Props**:
- `children: ReactNode`: Componentes hijos a proteger

**Características**:
- Redirige a Login si no hay usuario autenticado
- Muestra LoadingSpinner mientras carga
- Renderiza children si está autenticado

### LoadingSpinner

Componente de carga genérico.

**Props**: Ninguna

**Características**:
- Spinner animado
- Mensaje de carga opcional
- Diseño consistente con la app

## Estructura de Componentes

### Jerarquía

```
App
├── AuthGuard
│   └── (Contenido protegido)
│       ├── Header
│       ├── TimerCircle
│       ├── WaterTracker
│       ├── AIAssistantButtons
│       └── Botones de navegación
│
├── SettingsPanel (Modal)
├── HistoryPanel (Modal)
└── GeminiModal (Modal)
```

### Comunicación entre Componentes

- **Props**: Para pasar datos de padre a hijo
- **Context API**: Para estado global (Auth, Gemini)
- **Hooks personalizados**: Para lógica compartida
- **Firestore listeners**: Para sincronización en tiempo real

## Patrones de Diseño

### Component Composition

Los componentes se componen de manera modular:

```tsx
<AuthGuard>
  <App>
    <TimerCircle />
    <WaterTracker />
  </App>
</AuthGuard>
```

### Custom Hooks

La lógica compleja se extrae a hooks:

```tsx
function TimerCircle() {
  const { ... } = useFastingTimer();
  const { ... } = useFirestore();
  // ...
}
```

### Controlled Components

Los componentes controlan su propio estado cuando es apropiado:

```tsx
const [showSettings, setShowSettings] = useState(false);
```

## Estilos

Todos los componentes usan Tailwind CSS con:

- Clases utilitarias
- Diseño responsive (mobile-first)
- Dark mode nativo
- Animaciones y transiciones

## Accesibilidad

Consideraciones de accesibilidad:

- Labels descriptivos en formularios
- Botones con texto o aria-labels
- Contraste adecuado de colores
- Navegación por teclado

---

**¿Quieres ver cómo se usan estos componentes?** Revisa el código fuente en `src/components/`.

