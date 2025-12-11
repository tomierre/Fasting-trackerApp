# 🚀 Deploy de Documentación MkDocs

## 📍 Estado Actual

He creado todos los archivos de MkDocs, pero **aún no está desplegado**. Necesitas hacer el deploy para obtener el link.

## 🌐 Opción 1: GitHub Pages (Recomendado - Gratis)

### Paso 1: Instalar MkDocs

```bash
pip install mkdocs-material
```

O con pipx:

```bash
pipx install mkdocs-material
```

### Paso 2: Deploy a GitHub Pages

```bash
cd /Users/nicolasriquelme/Fasting-web
mkdocs gh-deploy
```

Esto:
- Hace build de la documentación
- Crea una rama `gh-pages`
- Sube los archivos a GitHub
- Configura GitHub Pages automáticamente

### Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub: `https://github.com/tomierre/Fasting-trackerApp`
2. Settings → Pages
3. Source: Selecciona `gh-pages` branch
4. Save

### Link Resultante

Tu documentación estará en:
```
https://tomierre.github.io/Fasting-trackerApp/
```

---

## 💻 Opción 2: Ver Localmente

Si solo quieres verla localmente:

```bash
# Instalar
pip install mkdocs-material

# Servir localmente
cd /Users/nicolasriquelme/Fasting-web
mkdocs serve
```

Luego abre: `http://127.0.0.1:8000`

---

## 🔧 Opción 3: Build Manual

```bash
mkdocs build
```

Esto genera los archivos estáticos en `site/` que puedes subir a cualquier hosting.

---

## ⚡ Comando Rápido

```bash
# Instalar y deploy en un solo paso
pip install mkdocs-material && cd /Users/nicolasriquelme/Fasting-web && mkdocs gh-deploy
```

Luego activa GitHub Pages en Settings → Pages.

---

## 📋 Checklist

- [ ] MkDocs instalado (`pip install mkdocs-material`)
- [ ] Deploy ejecutado (`mkdocs gh-deploy`)
- [ ] GitHub Pages activado (Settings → Pages)
- [ ] Link funcionando: `https://tomierre.github.io/Fasting-trackerApp/`

---

**¿Necesitas ayuda con el deploy?** Ejecuta los comandos arriba y avísame si hay algún problema.

