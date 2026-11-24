# Preguntas de cierre - EC2 F2 A7

## 1. ¿Qué diferencia existe entre una variable local y el estado de React?

Una variable local ordinaria se vuelve a crear cada vez que el componente se ejecuta, así que pierde su valor entre renderizados, y cambiarla no le avisa a React que debe actualizar la pantalla. El estado de React (`useState`) sí se conserva entre renderizados y, cuando se modifica con su función, React vuelve a renderizar el componente para mostrar el nuevo valor. Por eso la lista de tareas se guarda en el estado de `App`: al agregar una tarea la pantalla se actualiza sola.

## 2. ¿Qué valores devuelve useState?

Devuelve un arreglo con dos elementos: el valor actual del estado y una función para solicitar el siguiente valor. En el proyecto, `const [tasks, setTasks] = useState<Task[]>(...)` me da la colección actual (`tasks`) y la función para cambiarla (`setTasks`). El valor que se pasa a `useState` es el estado inicial; en `App` es una copia de las cinco tareas de `data/tasks.ts`.

## 3. ¿Por qué useState se declara en el nivel superior del componente?

Porque React identifica cada estado por el orden en que se llaman los Hooks en cada renderizado. Si un Hook se llamara dentro de un `if`, un ciclo o una función anidada, el orden podría cambiar entre renderizados y React asociaría los valores a los estados equivocados. Por eso `useState` se escribe siempre al principio del cuerpo del componente, antes de cualquier condición.

## 4. ¿Qué significa que un campo sea controlado?

Que su valor lo controla React mediante el estado, en lugar de guardarlo el propio navegador. El campo recibe `value={title}` (el estado) y `onChange={(event) => setTitle(event.target.value)}` para actualizar ese estado con cada tecla. Así el estado y lo que se ve en el campo siempre coinciden, y se puede, por ejemplo, limpiar el campo con `setTitle('')`, contar los caracteres o deshabilitar el botón si el título está vacío.

## 5. ¿Por qué handleSubmit utiliza preventDefault?

Porque el comportamiento normal de un formulario HTML es enviarse y recargar la página, lo que haría perder el estado de la aplicación. `event.preventDefault()` cancela ese comportamiento por defecto para que React maneje el envío con JavaScript: validar el título, llamar a `onAddTask` y limpiar el campo, sin recargar nada.

## 6. ¿Cómo comunica TaskForm una nueva tarea a App?

Mediante una función recibida por props. `App` define `handleAddTask` y se la envía a `TaskForm` como `onAddTask`. Cuando el usuario envía el formulario, `TaskForm` llama a `onAddTask(normalizedTitle)` con el título. `TaskForm` solo avisa qué ocurrió; `App` decide cómo crear la tarea y actualizar el estado. Así los datos viajan hacia abajo (props) y los eventos hacia arriba (funciones).

## 7. ¿Por qué App funciona como fuente de verdad?

Porque la colección de tareas se guarda una sola vez, en el estado de `App`, y de ahí se reparte a los demás componentes. `TaskSummary` y `TaskList` reciben el mismo arreglo `tasks`, por lo que el resumen y la lista siempre coinciden y no hay que sincronizar copias duplicadas. Cualquier cambio pasa por `App`, y React vuelve a renderizar a los hijos con los datos nuevos.

## 8. ¿Cómo se implementa Create sin utilizar push?

Creando un arreglo nuevo con el operador spread. En `handleAddTask` se construye `newTask` (con `crypto.randomUUID()` como id, estado `pending` y las fechas) y luego se llama `setTasks((currentTasks) => [newTask, ...currentTasks])`. Esto no modifica el arreglo anterior: crea uno nuevo con la tarea al principio, y React detecta el cambio porque es un arreglo distinto. `push` mutaría el arreglo existente y React podría no darse cuenta del cambio.

## 9. ¿Cómo permite map actualizar una sola tarea?

`map` recorre todas las tareas y devuelve un arreglo nuevo. En `handleToggleStatus` y `handleEditTask`, para cada tarea se compara su `id` con el seleccionado: si no coincide, se devuelve la misma tarea sin cambios; si coincide, se devuelve una copia (`{ ...task, status/title, updatedAt }`) con los datos nuevos. El resultado es un arreglo en el que solo cambió el objeto seleccionado y el resto sigue igual.

## 10. ¿Cómo utiliza filter la operación Delete?

`filter` crea un arreglo nuevo con los elementos que cumplen una condición. En `handleDeleteTask`, después de que el usuario confirma, se llama `setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))`, es decir, se conservan todas las tareas cuyo `id` es distinto del que se quiere eliminar. La tarea seleccionada queda fuera del nuevo arreglo, sin usar `splice` ni modificar el original.

## 11. ¿Por qué se emplea una función actualizadora en setTasks?

Porque el siguiente estado depende del estado anterior. Con `setTasks((currentTasks) => ...)`, React entrega a la función el estado pendiente más reciente, de modo que el cambio se aplica sobre los datos correctos aunque haya varias actualizaciones seguidas. Si usara directamente la variable `tasks` del renderizado actual, podría trabajar con un valor desactualizado y perder cambios.

## 12. ¿Qué información conserva TaskItem como estado local?

Solo información temporal de la edición: `isEditing`, que indica si la tarjeta está en modo edición, y `draftTitle`, el borrador del título que el usuario va escribiendo. La colección de tareas no está ahí: sigue en `App`. Al guardar, `TaskItem` llama a `onEditTask`; al cancelar, restaura `draftTitle` con el título original y sale del modo edición sin tocar la tarea.

## 13. ¿Por qué los cambios desaparecen al recargar la página?

Porque el estado de React vive solo en la memoria de la página abierta. Al recargar, el navegador vuelve a cargar y ejecutar la aplicación desde cero, y `useState` se inicializa otra vez con las cinco tareas de `data/tasks.ts`. Todavía no se usa `localStorage` ni la API REST, que son los que permitirían conservar los datos; esto se hará en actividades posteriores.

## 14. ¿Qué dificultad encontraste y cómo la resolviste?

<!-- Esta pregunta es sobre tu experiencia personal: escribe qué problema te encontraste de verdad
     (por ejemplo: el formulario recargaba la página por falta de preventDefault, el botón actuaba al renderizar
     por llamar la función con paréntesis, todas las tareas cambiaban por no comparar el id, etc.)
     y cómo lo resolviste. -->

Escribe aquí tu respuesta.
