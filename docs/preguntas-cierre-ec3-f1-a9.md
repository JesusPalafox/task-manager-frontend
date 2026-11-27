# EC3 F1 A9 — Navegación React Router

- BrowserRouter envuelve App una sola vez en main.tsx.
- Routes / Route relacionan cada dirección con una página.
- Outlet muestra la ruta hija dentro de AppLayout.
- NavLink resalta la sección activa; Link navega sin recargar.
- useParams recupera taskId del segmento dinámico.
- useNavigate regresa a /tasks después de eliminar con replace.
- Se conservan las tareas y filtros de A8 mediante el estado en App.
- Las tareas continúan en localStorage hasta la actividad 10.

## Evidencia pendiente de comprobar en VS Code
1. Ejecutar pnpm install, pnpm lint, pnpm build.
2. Visitar /, /tasks, /tasks/:taskId y una ruta desconocida.
3. Probar Atrás / Adelante, recarga y eliminación desde detalle.
