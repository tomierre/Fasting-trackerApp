# 📚 Documentación MkDocs

Esta carpeta contiene la documentación completa del proyecto Fasting Tracker generada con MkDocs.

## 🚀 Inicio Rápido

### Instalar MkDocs

```bash
pip install mkdocs-material
```

O con pipx (recomendado):

```bash
pipx install mkdocs-material
```

### Servir Documentación Localmente

```bash
mkdocs serve
```

La documentación estará disponible en `http://127.0.0.1:8000`

### Build de la Documentación

```bash
mkdocs build
```

Esto generará los archivos estáticos en `site/`

## 📁 Estructura

```
docs/
├── index.md              # Página principal
├── getting-started.md    # Guía de inicio rápido
├── installation.md       # Guía de instalación
├── features.md           # Características detalladas
├── screenshots.md        # Screenshots y videos
├── architecture.md       # Arquitectura técnica
├── components.md         # Documentación de componentes
├── development.md        # Guía de desarrollo
├── deployment.md         # Guía de deployment
├── process.md            # Proceso de desarrollo
├── timeline.md           # Timeline del proyecto
└── images/              # Screenshots y recursos visuales
```

## 🎨 Personalización

El tema y configuración están en `mkdocs.yml` en la raíz del proyecto.

### Cambiar Tema

Edita `mkdocs.yml` y modifica la sección `theme`.

### Agregar Páginas

1. Crea el archivo `.md` en `docs/`
2. Agrégalo a la sección `nav` en `mkdocs.yml`

## 📸 Agregar Screenshots

1. Guarda las imágenes en `docs/images/`
2. Referencia en los archivos `.md` con: `![Descripción](images/nombre.png)`
3. Ver instrucciones detalladas en `docs/images/README.md`

## 🎥 Agregar Videos

1. Sube el video a YouTube o Vimeo
2. Obtén el código de embed
3. Agrega el iframe en `docs/screenshots.md`

## 📝 Convenciones

- Usar Markdown estándar
- Incluir ejemplos de código cuando sea útil
- Mantener el tono profesional pero accesible
- Evitar información sensible (API keys, etc.)

## 🔄 Actualizar Documentación

1. Edita los archivos `.md` en `docs/`
2. Verifica localmente con `mkdocs serve`
3. Commit y push los cambios
4. La documentación se actualizará automáticamente si está configurada con CI/CD

---

**¿Necesitas ayuda?** Consulta la [documentación de MkDocs](https://www.mkdocs.org/) o [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

