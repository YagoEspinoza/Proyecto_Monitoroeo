# Manual de despliegue en hosting compartido

Alternativa **sin Docker** para publicar únicamente el build estático del frontend Angular.

---

## Cuándo usar esta opción

| Escenario | Adecuado |
|-----------|----------|
| Demo académica / Taller | Sí |
| SOC interno con pocos usuarios | Sí, con limitaciones |
| Producción SOC con tiempo real y API | **No recomendado** (usar Docker + VPS) |

---

## Requisitos del hosting

- Soporte de archivos estáticos (HTML, JS, CSS)
- HTTPS (Let's Encrypt vía panel o cPanel)
- Posibilidad de subir carpeta o FTP/SFTP
- Reglas de reescritura para SPA (Apache `.htaccess` o nginx del proveedor)

**No requiere** Node.js en el servidor para el frontend compilado.

---

## Pasos de despliegue

### 1. Generar build de producción

```bash
npm install
npm run build
```

Contenido a subir: `dist/my-monitoreo/browser/`

### 2. Subir archivos

Subir **todo el contenido** de `browser/` a `public_html/` o subcarpeta (`/netguard/`).

### 3. Configurar SPA fallback

**Apache (.htaccess):**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Sin esto, rutas como `/vision-general` devolverán 404 al refrescar.

### 4. Variables de API

En hosting compartido **no** se recompila fácilmente por entorno. Opciones:

- Build local con `environment.ts` apuntando a API pública
- **Futuro:** archivo `config.json` cargado en runtime

---

## Limitaciones importantes

| Limitación | Impacto |
|------------|---------|
| Sin WebSocket nativo en algunos planes | Alertas en tiempo real degradadas a polling |
| Sin procesos Node.js | Backend debe estar en **otro servidor** (VPS, cloud) |
| CORS | Configurar API para permitir origen del hosting |
| Recursos compartidos | No apto para alta concurrencia SOC |
| Simulación GNS3/VMware | Requiere red/lab externo, no el hosting web |
| SonarQube / CI | Se ejecutan en desarrollo, no en el hosting |

---

## Arquitectura recomendada híbrida

```
[Hosting compartido]  →  Angular estático (HTTPS)
         ↓ API HTTPS
[VPS / Cloud]         →  Node.js API + WebSocket + DB
[Laboratorio]         →  GNS3 / VMware
```

---

## Seguridad mínima

- Forzar HTTPS
- Cabeceras: `Content-Security-Policy`, `X-Frame-Options: DENY`
- No subir `.env`, claves ni `node_modules`
- Rotar credenciales de FTP

---

## Verificación post-despliegue

| Check | Esperado |
|-------|----------|
| `/login` carga | Formulario visible |
| Login y redirect | Dashboard accesible |
| Refresh en `/alertas` | No 404 |
| Consola del navegador | Sin errores críticos de assets |

---

## Alternativa recomendada para producción

Usar [manual-despliegue-docker.md](./manual-despliegue-docker.md) en VPS o cloud con reverse proxy y API en el mismo stack o red privada.
