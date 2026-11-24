# EC2 F3 A8 — preguntas y conceptos para la explicación

- **¿Qué es estado principal?** `tasks` se modifica al crear, editar o eliminar.
- **¿Qué es dato derivado?** `visibleTasks` se calcula a partir de tasks y los criterios; no se guarda duplicado.
- **¿Por qué usar filter?** Construye un arreglo nuevo con las tareas coincidentes.
- **¿Por qué copiar antes de sort?** Porque sort muta su arreglo; `[...filteredTasks]` evita mutar el estado.
- **¿Para qué sirve localStorage?** Guarda las tareas por origen en el navegador para conservarlas tras recargar.
- **¿Qué hace JSON.stringify?** Convierte Task[] en texto JSON.
- **¿Qué hace JSON.parse?** Devuelve un valor desconocido que se valida antes de usarlo.
- **¿Qué hace useEffect?** Sincroniza el arreglo de tareas con almacenamiento después de cada cambio.
- **¿Por qué validar al crear y editar?** Para aplicar una sola regla de 3 a 120 caracteres.
- **¿Por qué ARIA?** Comunica a tecnologías de asistencia qué campo es inválido y cuál mensaje lo explica.

## Pruebas pendientes de ejecución

1. Título vacío, dos caracteres y válido.
2. Editar, cancelar y guardar.
3. Buscar mayúsculas y espacios.
4. Alternar filtros y ordenar.
5. Crear, completar y eliminar, luego recargar.
6. Introducir JSON inválido en `task-manager.tasks` y verificar el respaldo.
7. Ejecutar `pnpm lint` y `pnpm build`.

No se anotan resultados ni capturas ficticias.
