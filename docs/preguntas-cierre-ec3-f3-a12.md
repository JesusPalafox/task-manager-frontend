# Preguntas de cierre A12
**¿Para qué sirve Vitest?** Prueba funciones y componentes automáticamente.
**¿Qué aporta jsdom?** Simula el DOM sin abrir navegador.
**¿Qué realiza pnpm verify?** Ejecuta lint, test y build en secuencia.
**¿Por qué VITE_API_URL es pública?** Se incorpora en el JavaScript que recibe el navegador.
**¿Por qué necesitamos rewrite SPA?** Para cargar /login y /tasks directamente sin 404 del servidor estático.
**¿Qué cambia entre desarrollo y producción?** En desarrollo el proxy dirige /api a localhost:3000; producción llama al host HTTPS de Backend.
**¿Por qué se revisa CORS?** El navegador solo puede llamar a la API si el origen está permitido.
**¿Qué es la prueba de humo?** Comprobación básica de disponibilidad de sitio, rutas y salud, distinta a pruebas completas de CRUD.
**¿Por qué el tag v1.0.0 espera?** Debe referirse al mismo commit que se probó y desplegó.
