# Frontend A12 — despliegue
- Rama: `ec3-a12-pruebas-despliegue`
- Repositorio: https://github.com/JesusPalafox/task-manager-frontend
- Sitio estático propuesto: `task-manager-frontend-jpala`
- API existente: https://task-api-express-jpala.onrender.com
- VITE_API_URL en Render: `https://task-api-express-jpala.onrender.com/api`
- CORS_ORIGIN en Backend: origen exacto HTTPS que Render asigne al nuevo Frontend; sin /api ni barra final
- `render.yaml` publica `dist` y reescribe rutas SPA.
No incluir JWT, contraseñas o URI de MongoDB.
