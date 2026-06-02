# My Monitoreo

Plataforma SOC para monitoreo de red con frontend Angular y API de reportes en Node.js + MongoDB.

## Estructura del repositorio

```
my-monitoreo/
├── frontend/          # Aplicación Angular (NetGuard SOC)
├── backend/           # API REST de reportes (Express + Mongoose)
├── documentacion/     # Manuales, fases y reglas del proyecto
└── README.md
```

## Requisitos

- Node.js 20+
- MongoDB 6+ (solo para el módulo de reportes)
- npm

## Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

Abrir [http://localhost:4200](http://localhost:4200).

El módulo **Reportes** consume `http://localhost:3000/api/reports` en desarrollo.

## Backend (reportes)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Variables en `.env`:

| Variable       | Descripción                          |
|----------------|--------------------------------------|
| `PORT`         | Puerto HTTP (default `3000`)       |
| `MONGODB_URI`  | Cadena de conexión MongoDB           |
| `FRONTEND_URL` | Origen CORS (default `http://localhost:4200`) |

### Endpoints

| Método | Ruta                    | Descripción        |
|--------|-------------------------|--------------------|
| GET    | `/api/reports`          | Listar con filtros |
| GET    | `/api/reports/:id`      | Detalle            |
| POST   | `/api/reports`          | Crear              |
| PUT    | `/api/reports/:id`      | Actualizar         |
| DELETE | `/api/reports/:id`      | Eliminar           |
| GET    | `/api/reports/:id/pdf`  | Descargar PDF      |
| GET    | `/health`               | Estado del servicio |

## Desarrollo conjunto

1. Iniciar MongoDB local.
2. `cd backend && npm run dev`
3. `cd frontend && ng serve`
4. Iniciar sesión en la app y abrir **Reportes**.

Si MongoDB o el backend no están disponibles, la vista muestra un aviso y mantiene las exportaciones mock existentes.

## Calidad

- Frontend: `cd frontend && npm run test:ci`
- Backend: `cd backend && npm run lint`

SonarQube: ver `frontend/sonar-project.properties`.

## Documentación

Ver carpeta [documentacion/](documentacion/README.md).
