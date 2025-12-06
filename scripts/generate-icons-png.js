import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const iconsDir = path.join(__dirname, '..', 'public', 'icons')
const baseSVG = path.join(__dirname, '..', 'public', 'icon-base.svg')

// SVG como string (definido directamente)
const iconSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4f46e5;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <circle cx="256" cy="256" r="256" fill="url(#bgGradient)"/>
  
  <circle cx="256" cy="256" r="200" fill="none" stroke="rgba(129, 140, 248, 0.3)" stroke-width="16"/>
  <circle cx="256" cy="256" r="180" fill="none" stroke="rgba(129, 140, 248, 0.5)" stroke-width="12"/>
  
  <circle 
    cx="256" 
    cy="256" 
    r="160" 
    fill="none" 
    stroke="#ffffff" 
    stroke-width="20" 
    stroke-linecap="round"
    stroke-dasharray="502.65"
    stroke-dashoffset="251.325"
    transform="rotate(-90 256 256)"
    opacity="0.9"
  />
  
  <circle cx="256" cy="256" r="120" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.4"/>
  
  <line x1="256" y1="256" x2="256" y2="200" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
  <line x1="256" y1="256" x2="300" y2="256" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.9"/>
  
  <circle cx="256" cy="256" r="12" fill="#ffffff" opacity="0.9"/>
</svg>`

async function generateIcons() {
  console.log('🎨 Generando iconos PNG para PWA...\n')

  // Asegurar que el directorio existe
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true })
  }

  for (const size of sizes) {
    try {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`)
      
      await sharp(Buffer.from(iconSVG))
        .resize(size, size)
        .png()
        .toFile(outputPath)
      
      console.log(`✅ Creado: icon-${size}x${size}.png`)
    } catch (error) {
      console.error(`❌ Error creando icon-${size}x${size}.png:`, error.message)
    }
  }

  console.log('\n✨ ¡Todos los iconos han sido generados!')
  console.log(`📂 Ubicación: ${iconsDir}`)
}

generateIcons().catch(console.error)

