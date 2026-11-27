# Administrador de tareas — Frontend
React, TypeScript, Vite y React Router. Consume API Express protegida por JWT.
## Local
`pnpm install`; crea `.env.local` con `VITE_API_URL=/api`; inicia Backend en localhost:3000 y `pnpm dev`.
## Verificar
`pnpm verify` ejecuta oxlint, nueve pruebas Vitest y build.
`pnpm preview` muestra dist. `pnpm smoke:production` comprueba el despliegue.
## Render
Blueprint `render.yaml` publica dist y solicita `VITE_API_URL`, que debe ser https://task-api-express-jpala.onrender.com/api .
Configurar Backend CORS_ORIGIN según la URL real del sitio.
No subir tokens, JWT_SECRET, contraseñas ni MONGODB_URI.
