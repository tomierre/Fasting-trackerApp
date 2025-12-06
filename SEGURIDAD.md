# 🔒 Seguridad y Variables de Entorno

## ⚠️ IMPORTANTE: Entender las Variables VITE_*

### ¿Qué son las variables `VITE_*`?

Las variables que empiezan con `VITE_` son **especiales en Vite**: se inyectan en el código del cliente (navegador) durante el build. Esto significa que:

- ✅ Están **incluidas en el bundle JavaScript** que se envía al navegador
- ⚠️ **Cualquiera puede verlas** inspeccionando el código fuente del sitio
- ⚠️ **No son secretos reales** - están expuestas al público

### ¿Por qué usar `VITE_*` entonces?

Las usamos porque son necesarias para que la aplicación funcione en el navegador:
- Firebase necesita sus configuraciones para inicializarse
- Gemini API necesita la clave para hacer las llamadas desde el cliente

---

## 📁 ¿Qué Archivos NO se Suben a Git?

### ✅ Archivos Protegidos (en `.gitignore`)

Los siguientes archivos **NUNCA** se suben al repositorio Git:

```
.env                    # Tu archivo local con las API keys
.env.local              # Variables locales
.env.production.local   # Variables de producción local
node_modules/           # Dependencias (muy pesadas)
dist/                   # Build de producción
```

**Confirmación**: Revisa tu `.gitignore` - ya está configurado correctamente ✅

### ⚠️ Archivos que SÍ se Suben (pero son seguros)

Estos archivos sí se suben al repo, pero **NO contienen secretos reales**:

- `env.template` - Solo un template con valores de ejemplo
- `ENV_SETUP.md` - Documentación con ejemplos
- El código fuente que usa las variables (pero no los valores reales)

---

## 🔐 Seguridad por Tipo de Variable

### 1. Firebase Config (VITE_FIREBASE_*)

**Estado**: ✅ **Diseñado para ser público**

Las configuraciones de Firebase **están diseñadas** para ser públicas. Son seguras porque:

1. **Reglas de Seguridad**: La seguridad real está en Firestore Security Rules
2. **Autenticación**: Firebase Auth maneja la seguridad
3. **Restricciones de Dominio**: Puedes restringir en Firebase Console qué dominios pueden usar tu API key

**Qué hacer:**
- ✅ Puedes ponerlas en el código sin problema
- ✅ Configura restricciones de dominio en Firebase Console
- ✅ Usa Firestore Security Rules para proteger los datos

### 2. Gemini API Key (VITE_GEMINI_API_KEY)

**Estado**: ⚠️ **Sensible pero manejable**

La clave de Gemini **será visible** en el código del cliente, pero puedes protegerla:

**Opciones de Seguridad:**

#### Opción A: Restricciones de Dominio (Recomendado) ✅

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. API & Services → Credentials
3. Selecciona tu API Key de Gemini
4. En "Application restrictions":
   - Selecciona "HTTP referrers (web sites)"
   - Agrega tu dominio de producción: `https://tu-dominio.vercel.app/*`
   - Agrega dominios de desarrollo si necesitas: `http://localhost:*`
5. En "API restrictions":
   - Selecciona "Restrict key"
   - Marca solo "Generative Language API"

**Ventajas:**
- ✅ Solo tu dominio puede usar la API key
- ✅ Si alguien roba la key, no funcionará en otros sitios

#### Opción B: Proxy Backend (Más Seguro pero Más Complejo)

Crear un endpoint en tu servidor que haga las llamadas a Gemini:
- El cliente llama a tu servidor
- Tu servidor llama a Gemini con la API key (privada)
- La API key nunca está en el cliente

**Desventaja:** Requiere un backend (Vercel Functions, Cloud Functions, etc.)

---

## 🚀 Configuración en Vercel

### Variables de Entorno en Vercel Dashboard

Cuando configures Vercel, **NO subirás** las variables de entorno al código. En su lugar:

1. Vas al dashboard de Vercel
2. Settings → Environment Variables
3. Agregas cada variable manualmente (con valores reales)
4. Vercel las inyecta durante el build

**Esto es seguro porque:**
- ✅ Las variables están encriptadas en el servidor de Vercel
- ✅ Solo tú y tu equipo pueden verlas
- ✅ Se inyectan durante el build, no están en el código fuente

---

## 📋 Checklist de Seguridad

### Antes de Subir a Git:

- [ ] Verificar que `.env` esté en `.gitignore` ✅ (Ya está)
- [ ] Verificar que no hay API keys hardcodeadas en el código
- [ ] Verificar que solo usas `env.template` como ejemplo

### En Vercel:

- [ ] Configurar todas las variables de entorno en el dashboard
- [ ] No subir valores reales en el código
- [ ] Usar diferentes valores para desarrollo/preview/producción

### Después del Deploy:

- [ ] Configurar restricciones de dominio en Google Cloud Console (Gemini)
- [ ] Verificar Firestore Security Rules
- [ ] Configurar dominios autorizados en Firebase Console
- [ ] Revisar que las API keys tengan restricciones apropiadas

---

## 🔍 Verificación: ¿Qué Puede Ver el Público?

### Lo que SÍ pueden ver (y está bien):

```javascript
// En el bundle JavaScript del navegador verán:
const firebaseConfig = {
  apiKey: "AIzaSyCDZrw28v4Zb_kVFLQLjcMKgLNgs1h9GJw",  // ✅ Público por diseño
  authDomain: "fastingpro-app.firebaseapp.com",        // ✅ Público
  projectId: "fastingpro-app",                         // ✅ Público
  // ...
}

const geminiKey = "tu-api-key-de-gemini"  // ⚠️ Visible, pero con restricciones
```

### Lo que NO pueden ver (y está protegido):

- ❌ Las reglas de seguridad de Firestore (ejecutadas en el servidor)
- ❌ Las credenciales de autenticación de usuarios (manejadas por Firebase)
- ❌ Los datos personales (protegidos por Firestore Rules)

---

## 🛡️ Mejores Prácticas

### ✅ Hacer:

1. **Usar Firestore Security Rules** para proteger datos
   ```javascript
   // Solo el usuario puede ver sus propios datos
   match /users/{userId} {
     allow read, write: if request.auth.uid == userId;
   }
   ```

2. **Configurar restricciones de dominio** en Google Cloud Console

3. **Usar variables de entorno** en Vercel (no hardcodear)

4. **Revisar regularmente** quién tiene acceso a las API keys

5. **Rotar API keys** si sospechas que fueron comprometidas

### ❌ NO Hacer:

1. ❌ Subir archivos `.env` al repositorio Git
2. ❌ Hardcodear API keys en el código fuente
3. ❌ Usar la misma API key sin restricciones
4. ❌ Compartir API keys en screenshots o mensajes
5. ❌ Asumir que las variables VITE_* son secretas

---

## 🎯 Resumen para Tu Proyecto

### Lo que Ya Está Bien:

1. ✅ `.env` está en `.gitignore` - no se subirá
2. ✅ Usas variables de entorno correctamente
3. ✅ Firebase config está diseñado para ser público

### Lo que Necesitas Hacer:

1. **En Vercel:**
   - Agregar todas las variables de entorno en el dashboard
   - No poner valores reales en el código

2. **En Google Cloud Console:**
   - Configurar restricciones de dominio para Gemini API key
   - Limitar a solo tu dominio de producción

3. **En Firebase Console:**
   - Verificar que las Firestore Rules estén configuradas
   - Agregar tu dominio de Vercel a "Authorized domains"

---

## 📚 Recursos Adicionales

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Google Cloud API Key Restrictions](https://cloud.google.com/docs/authentication/api-keys)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ❓ Preguntas Frecuentes

### ¿Es seguro tener la API key de Gemini en el cliente?

**Respuesta corta:** Sí, con restricciones de dominio.

**Explicación:** La API key será visible en el código del cliente, pero si configuras restricciones de dominio en Google Cloud Console, solo funcionará desde tu dominio. Si alguien la roba, no podrá usarla desde otro sitio.

### ¿Las configuraciones de Firebase son seguras?

**Sí.** Firebase está diseñado para tener configuraciones públicas. La seguridad real está en:
- Firestore Security Rules
- Firebase Authentication
- Restricciones de dominio en Firebase Console

### ¿Qué pasa si subo accidentalmente un archivo .env?

Si ya lo subiste:
1. Rota todas las API keys inmediatamente
2. Usa `git rm --cached .env` para removerlo del historial
3. O mejor: crea nuevas API keys

Si aún no lo subiste:
- Verifica que `.env` esté en `.gitignore` ✅ (Ya está)

---

**Última actualización:** 2024  
**Versión:** 1.0

