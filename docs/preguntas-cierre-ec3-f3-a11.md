# EC3 F3 A11 — Autenticación y sesión
La autenticación determina quién es un usuario y la autorización qué operación puede realizar.
React Context comparte usuario y token mediante AuthProvider y useAuth. sessionStorage guarda solo accessToken.
GET /auth/me restaura la identidad al recargar. ProtectedRoute conserva la ruta y redirige a /login.
401 invalida la sesión local; 403 no la invalida porque se trata de permisos.
El Backend comprueba JWT y rol admin para DELETE, aunque la interfaz oculte el botón.
Cerrar sesión solo quita el token local, no revoca el JWT en el servidor.

## Evidencias por confirmar
pnpm lint, pnpm build, registro, login, F5, logout, 401, 403, navegación y CRUD A10.
No compartir contraseñas, token ni .env.local.
