import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Tamaños necesarios para los iconos
const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const iconsDir = path.join(__dirname, '..', 'public', 'icons')

// Crear directorio si no existe
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

// SVG template para cada tamaño
function generateIconSVG(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4f46e5;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Fondo circular -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#bg${size})"/>
  
  <!-- Anillo exterior -->
  <circle cx="${size/2}" cy="${size/2}" r="${size*0.39}" fill="none" stroke="rgba(129, 140, 248, 0.3)" stroke-width="${size*0.03}"/>
  
  <!-- Anillo de progreso -->
  <circle 
    cx="${size/2}" 
    cy="${size/2}" 
    r="${size*0.31}" 
    fill="none" 
    stroke="#ffffff" 
    stroke-width="${size*0.04}" 
    stroke-linecap="round"
    stroke-dasharray="${size*0.31*2*Math.PI}"
    stroke-dashoffset="${size*0.31*Math.PI}"
    transform="rotate(-90 ${size/2} ${size/2})"
    opacity="0.9"
  />
  
  <!-- Círculo interno -->
  <circle cx="${size/2}" cy="${size/2}" r="${size*0.23}" fill="none" stroke="rgba(255, 255, 255, 0.4)" stroke-width="${size*0.006}"/>
  
  <!-- Manecilla de horas -->
  <line x1="${size/2}" y1="${size/2}" x2="${size/2}" y2="${size/2 - size*0.14}" stroke="#ffffff" stroke-width="${size*0.016}" stroke-linecap="round" opacity="0.9"/>
  
  <!-- Manecilla de minutos -->
  <line x1="${size/2}" y1="${size/2}" x2="${size/2 + size*0.09}" y2="${size/2}" stroke="#ffffff" stroke-width="${size*0.012}" stroke-linecap="round" opacity="0.9"/>
  
  <!-- Centro del reloj -->
  <circle cx="${size/2}" cy="${size/2}" r="${size*0.023}" fill="#ffffff" opacity="0.9"/>
</svg>`
}

console.log('📦 Generando iconos SVG base...')

sizes.forEach(size => {
  const svg = generateIconSVG(size)
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`)
  fs.writeFileSync(svgPath, svg)
  console.log(`✅ Creado: icon-${size}x${size}.svg`)
})

console.log('\n📝 Nota: Los archivos SVG se han creado.')
console.log('💡 Para convertirlos a PNG, puedes:')
console.log('   1. Abrir scripts/generate-icons.html en tu navegador')
console.log('   2. Usar una herramienta online como https://convertio.co/es/svg-png/')
console.log('   3. O usar ImageMagick: convert icon.svg -resize 192x192 icon-192x192.png')

