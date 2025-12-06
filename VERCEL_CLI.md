# 🚀 Guía: Configurar Vercel con CLI

## ✅ Vercel CLI Instalado

Ya instalé Vercel CLI como dependencia del proyecto. Ahora puedes usar comandos para automatizar el proceso.

---

## 🎯 Opción Rápida: Dashboard Web (Recomendado)

**Esta es la forma MÁS FÁCIL:**
1. Push a GitHub: `git push -u origin main`
2. Ve a [vercel.com](https://vercel.com) → Conecta repositorio
3. Agrega variables de entorno
4. Deploy

**Más detalles:** Lee `RESUMEN_FINAL.md`

---

## 🔧 Opción Avanzada: Vercel CLI

Si prefieres usar comandos, sigue estos pasos:

### Paso 1: Autenticarte

```bash
npx vercel login
```

Esto abrirá tu navegador para autenticarte con Vercel.

### Paso 2: Conectar el Proyecto

```bash
npx vercel link
```

Te pedirá:
- Seleccionar tu cuenta de Vercel
- Seleccionar o crear un proyecto
- Seleccionar el scope (tu equipo/personal)

### Paso 3: Agregar Variables de Entorno

Tienes dos opciones:

#### Opción A: Desde la terminal (más rápido)

```bash
# Agregar variable por variable
npx vercel env add VITE_GEMINI_API_KEY production
# (te pedirá el valor - pégalo)

npx vercel env add VITE_FIREBASE_API_KEY production
npx vercel env add VITE_FIREBASE_AUTH_DOMAIN production
npx vercel env add VITE_FIREBASE_PROJECT_ID production
npx vercel env add VITE_FIREBASE_STORAGE_BUCKET production
npx vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production
npx vercel env add VITE_FIREBASE_APP_ID production
```

Para cada variable, te preguntará:
- Value: Pega el valor
- Environments: Selecciona Production, Preview, Development (marca las 3)

#### Opción B: Desde el Dashboard (más fácil)

1. Ve al dashboard de Vercel
2. Tu proyecto → Settings → Environment Variables
3. Agrega cada variable desde ahí (más visual)

### Paso 4: Deploy

```bash
# Deploy a producción
npx vercel --prod

# O deploy de preview
npx vercel
```

---

## 📝 Scripts Agregados

He agregado estos scripts a `package.json`:

```bash
npm run vercel:login      # Autenticarte
npm run vercel:link       # Conectar proyecto
npm run vercel:deploy     # Deploy a producción
npm run vercel:deploy:preview  # Deploy de preview
```

---

## 🚀 Script Automatizado

También creé un script que guía el proceso:

```bash
bash configurar-vercel.sh
```

Este script te guiará paso a paso.

---

## ⚡ Comandos Rápidos

### Todo en uno (si ya estás autenticado):

```bash
# 1. Autenticarte (solo la primera vez)
npx vercel login

# 2. Conectar proyecto (solo la primera vez)
npx vercel link

# 3. Agregar variables (solo la primera vez)
# Usa el dashboard o los comandos de arriba

# 4. Deploy
npx vercel --prod
```

---

## 🆘 Troubleshooting

### Error: "Not authenticated"
```bash
npx vercel login
```

### Error: "No project linked"
```bash
npx vercel link
```

### Verificar configuración
```bash
npx vercel ls
```

---

## 📋 Checklist

```
[ ] npx vercel login
[ ] npx vercel link
[ ] Variables de entorno agregadas (7 variables)
[ ] npx vercel --prod
```

---

## 💡 Mi Recomendación

**Usa el Dashboard Web** porque:
- ✅ Más fácil y visual
- ✅ Puedes ver todo claramente
- ✅ Menos comandos
- ✅ Mejor para principiantes

**Usa CLI si:**
- ✅ Prefieres comandos
- ✅ Quieres automatizar más
- ✅ Tienes experiencia con CLI

---

**¿Qué prefieres? Dashboard o CLI?** Ambos funcionan perfecto. 🚀

