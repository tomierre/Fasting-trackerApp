# 🎯 Guía Paso a Paso: Activar GitHub Pages

## 📍 Paso 1: Abrir el Repositorio

1. Abre tu navegador
2. Ve a: **https://github.com/tomierre/Fasting-trackerApp**
3. Asegúrate de estar en la página principal del repositorio

## ⚙️ Paso 2: Ir a Settings

1. En la parte superior del repositorio, verás varias pestañas:
   - `Code` | `Issues` | `Pull requests` | `Actions` | **`Settings`** ← Click aquí
   
2. Click en **"Settings"** (es la última pestaña, puede estar oculta si la ventana es pequeña)

## 📄 Paso 3: Encontrar "Pages"

1. En el menú lateral izquierdo de Settings, verás varias opciones:
   - General
   - Access
   - Secrets and variables
   - Actions
   - **Pages** ← Busca esta opción (puede estar más abajo)
   
2. Click en **"Pages"**

## 🔧 Paso 4: Configurar GitHub Pages

Una vez en la página de Pages, verás una sección llamada **"Build and deployment"**:

### 4.1. Seleccionar Source

1. Busca el dropdown que dice **"Source"** o **"None"**
2. Click en el dropdown
3. Selecciona: **"Deploy from a branch"**

### 4.2. Seleccionar Branch

Después de seleccionar "Deploy from a branch", aparecerán dos opciones:

1. **Branch**: 
   - Click en el dropdown
   - Selecciona: **`gh-pages`**
   
2. **Folder**:
   - Debería aparecer automáticamente como **`/ (root)`**
   - Si no, selecciónalo

### 4.3. Guardar

1. Click en el botón **"Save"** (verde, a la derecha)

## ✅ Paso 5: Verificar Activación

Después de hacer click en "Save":

1. Verás un mensaje verde en la parte superior que dice algo como:
   ```
   ✓ Your site is live at https://tomierre.github.io/Fasting-trackerApp/
   ```

2. El link aparecerá en la parte superior de la página de configuración

3. **Espera 1-5 minutos** - GitHub necesita procesar el sitio

## 🔗 Paso 6: Probar el Link

1. Después de 1-5 minutos, abre:
   ```
   https://tomierre.github.io/Fasting-trackerApp/
   ```

2. Deberías ver la documentación completa con:
   - Menú lateral de navegación
   - Página principal
   - Todas las secciones disponibles

## 🆘 Solución de Problemas

### Problema: No veo "Pages" en Settings

**Solución:**
- El repositorio debe ser **público** para usar GitHub Pages gratis
- Si es privado, hazlo público temporalmente:
  - Settings → General → Scroll abajo → Danger Zone → Change visibility → Make public

### Problema: No aparece la opción "Deploy from a branch"

**Solución:**
- Asegúrate de que la rama `gh-pages` existe en GitHub
- Ya la creamos, así que debería aparecer

### Problema: El link sigue dando 404 después de activar

**Solución:**
1. Espera 5-10 minutos (a veces tarda más)
2. Verifica que la rama `gh-pages` tenga contenido:
   - Ve a: https://github.com/tomierre/Fasting-trackerApp/tree/gh-pages
   - Deberías ver archivos HTML y carpetas
3. Si sigue sin funcionar, re-haz el deploy:
   ```bash
   cd /Users/nicolasriquelme/Fasting-web
   python3 -m mkdocs gh-deploy --force
   ```

## 📋 Checklist Visual

Marca cada paso mientras lo completas:

```
[ ] Abrí el repositorio en GitHub
[ ] Click en "Settings"
[ ] Click en "Pages" en el menú lateral
[ ] Seleccioné "Deploy from a branch"
[ ] Seleccioné rama "gh-pages"
[ ] Seleccioné folder "/ (root)"
[ ] Click en "Save"
[ ] Vi el mensaje verde de confirmación
[ ] Esperé 1-5 minutos
[ ] Probé el link y funciona ✅
```

## 🎯 Resumen Ultra-Rápido

1. **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages**
4. Folder: **/ (root)**
5. **Save**
6. Esperar 1-5 minutos
7. Probar: `https://tomierre.github.io/Fasting-trackerApp/`

---

**¿En qué paso estás?** Avísame si necesitas ayuda en algún punto específico. 🚀

