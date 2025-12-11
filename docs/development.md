# 💻 Guía de Desarrollo

Esta guía está dirigida a desarrolladores que quieren contribuir o entender el código de Fasting Tracker.

## Configuración del Entorno de Desarrollo

### Requisitos

- Node.js 18+
- Editor de código (VS Code recomendado)
- Git

### Extensiones Recomendadas (VS Code)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Estructura del Código

### Convenciones de Nombres

- **Componentes**: PascalCase (`TimerCircle.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useFastingTimer.ts`)
- **Utilidades**: camelCase (`time.ts`, `firestore.ts`)
- **Archivos de configuración**: kebab-case o camelCase

### Organización de Archivos

```
src/
├── components/    # Componentes React (uno por archivo)
├── context/      # Context providers
├── hooks/        # Custom hooks
├── utils/        # Funciones utilitarias
└── config/       # Configuración (Firebase, etc.)
```

## Estándares de Código

### TypeScript

- Usar tipos explícitos cuando sea posible
- Evitar `any` (usar `unknown` si es necesario)
- Interfaces para objetos complejos
- Tipos para props de componentes

### React

- Functional components solamente
- Hooks en lugar de clases
- Props tipadas con interfaces
- Destructuring de props

### Estilos

- Tailwind CSS para todos los estilos
- Clases utilitarias preferidas sobre CSS custom
- Mobile-first approach
- Dark mode nativo

## Flujo de Trabajo

### 1. Crear una Rama

```bash
git checkout -b feature/nueva-funcionalidad
```

### 2. Desarrollo

- Escribe código siguiendo los estándares
- Prueba localmente con `npm run dev`
- Verifica con `npm run lint`

### 3. Commit

```bash
git add .
git commit -m "feat: descripción de la funcionalidad"
```

**Convención de commits**:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato
- `refactor:` Refactorización de código
- `test:` Agregar tests

### 4. Push y Pull Request

```bash
git push origin feature/nueva-funcionalidad
```

Luego crea un Pull Request en GitHub.

## Hooks Personalizados

### useFastingTimer

Hook principal para la lógica del temporizador.

**Retorna**:
- Estado del temporizador
- Funciones para iniciar/terminar ayuno
- Tiempo transcurrido y restante

**Uso**:
```tsx
const { isFasting, startTime, elapsedSeconds, startFasting, stopFasting } = useFastingTimer();
```

### useFirestore

Hook para manejar datos de Firestore.

**Retorna**:
- Datos de fasting, hidratación, settings
- Funciones de actualización
- Estado de carga

**Uso**:
```tsx
const { fastingData, hydrationData, updateFastingData } = useFirestore();
```

### useGemini

Hook para interactuar con Gemini API.

**Retorna**:
- Estado de la petición
- Funciones para llamar al coach o chef
- Respuesta y errores

**Uso**:
```tsx
const { callCoach, callChef, loading, response } = useGemini();
```

## Utilidades

### time.ts

Funciones para formateo y cálculos de tiempo:

- `formatTime(seconds)`: Formatea segundos a HH:MM:SS
- `formatHours(seconds)`: Formatea a horas y minutos
- `getStartOfDay(date)`: Obtiene inicio del día
- `isSameDay(timestamp1, timestamp2)`: Compara días

### firestore.ts

Funciones para operaciones de Firestore:

- `getFastingData(userId)`: Obtiene datos de ayuno
- `setFastingData(userId, data)`: Guarda datos de ayuno
- `saveFastingSession(userId, session)`: Guarda sesión completada
- `getFastingHistory(userId)`: Obtiene historial

### gemini.ts

Cliente para Gemini API:

- `callGeminiAPI(prompt, maxRetries)`: Llama a la API
- `generateMotivationalPrompt(hours)`: Genera prompt para coach
- `generateChefPrompt(duration)`: Genera prompt para chef

## Testing

### Ejecutar Linter

```bash
npm run lint
```

### Verificar Build

```bash
npm run build
```

### Preview del Build

```bash
npm run preview
```

## Debugging

### React DevTools

Instala la extensión de React DevTools para inspeccionar componentes.

### Firebase Console

Usa Firebase Console para ver datos en tiempo real y debuggear Firestore.

### Network Tab

Usa DevTools Network tab para inspeccionar llamadas a APIs.

## Mejores Prácticas

### Performance

- Usar `React.memo` para componentes pesados (si es necesario)
- Evitar re-renders innecesarios
- Lazy loading para componentes grandes

### Código Limpio

- Funciones pequeñas y enfocadas
- Nombres descriptivos
- Comentarios cuando sea necesario
- DRY (Don't Repeat Yourself)

### Seguridad

- Nunca commitear `.env`
- Validar inputs del usuario
- Usar Firestore Rules para seguridad

## Recursos Útiles

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Vite Docs](https://vitejs.dev/)

---

**¿Tienes preguntas?** Abre un issue en GitHub o consulta la documentación técnica.

