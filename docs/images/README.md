# 📸 Guía para Agregar Screenshots y Videos

Esta carpeta contiene las capturas de pantalla y videos de la aplicación Fasting Tracker.

## 📋 Cómo Agregar Screenshots

### 1. Tomar Capturas de Pantalla

Toma capturas de pantalla de las siguientes pantallas:

- `login-screen.png` - Pantalla de login/registro
- `timer-screen.png` - Temporizador principal
- `water-tracker.png` - Tracker de hidratación
- `history-screen.png` - Panel de historial
- `settings-screen.png` - Panel de configuración
- `ai-assistant.png` - Modal del asistente IA
- `pwa-install.png` - Proceso de instalación PWA

### 2. Guardar las Imágenes

- Formato: PNG o JPG
- Resolución mínima: 1280px de ancho
- Nombre descriptivo: `nombre-funcionalidad.png`

### 3. Agregar a la Documentación

En `docs/screenshots.md`, agrega:

```markdown
![Descripción](images/nombre-imagen.png)
```

## 🎥 Cómo Agregar Videos

### Opción 1: YouTube

1. Sube el video a YouTube
2. Obtén el ID del video
3. En `docs/screenshots.md`, agrega:

```markdown
<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

### Opción 2: Vimeo

Similar a YouTube, pero usando el embed de Vimeo.

### Opción 3: Archivo Local

1. Guarda el video en `docs/images/`
2. Usa formato MP4 (máximo 50MB)
3. Agrega link directo en la documentación

## 📝 Videos Recomendados

- **Demo Completo**: Recorrido por todas las funcionalidades
- **Tutorial Primer Uso**: Cómo usar la app por primera vez
- **Funcionalidades PWA**: Instalación y uso offline
- **Asistente IA**: Demostración del Coach y Chef

## ✅ Checklist

Antes de agregar contenido:

- [ ] Screenshots en alta resolución
- [ ] Videos con buena calidad de audio
- [ ] Nombres descriptivos de archivos
- [ ] Enlaces actualizados en `screenshots.md`
- [ ] Contenido relevante y claro

---

**¿Tienes screenshots o videos listos?** Sigue los pasos arriba y actualiza la documentación.

