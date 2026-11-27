# EC3 F2 A10 — consumo remoto

La fuente de verdad cambia de localStorage a MongoDB a través de Fetch API.
VITE_API_URL=/api pasa por el proxy de Vite a Express en http://localhost:3000.
http.service.ts maneja JSON, errores HTTP y DELETE 204.
task-api.service.ts reúne GET, POST, PATCH y DELETE.
AbortController evita que búsquedas anteriores sobrescriban resultados posteriores.
meta permite paginar según datos reales del Backend.

**Continuidad con Backend A12:** las rutas ya requieren Bearer JWT.
Se incluye acceso temporal para comprobar la integración; la autenticación completa se desarrollará en Frontend A11.

## Por verificar en Windows/VS Code
- pnpm install, pnpm lint, pnpm build.
- API en puerto 3000, React en puerto 5173.
- Crear, editar, completar, filtrar, paginar, consultar detalle, refrescar.
- Eliminar solo con rol admin (el Backend también debe devolver 403 para user).
- Probar error de red y botón Reintentar.
