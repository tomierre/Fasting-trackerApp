# 🎯 Próximos Pasos para Deploy en Vercel

## ✅ Lo que Ya Tienes Listo

- ✅ Archivos de configuración creados (`vercel.json`)
- ✅ Archivo `.env` con tus variables (protegido en `.gitignore`)
- ✅ Guías completas creadas:
  - `QUICK_START_VERCEL.md` - Guía rápida de 5 minutos
  - `VERCEL_SETUP.md` - Guía detallada paso a paso
  - `SEGURIDAD.md` - Guía de seguridad completa

---

## 🚀 Pasos Inmediatos (En Orden)

### Paso 1: Verificar que el Build Funciona

Primero, asegurémonos de que todo compile correctamente:

```bash
npm run build
```

Si hay errores, corrígelos antes de continuar.

### Paso 2: Preparar Código para Git

Si aún no tienes Git inicializado:

```bash
# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Fasting Tracker PWA ready for Vercel"
```

### Paso 3: Subir a GitHub

**Opción A: Crear repo nuevo en GitHub**

1. Ve a [github.com](https://github.com) y crea un nuevo repositorio
2. No inicialices con README (ya tienes uno)
3. Copia la URL del repositorio

**Opción B: Si ya tienes un repo**

```bash
# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/fasting-web.git
git branch -M main
git push -u origin main
```

### Paso 4: Conectar en Vercel

1. **Crear cuenta o iniciar sesión**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión (recomendado: con GitHub)

2. **Importar proyecto**
   - Click en **"Add New..."** → **"Project"**
   - Busca tu repositorio `fasting-web`
   - Click en **"Import"**

3. **Configurar proyecto**
   - Vercel detectará automáticamente: Vite, build command, etc.
   - Verifica que esté correcto

### Paso 5: Agregar Variables de Entorno

**⚠️ IMPORTANTE: Haz esto ANTES de hacer deploy**

En la página de configuración de Vercel:

1. Scroll hacia abajo hasta **"Environment Variables"**
2. Agrega estas 7 variables:

#### Lista de Variables:

1. **VITE_GEMINI_API_KEY**
   - Valor: Tu API key real de Gemini (copia de tu `.env` local)
   - Environments: ✅ Production ✅ Preview ✅ Development

2. **VITE_FIREBASE_API_KEY**
   - Valor: `reemplazar_aqui_con_tu_firebase_api_key`
   - Environments: ✅ Todas

3. **VITE_FIREBASE_AUTH_DOMAIN**
   - Valor: `reemplazar_aqui_con_tu_dominio.firebaseapp.com`
   - Environments: ✅ Todas

4. **VITE_FIREBASE_PROJECT_ID**
   - Valor: `reemplazar_aqui_con_tu_project_id`
   - Environments: ✅ Todas

5. **VITE_FIREBASE_STORAGE_BUCKET**
   - Valor: `reemplazar_aqui_con_tu_storage_bucket`
   - Environments: ✅ Todas

6. **VITE_FIREBASE_MESSAGING_SENDER_ID**
   - Valor: `reemplazar_aqui_con_tu_sender_id`
   - Environments: ✅ Todas

7. **VITE_FIREBASE_APP_ID**
   - Valor: `reemplazar_aqui_con_tu_app_id`
   - Environments: ✅ Todas

**Para cada variable:**
- Click en "Add"
- Key: Nombre de la variable
- Value: El valor (copia de tu `.env` o los valores de arriba)
- Environments: Marca las 3 opciones
- Click en "Add"

### Paso 6: Hacer Deploy

1. Una vez agregadas todas las variables
2. Click en **"Deploy"**
3. Espera 1-2 minutos
4. ¡Listo! 🎉 Obtendrás una URL como: `https://fasting-web-xyz.vercel.app`

### Paso 7: Configurar Firebase

Después del deploy, agrega tu dominio de Vercel en Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Tu proyecto → **Authentication** → **Settings** → **Authorized domains**
3. Click en **"Add domain"**
4. Agrega tu URL de Vercel: `tu-proyecto.vercel.app`
5. También agrega: `*.vercel.app` (para preview deployments)
6. Click en **"Add"**

### Paso 8: Probar la App

Abre tu URL de Vercel y prueba:

- [ ] La app carga correctamente
- [ ] Login/Registro funciona
- [ ] Iniciar ayuno funciona
- [ ] Agregar agua funciona
- [ ] Asistente IA funciona
- [ ] PWA es instalable

### Paso 9: Proteger API Key de Gemini (Recomendado)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. **API & Services** → **Credentials**
3. Selecciona tu API Key de Gemini
4. En **"Application restrictions"**: 
   - Selecciona **"HTTP referrers (web sites)"**
   - Agrega:
     ```
     https://tu-proyecto.vercel.app/*
     https://*.vercel.app/*
     ```
5. En **"API restrictions"**: 
   - Marca solo **"Generative Language API"**
6. Save

---

## 📋 Checklist Completo

### Antes de Deploy:
- [ ] `npm run build` funciona sin errores
- [ ] Código subido a Git/GitHub
- [ ] Proyecto conectado en Vercel
- [ ] 7 variables de entorno agregadas en Vercel

### Después de Deploy:
- [ ] Deploy exitoso
- [ ] URL de producción obtenida
- [ ] Dominio agregado en Firebase Authorized domains
- [ ] App probada y funcionando
- [ ] API key de Gemini protegida con restricciones

---

## 📚 Documentos de Referencia

- **`QUICK_START_VERCEL.md`** - Guía rápida de 5 minutos
- **`VERCEL_SETUP.md`** - Guía detallada completa
- **`SEGURIDAD.md`** - Información sobre seguridad y variables de entorno

---

## 🆘 Si Tienes Problemas

### Build falla
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel para ver el error específico

### Variables no funcionan
- Verifica que agregaste todas las variables
- Verifica que están marcadas para "Production"
- Haz un nuevo deploy después de agregar variables

### Firebase no funciona
- Agrega el dominio de Vercel en Firebase Authorized domains
- Verifica las configuraciones de Firebase

---

## 🎉 ¡A Seguir!

Sigue estos pasos en orden y tu app estará en producción en menos de 10 minutos.

**¿Listo para comenzar?** Empieza con el Paso 1: `npm run build`

---

**¿Tienes preguntas?** Revisa las guías detalladas o pregunta aquí.

