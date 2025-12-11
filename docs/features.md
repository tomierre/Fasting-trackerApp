# ✨ Características

Fasting Tracker ofrece un conjunto completo de funcionalidades diseñadas para facilitar el seguimiento del ayuno intermitente de manera intuitiva y efectiva.

## 🎯 Funcionalidades Principales

### ⏱️ Temporizador de Ayuno

El corazón de la aplicación es un temporizador visual con anillo circular animado que muestra el progreso del ayuno en tiempo real.

**Características:**

- **Anillo Circular SVG**: Visualización elegante del progreso con animaciones fluidas
- **Tiempo Transcurrido**: Display en formato HH:MM:SS
- **Tiempo Restante**: Cuenta regresiva hasta completar el objetivo
- **Hora de Inicio/Fin**: Información clara de cuándo comenzó y cuándo terminará
- **Estados Visuales**: Diferencia clara entre "Ayunando" y "Ventana de Ingesta"
- **Sincronización en Tiempo Real**: Los datos se sincronizan automáticamente con Firestore

**Interacción:**

- Botón grande y claro para iniciar/terminar ayuno
- Confirmación antes de terminar un ayuno activo
- Persistencia automática del estado

### 💧 Tracker de Hidratación

Sistema completo para monitorear la ingesta de agua durante el ayuno.

**Características:**

- **Contador Inteligente**: Incrementos de 250ml (un vaso estándar)
- **Barra de Progreso Visual**: Representación gráfica del progreso hacia la meta diaria
- **Visualización de Vasos**: Grid visual mostrando vasos completados
- **Recordatorio Automático**: Alerta si pasan más de 60 minutos sin registrar agua
- **Reset Diario Automático**: El contador se resetea automáticamente a medianoche
- **Meta Personalizable**: Objetivo diario configurable (default: 2000ml)

**Notificaciones:**

- Recordatorio automático después de 60 minutos sin agua
- Integración con Browser Notification API

### 🤖 Asistente IA (Gemini)

Integración con Google Gemini API para proporcionar asistencia inteligente durante el ayuno.

**Coach Motivacional:**

- Frases motivacionales basadas en la fase fisiológica actual del ayuno
- Datos científicos breves y relevantes
- Respuestas personalizadas según las horas de ayuno completadas

**Chef (Sugerencias Post-Ayuno):**

- Recomendaciones de primera comida post-ayuno
- Sugerencias ligeras, nutritivas y fáciles de digerir
- Basadas en la duración del ayuno completado

**Características Técnicas:**

- Exponential Backoff para manejo de errores
- Fallback automático entre múltiples modelos de Gemini
- Estados de carga con skeleton/spinner
- Manejo robusto de errores con mensajes amigables

### 📊 Historial y Estadísticas

Seguimiento completo del progreso a lo largo del tiempo.

**Historial de Sesiones:**

- Guardado automático de cada sesión completada
- Información detallada: fecha, duración, objetivo, si se alcanzó la meta
- Ordenamiento por fecha (más recientes primero)
- Visualización clara y organizada

**Estadísticas:**

- **Promedio de Horas**: Promedio de horas ayunadas
- **Racha Actual**: Días consecutivos de ayunos completados
- **Total Completados**: Número total de ayunos que alcanzaron el objetivo
- **Porcentaje de Éxito**: Ratio de objetivos alcanzados

### 🔐 Autenticación y Seguridad

Sistema robusto de autenticación con múltiples opciones.

**Métodos de Autenticación:**

- **Email/Password**: Registro e inicio de sesión tradicional
- **Google Sign-In**: Autenticación rápida con cuenta de Google
- **Persistencia de Sesión**: La sesión se mantiene entre recargas

**Seguridad:**

- Protección de rutas con AuthGuard
- Datos del usuario aislados por ID
- Reglas de seguridad de Firestore configuradas

### ☁️ Sincronización Multi-dispositivo

Todos los datos se sincronizan automáticamente entre dispositivos.

**Datos Sincronizados:**

- Estado del temporizador (activo/inactivo, tiempo de inicio)
- Objetivo de horas configurado
- Historial de agua y último trago
- Historial completo de sesiones de ayuno
- Configuraciones del usuario

**Tecnología:**

- Firestore Database para almacenamiento
- Sincronización en tiempo real con listeners
- Optimistic updates para mejor UX

### 📱 Progressive Web App (PWA)

La aplicación es completamente instalable y funciona offline.

**Características PWA:**

- **Instalable**: Se puede instalar en dispositivos móviles y desktop
- **Offline**: Funciona sin conexión a internet (con Service Worker)
- **Iconos**: Set completo de iconos en múltiples tamaños (72x72 a 512x512)
- **Manifest**: Configuración completa para instalación
- **Service Worker**: Cache de assets para funcionamiento offline

**Experiencia:**

- Se comporta como una app nativa
- Acceso rápido desde la pantalla de inicio
- Sin necesidad de tienda de aplicaciones

### 🔔 Notificaciones

Sistema de notificaciones del navegador para recordatorios importantes.

**Tipos de Notificaciones:**

- **Objetivo Alcanzado**: Cuando se completa el tiempo objetivo de ayuno
- **Recordatorio de Agua**: Si pasan más de 60 minutos sin registrar agua
- **Permisos**: Solicitud automática de permisos al iniciar primer ayuno

**Características:**

- Notificaciones nativas del navegador
- No intrusivas y respetuosas
- Configurables por el usuario

### 🎨 Diseño y UX

Interfaz diseñada con atención al detalle y experiencia de usuario.

**Diseño:**

- **Dark Mode**: Estética oscura minimalista
- **Mobile-First**: Optimizado para dispositivos móviles
- **Animaciones Fluidas**: Transiciones suaves y naturales
- **Feedback Táctil**: Respuesta visual en todas las interacciones
- **Backdrop Blur**: Efectos visuales modernos

**Paleta de Colores:**

- Fondo: `slate-900`
- Acentos de ayuno: `indigo-500`
- Acentos de éxito/comida: `emerald-500`
- Texto: `slate-100` / `slate-300`

**Componentes:**

- Tarjetas con bordes sutiles
- Fondos semitransparentes
- Sombras suaves y elegantes
- Tipografía limpia y legible

## 🚀 Funcionalidades Futuras

Estas funcionalidades están planificadas para futuras versiones:

- 📈 Gráficos de progreso avanzados
- 🎯 Metas semanales/mensuales personalizables
- 📤 Exportación de datos (CSV/JSON)
- 🌍 Soporte multi-idioma
- 🔔 Recordatorios personalizables
- 📊 Dashboard de estadísticas avanzado

---

**¿Quieres ver la aplicación en acción?** Visita la sección de [Screenshots y Videos](screenshots.md).

