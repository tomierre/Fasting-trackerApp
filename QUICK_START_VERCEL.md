# ⚡ Quick Start: Deploy en Vercel (5 minutos)

## 🚀 Pasos Rápidos

### 1️⃣ Preparar Código en Git

```bash
# Si aún no tienes Git inicializado:
git init
git add .
git commit -m "Ready for Vercel"

# Subir a GitHub (o crea el repo primero en github.com):
git remote add origin https://github.com/TU_USUARIO/fasting-web.git
git push -u origin main
```

### 2️⃣ Conectar en Vercel

1. Ve a [vercel.com](https://vercel.com) y inicia sesión (con GitHub es más fácil)
2. Click en **"Add New..."** → **"Project"**
3. Busca tu repositorio `fasting-web`
4. Click en **"Import"**

### 3️⃣ Configurar Variables de Entorno

**ANTES de hacer deploy**, en la página de configuración:

1. Scroll hacia abajo hasta **"Environment Variables"**
2. Agrega estas 7 variables (una por una):

| Key | Value (ejemplo) | Environments |
|-----|----------------|--------------|
| `VITE_GEMINI_API_KEY` | `reemplazar_aqui_con_tu_api_key_de_gemini` | ✅ Todas |
| `VITE_FIREBASE_API_KEY` | `reemplazar_aqui_con_tu_firebase_api_key` | ✅ Todas |
| `VITE_FIREBASE_AUTH_DOMAIN` | `reemplazar_aqui_con_tu_dominio.firebaseapp.com` | ✅ Todas |
| `VITE_FIREBASE_PROJECT_ID` | `reemplazar_aqui_con_tu_project_id` | ✅ Todas |
| `VITE_FIREBASE_STORAGE_BUCKET` | `reemplazar_aqui_con_tu_storage_bucket` | ✅ Todas |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `reemplazar_aqui_con_tu_sender_id` | ✅ Todas |
| `VITE_FIREBASE_APP_ID` | `reemplazar_aqui_con_tu_app_id` | ✅ Todas |

**Cómo agregar cada una:**
- Key: El nombre (ej: `VITE_GEMINI_API_KEY`)
- Value: El valor real (copia de tu `.env` local)
- Environments: Marca las 3 (Production, Preview, Development)
- Click en **"Add"**

### 4️⃣ Hacer Deploy

1. Click en **"Deploy"**
2. Espera 1-2 minutos
3. ¡Listo! 🎉 Tu app estará en: `https://tu-proyecto.vercel.app`

### 5️⃣ Configurar Firebase

Después del deploy, agrega tu dominio de Vercel en Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Tu proyecto → **Authentication** → **Settings** → **Authorized domains**
3. Click en **"Add domain"**
4. Agrega: `tu-proyecto.vercel.app` (tu URL de Vercel)
5. También agrega: `*.vercel.app` (para preview deployments)

### 6️⃣ Proteger API Key de Gemini (Recomendado)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. **API & Services** → **Credentials**
3. Selecciona tu API Key de Gemini
4. En **"Application restrictions"**: Selecciona **"HTTP referrers"**
5. Agrega:
   ```
   https://tu-proyecto.vercel.app/*
   https://*.vercel.app/*
   ```
6. En **"API restrictions"**: Marca solo **"Generative Language API"**
7. Save

---

## ✅ Checklist Rápido

- [ ] Código en Git
- [ ] Proyecto conectado en Vercel
- [ ] 7 variables de entorno agregadas
- [ ] Deploy exitoso
- [ ] Dominio agregado en Firebase
- [ ] App funciona en producción

---

## 🆘 Problemas Comunes

**"Build failed"**
→ Verifica que `npm run build` funcione localmente

**"Variables no funcionan"**
→ Verifica que agregaste todas y están marcadas para Production

**"Firebase Auth no funciona"**
→ Agrega el dominio de Vercel en Firebase Authorized domains

---

**¿Necesitas más detalles?** Revisa `VERCEL_SETUP.md` para la guía completa.

