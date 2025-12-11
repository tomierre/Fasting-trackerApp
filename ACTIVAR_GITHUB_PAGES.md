# 🔧 Activar GitHub Pages - Solución al 404

## ⚠️ Problema

El link `https://tomierre.github.io/Fasting-trackerApp/` muestra un 404 porque GitHub Pages no está activado en el repositorio.

## ✅ Solución: Activar GitHub Pages Manualmente

### Paso 1: Ir a la Configuración del Repositorio

1. Ve a tu repositorio en GitHub:
   ```
   https://github.com/tomierre/Fasting-trackerApp
   ```

2. Click en **"Settings"** (arriba en el menú del repositorio)

3. En el menú lateral izquierdo, busca y click en **"Pages"**

### Paso 2: Configurar GitHub Pages

En la sección "Build and deployment":

1. **Source**: Selecciona **"Deploy from a branch"**

2. **Branch**: 
   - Selecciona `gh-pages`
   - Folder: `/ (root)`

3. Click en **"Save"**

### Paso 3: Esperar

- GitHub Pages puede tardar **1-5 minutos** en activarse
- Verás un mensaje verde indicando que el sitio está publicado
- El link aparecerá en la parte superior de la página de configuración

## 🔍 Verificar que el Deploy Funcionó

### Verificar que la rama gh-pages existe:

```bash
git fetch origin
git branch -r | grep gh-pages
```

Deberías ver: `origin/gh-pages`

### Ver el contenido de la rama:

```bash
git checkout gh-pages
ls -la
```

Deberías ver los archivos HTML generados por MkDocs.

## 🚀 Si GitHub Pages Sigue Sin Funcionar

### Opción 1: Re-hacer el Deploy

```bash
cd /Users/nicolasriquelme/Fasting-web
python3 -m mkdocs gh-deploy --force
```

El flag `--force` sobrescribe cualquier contenido previo.

### Opción 2: Verificar el Repositorio

Asegúrate de que:
- El repositorio es público (o tienes GitHub Pro)
- La rama `gh-pages` existe en GitHub
- Los archivos están en la raíz de la rama `gh-pages`

### Opción 3: Usar GitHub Actions (Alternativa)

Si el método manual no funciona, podemos configurar GitHub Actions para hacer el deploy automáticamente.

## 📋 Checklist

- [ ] Ir a Settings → Pages en GitHub
- [ ] Seleccionar rama `gh-pages`
- [ ] Seleccionar folder `/ (root)`
- [ ] Click en Save
- [ ] Esperar 1-5 minutos
- [ ] Verificar que el link funciona

## 🔗 Link Esperado

Una vez activado, la documentación estará en:
```
https://tomierre.github.io/Fasting-trackerApp/
```

---

**¿Necesitas ayuda con algún paso?** Avísame y te guío.

