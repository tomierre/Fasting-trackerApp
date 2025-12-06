#!/bin/bash

# Script para subir el código a GitHub
# Ejecuta: bash PUSH_TO_GITHUB.sh

echo "🚀 Preparando para subir a GitHub..."
echo ""

cd /Users/nicolasriquelme/Fasting-web

echo "📦 Agregando archivos..."
git add .

echo "💾 Haciendo commit..."
git commit -m "Initial commit: Fasting Tracker PWA ready for production" || echo "No hay cambios nuevos para commitear"

echo "🌿 Configurando rama main..."
git branch -M main

echo "🔗 Configurando repositorio remoto..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/tomierre/Fasting-trackerApp.git

echo ""
echo "✅ Todo listo!"
echo ""
echo "📤 Ahora necesitas hacer push manualmente con:"
echo "   git push -u origin main"
echo ""
echo "⚠️  Si el repositorio ya tiene contenido, primero haz:"
echo "   git pull origin main --allow-unrelated-histories"
echo "   (resuelve conflictos si los hay)"
echo "   git push -u origin main"

