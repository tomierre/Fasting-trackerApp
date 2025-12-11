# 🚀 Deployment

Guía para desplegar Fasting Tracker en producción.

## Opciones de Deployment

### Vercel (Recomendado)

Vercel ofrece deployment automático desde GitHub con excelente soporte para aplicaciones React.

**Ventajas**:
- Deploy automático desde Git
- SSL automático
- CDN global
- Preview deployments en PRs
- Plan gratuito generoso

**Pasos**:
1. Conectar repositorio en Vercel
2. Configurar variables de entorno
3. Deploy automático

### Firebase Hosting

Alternativa si prefieres mantener todo en el ecosistema Firebase.

**Ventajas**:
- Integración nativa con Firebase
- SSL automático
- CDN global

**Pasos**:
1. Instalar Firebase CLI
2. Configurar proyecto
3. Deploy con `firebase deploy`

### Netlify

Otra opción popular para aplicaciones React.

**Ventajas**:
- Similar a Vercel
- Deploy automático
- SSL automático

## Pre-deployment Checklist

Antes de hacer deploy, verifica:

- [ ] Build funciona sin errores (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] Firebase configurado correctamente
- [ ] Firestore Rules configuradas
- [ ] Dominios autorizados en Firebase
- [ ] Service Worker funcionando
- [ ] PWA instalable

## Configuración de Variables de Entorno

En producción, configura estas variables en tu plataforma de hosting:

- Variables de Firebase (6 variables)
- Variable de Gemini API

**Importante**: No incluyas valores reales en el código fuente.

## Configuración de Firebase

### Authorized Domains

Agrega tu dominio de producción en:
Firebase Console → Authentication → Settings → Authorized domains

### Firestore Rules

Asegúrate de tener reglas de seguridad configuradas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Post-deployment

Después del deploy:

1. Verifica que la app carga correctamente
2. Prueba autenticación
3. Prueba todas las funcionalidades
4. Verifica PWA instalable
5. Prueba modo offline

## Monitoreo

Considera configurar:

- Error tracking (Sentry, etc.)
- Analytics (Firebase Analytics)
- Performance monitoring
- Uptime monitoring

---

**¿Necesitas más detalles?** Consulta las guías específicas de cada plataforma en la documentación del proyecto.

