# Preguntas de cierre - EC2 F1 A6

## 1. ¿Qué función cumple la interfaz Task?

La interfaz `Task` es el modelo o contrato de una tarea: define qué propiedades debe tener cualquier objeto tarea y de qué tipo es cada una (`id`, `title`, `status`, `createdAt` y `updatedAt`). Con ella TypeScript avisa si a un objeto le falta una propiedad o si tiene un tipo incorrecto. Además, sirve como base común para todos los componentes (`TaskItem`, `TaskList`, `TaskSummary`) y es compatible con lo que más adelante responderá la API REST.

## 2. ¿Qué diferencia existe entre Task y TaskStatus?

`Task` es una interfaz que describe un objeto completo con varias propiedades. `TaskStatus` es un tipo unión (`'pending' | 'completed'`) que limita los valores posibles de una sola propiedad: el estado. De hecho, `Task` usa `TaskStatus` para su propiedad `status`. Así no se puede escribir un estado inválido como `'done'` o `'Pendiente'` sin que TypeScript marque el error.

## 3. ¿Qué significa declarar un arreglo como Task[]?

Significa que es un arreglo en el que todos los elementos deben cumplir con la interfaz `Task`. En `src/data/tasks.ts`, `export const tasks: Task[]` obliga a que cada una de las cinco tareas tenga todas sus propiedades con el tipo correcto. Si quito el `id` de una tarea, TypeScript muestra un error. También permite que los métodos como `map` y `filter` sepan que cada elemento es una `Task`.

## 4. ¿Qué hace el método map?

`map` recorre un arreglo y crea un arreglo nuevo con un resultado por cada elemento, sin modificar el original. En React se usa para convertir datos en componentes: por cada objeto de la colección se produce un elemento visual.

## 5. ¿Qué resultado produce map dentro de TaskList?

Produce un arreglo de elementos `<TaskItem />`, uno por cada tarea de `tasks`. React toma ese arreglo y lo muestra como una lista de tarjetas en pantalla. Con las cinco tareas del proyecto se generan cinco `TaskItem`, y si el arreglo tuviera más o menos elementos, la lista se ajustaría sola sin cambiar el código del componente.

## 6. ¿Para qué utiliza React la propiedad key?

React usa `key` para identificar qué elemento visual corresponde a cada objeto de la lista. Gracias a eso, cuando la colección cambia (se agrega, se elimina o se reordena una tarea), React puede actualizar solo lo necesario en lugar de reconstruir todo y evita errores de correspondencia. `key` es interna de React: `TaskItem` no la recibe como propiedad.

## 7. ¿Por qué se utiliza task.id y no el índice?

Porque `task.id` es un identificador estable y único de cada tarea, que acompaña al dato aunque cambie su posición. Si usara el índice y se eliminara o reordenara una tarea, los índices cambiarían y React podría asociar el elemento visual a la tarea equivocada. Tampoco se debe usar `Math.random()`, porque generaría una clave distinta en cada renderizado y obligaría a React a recrear todo.

## 8. ¿Cómo se envía una tarea de TaskList a TaskItem?

Mediante una propiedad (prop). Dentro del `map`, cada objeto se pasa completo con `<TaskItem key={task.id} task={task} />`. `TaskItem` declara en `TaskItemProps` que recibe `task: Task`, y luego la desestructura para obtener `title`, `status` y `updatedAt`.

## 9. ¿Cómo se comunican App, TaskSummary y TaskList?

Con un flujo de datos unidireccional, del padre hacia los hijos. `App` importa la colección `tasks` desde `data/tasks.ts` y se la envía por props a los dos componentes: `<TaskSummary tasks={tasks} />` y `<TaskList tasks={tasks} />`. Los hijos no se comunican entre sí ni modifican los datos; solo los reciben y los muestran. Los datos van así: `tasks.ts` → `App` → `TaskList` → `TaskItem`, y `tasks.ts` → `App` → `TaskSummary`.

## 10. ¿Qué es el renderizado condicional?

Es mostrar una parte distinta de la interfaz según una condición. En `TaskList` se usa un operador ternario: si `tasks.length === 0`, se muestra el mensaje "No hay tareas registradas" dentro de `empty-state`; si no, se muestra la lista de tarjetas con `map`. Así la pantalla no queda vacía ni confusa cuando no hay datos.

## 11. ¿Por qué el resumen se calcula a partir de la colección?

Porque el total, los pendientes y los completados son datos derivados: se pueden obtener de `tasks`. El total sale de `tasks.length`, las completadas de `tasks.filter(...).length` y las pendientes son la resta. Si escribiera los números a mano (como en la actividad 5), habría que acordarse de actualizarlos cada vez que cambie una tarea y podrían quedar mal. Calculándolos, siempre coinciden con los datos.

## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?

<!-- Esta pregunta es sobre tu experiencia personal: escribe qué problema te encontraste de verdad
     (por ejemplo: una advertencia de key en la consola, un error al importar Task por una ruta incorrecta,
     tasks.map no es una función, el resumen con valores incorrectos, etc.) y cómo lo resolviste. -->

Escribe aquí tu respuesta.
