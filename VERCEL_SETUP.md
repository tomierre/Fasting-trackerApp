# 🚀 Guía Paso a Paso: Deploy en Vercel

## 📋 Pre-requisitos

- [ ] Cuenta de Vercel (gratis) - [Crear cuenta aquí](https://vercel.com/signup)
- [ ] Proyecto en Git (GitHub, GitLab, o Bitbucket)
- [ ] Variables de entorno listas (las configuramos en Vercel)

---

## Paso 1: Preparar el Código

### 1.1 Verificar que el build funciona

```bash
npm run build
```

Si hay errores, corrígelos antes de continuar.

### 1.2 Verificar archivos importantes

- ✅ `vercel.json` existe y está configurado
- ✅ `.gitignore` incluye `.env`
- ✅ `package.json` tiene el script `build`

---

## Paso 2: Subir Código a Git (Si aún no lo has hecho)

### Opción A: GitHub (Recomendado)

1. **Crear repositorio en GitHub:**
   - Ve a [github.com](https://github.com)
   - Click en "New repository"
   - Nombre: `fasting-web` (o el que prefieras)
   - **NO** inicialices con README (ya tienes uno)
   - Click en "Create repository"

2. **Inicializar Git y subir código:**
   ```bash
   # En la carpeta de tu proyecto
   git init
   git add .
   git commit -m "Initial commit: Fasting Tracker PWA"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/fasting-web.git
   git push -u origin main
   ```

   **Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub**

### Opción B: Ya tienes el código en Git

Si ya tienes el código en Git, solo asegúrate de que esté actualizado:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push
```

---

## Paso 3: Conectar Proyecto en Vercel

### 3.1 Crear cuenta o iniciar sesión

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Sign Up" o "Log In"
3. Recomendado: Inicia sesión con GitHub (más fácil para conectar repos)

### 3.2 Importar proyecto

1. En el dashboard de Vercel, click en **"Add New..."** → **"Project"**
2. Busca tu repositorio `fasting-web`
3. Click en **"Import"**

### 3.3 Configurar proyecto

Vercel detectará automáticamente:
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Root Directory: `.` (raíz)

**Verifica que esté correcto y click en "Deploy"**

> ⚠️ **NO hagas deploy aún** - primero necesitamos configurar las variables de entorno

---

## Paso 4: Configurar Variables de Entorno en Vercel

### 4.1 Antes del primer deploy

Antes de hacer click en "Deploy", ve a la sección **"Environment Variables"**:

1. Click en **"Environment Variables"** (abajo en la configuración)
2. Agrega cada variable una por una:

### Variables a Agregar:

```env
VITE_GEMINI_API_KEY=tu_clave_real_de_gemini
VITE_FIREBASE_API_KEY=AIzaSyCDZrw28v4Zb_kVFLQLjcMKgLNgs1h9GJw
VITE_FIREBASE_AUTH_DOMAIN=fastingpro-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fastingpro-app
VITE_FIREBASE_STORAGE_BUCKET=fastingpro-app.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=725583095818
VITE_FIREBASE_APP_ID=1:725583095818:web:3204e059a065456369d7f3
```

**Pasos para agregar cada variable:**

1. **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Tu API key real de Gemini (la que tienes en tu `.env` local)
   - **Environments**: Marca todas (Production, Preview, Development)
   - Click en **"Add"**

2. **Key**: `VITE_FIREBASE_API_KEY`
   - **Value**: `AIzaSyCDZrw28v4Zb_kVFLQLjcMKgLNgs1h9GJw` (o la tuya si es diferente)
   - **Environments**: Todas
   - Click en **"Add"**

3. Repite para todas las demás variables de Firebase

### 4.2 Verificar variables agregadas

Deberías ver 7 variables en total. Verifica que todas estén marcadas para los 3 ambientes.

---

## Paso 5: Configurar Firebase para el Dominio de Vercel

### 5.1 Agregar dominio autorizado en Firebase

Una vez que Vercel haga el deploy, obtendrás una URL como:
- `https://fasting-web-xyz.vercel.app`

**Antes o después del deploy, agrega este dominio a Firebase:**

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `fastingpro-app`
3. Ve a **Authentication** → **Settings** → **Authorized domains**
4. Click en **"Add domain"**
5. Agrega: `fasting-web-xyz.vercel.app` (tu URL de Vercel)
   - También agrega `*.vercel.app` si quieres que funcione en preview deployments
6. Click en **"Add"**

### 5.2 (Opcional) Dominio personalizado

Si más tarde quieres un dominio personalizado:
- En Vercel: Settings → Domains → Add domain
- Luego agrega ese dominio también en Firebase Authorized domains

---

## Paso 6: Hacer el Deploy

### 6.1 Primer deploy

1. En la página de configuración de Vercel, verifica que todo esté correcto
2. Click en **"Deploy"**
3. Espera 1-2 minutos mientras Vercel:
   - Instala dependencias
   - Ejecuta el build
   - Despliega la aplicación

### 6.2 Ver el resultado

Una vez terminado, verás:
- ✅ URL de producción: `https://tu-proyecto.vercel.app`
- ✅ Estado: "Ready"
- ✅ Logs del build

**Click en la URL para ver tu app en producción! 🎉**

---

## Paso 7: Verificar que Todo Funciona

### 7.1 Testing en producción

- [ ] Abre la URL de Vercel
- [ ] Verifica que la app carga correctamente
- [ ] Prueba login/registro
- [ ] Prueba iniciar un ayuno
- [ ] Prueba agregar agua
- [ ] Prueba el asistente IA (Gemini)
- [ ] Verifica que PWA sea instalable

### 7.2 Verificar errores en consola

1. Abre DevTools (F12)
2. Ve a la pestaña Console
3. Verifica que no haya errores relacionados con:
   - Firebase (debería conectarse)
   - Variables de entorno (deberían estar disponibles)

### 7.3 Si algo no funciona

**Problema: Variables de entorno no funcionan**
- Verifica que agregaste todas en Vercel
- Verifica que las marcas para "Production"
- Haz un nuevo deploy después de agregar variables

**Problema: Firebase Auth no funciona**
- Verifica que agregaste el dominio de Vercel en Firebase Authorized domains
- Verifica que las configuraciones de Firebase en las variables sean correctas

**Problema: Gemini API no funciona**
- Verifica que la API key esté correcta en Vercel
- Verifica que tengas restricciones de dominio configuradas (o quítalas temporalmente para probar)

---

## Paso 8: Configurar Deploy Automático

### 8.1 Ya está configurado! 🎉

Si conectaste tu repositorio de Git, Vercel automáticamente:
- ✅ Hace deploy en cada push a `main`
- ✅ Crea preview deployments en cada Pull Request
- ✅ Te notifica por email de cada deploy

### 8.2 Verificar configuración

1. En Vercel Dashboard → Tu proyecto → Settings → Git
2. Verifica que esté conectado a tu repositorio
3. Puedes configurar:
   - Branch de producción (default: `main`)
   - Build command (default: `npm run build`)
   - Output directory (default: `dist`)

---

## Paso 9: Configurar Dominio Personalizado (Opcional)

### 9.1 Agregar dominio en Vercel

1. En Vercel Dashboard → Tu proyecto → Settings → Domains
2. Click en **"Add"**
3. Ingresa tu dominio (ej: `fasting-tracker.com`)
4. Sigue las instrucciones para configurar DNS

### 9.2 Configurar DNS

Vercel te dará instrucciones específicas. Generalmente necesitas:

- Tipo: `CNAME`
- Nombre: `@` o `www`
- Valor: `cname.vercel-dns.com`

### 9.3 Agregar dominio en Firebase

Una vez que el dominio funcione en Vercel:
1. Firebase Console → Authentication → Settings → Authorized domains
2. Agrega tu dominio personalizado

---

## Paso 10: Proteger API Key de Gemini (Importante)

### 10.1 Configurar restricciones de dominio

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto (o crea uno si no tienes)
3. Ve a **API & Services** → **Credentials**
4. Busca tu API Key de Gemini
5. Click en el nombre de la key para editarla

### 10.2 Configurar restricciones

**Application restrictions:**
- Selecciona **"HTTP referrers (web sites)"**
- Click en **"Add an item"**
- Agrega:
  ```
  https://tu-proyecto.vercel.app/*
  https://*.vercel.app/*  (para preview deployments)
  ```
  Si tienes dominio personalizado:
  ```
  https://tu-dominio.com/*
  https://www.tu-dominio.com/*
  ```

**API restrictions:**
- Selecciona **"Restrict key"**
- Marca solo: **"Generative Language API"**

6. Click en **"Save"**

**Esto asegura que tu API key solo funcione desde tu dominio!**

---

## 📝 Checklist Final

### Antes del Deploy:
- [ ] Código subido a Git
- [ ] Build funciona localmente (`npm run build`)
- [ ] Variables de entorno listas (valores anotados)

### En Vercel:
- [ ] Proyecto importado desde Git
- [ ] 7 variables de entorno agregadas
- [ ] Deploy exitoso

### Después del Deploy:
- [ ] Dominio de Vercel agregado en Firebase Authorized domains
- [ ] App funciona correctamente en producción
- [ ] API key de Gemini tiene restricciones de dominio
- [ ] Firestore Rules configuradas

---

## 🎯 Comandos Útiles

### Ver logs de deploy
- En Vercel Dashboard → Tu proyecto → Deployments → Click en un deploy → Logs

### Hacer redeploy
- En Vercel Dashboard → Deployments → Click en "..." → Redeploy
- O simplemente hacer push a Git

### Ver variables de entorno
- Vercel Dashboard → Tu proyecto → Settings → Environment Variables

---

## 🆘 Troubleshooting

### Error: Build failed
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel para ver el error específico

### Error: Variables de entorno no funcionan
- Verifica que agregaste todas las variables en Vercel
- Verifica que están marcadas para "Production"
- Haz un nuevo deploy después de agregar variables

### Error: Firebase no funciona
- Verifica que agregaste el dominio de Vercel en Firebase
- Verifica las configuraciones de Firebase en las variables

### Error: Gemini API no funciona
- Verifica que la API key esté correcta
- Verifica las restricciones de dominio (quítalas temporalmente para probar)

---

## 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Firebase Authorized Domains](https://firebase.google.com/docs/auth/web/domain-verification)
- [Google Cloud API Key Restrictions](https://cloud.google.com/docs/authentication/api-keys)

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu app estará:
- ✅ En producción
- ✅ Con deploy automático desde Git
- ✅ Con preview deployments en PRs
- ✅ Segura y protegida

**¿Tienes preguntas? ¡Sigue la guía paso a paso!**

---

**Última actualización:** 2024  
**Versión:** 1.0

