#!/bin/bash

# Script para configurar y hacer deploy en Vercel
# Ejecuta: bash configurar-vercel.sh

echo "🚀 Configurando Vercel..."
echo ""

cd /Users/nicolasriquelme/Fasting-web

# Verificar que Vercel CLI esté instalado
if ! command -v npx vercel &> /dev/null; then
    echo "📦 Vercel CLI no encontrado. Instalando..."
    npm install --save-dev vercel
fi

echo "🔐 Paso 1: Autenticación en Vercel"
echo "   Esto abrirá tu navegador..."
npx vercel login

echo ""
echo "🔗 Paso 2: Conectar proyecto"
echo "   Sigue las instrucciones en pantalla..."
npx vercel link

echo ""
echo "📝 Paso 3: Agregar variables de entorno"
echo ""
echo "   Necesitas agregar estas 7 variables:"
echo "   1. VITE_GEMINI_API_KEY"
echo "   2. VITE_FIREBASE_API_KEY"
echo "   3. VITE_FIREBASE_AUTH_DOMAIN"
echo "   4. VITE_FIREBASE_PROJECT_ID"
echo "   5. VITE_FIREBASE_STORAGE_BUCKET"
echo "   6. VITE_FIREBASE_MESSAGING_SENDER_ID"
echo "   7. VITE_FIREBASE_APP_ID"
echo ""
echo "   Ejecuta estos comandos (reemplaza los valores):"
echo ""
echo "   npx vercel env add VITE_GEMINI_API_KEY production"
echo "   npx vercel env add VITE_FIREBASE_API_KEY production"
echo "   npx vercel env add VITE_FIREBASE_AUTH_DOMAIN production"
echo "   npx vercel env add VITE_FIREBASE_PROJECT_ID production"
echo "   npx vercel env add VITE_FIREBASE_STORAGE_BUCKET production"
echo "   npx vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID production"
echo "   npx vercel env add VITE_FIREBASE_APP_ID production"
echo ""
echo "   O agrégalas desde el dashboard de Vercel (más fácil)"
echo ""

read -p "¿Quieres hacer deploy ahora? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Haciendo deploy a producción..."
    npx vercel --prod
fi

echo ""
echo "✅ ¡Listo!"

