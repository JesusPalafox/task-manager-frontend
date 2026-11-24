# Preguntas de cierre - EC2 F1 A5

## 1. ¿Qué problema resuelve React al construir una interfaz?

React permite construir la interfaz dividiéndola en piezas pequeñas y reutilizables llamadas componentes, en lugar de tener un solo documento HTML enorme y repetir código. Cada componente describe cómo se ve una parte de la pantalla a partir de los datos que recibe. Así, en el Administrador de tareas, si necesito mostrar tres tareas no escribo tres veces el mismo bloque de HTML: uso tres veces `TaskItem` con datos distintos. Además, cuando los datos cambien (en actividades posteriores), React se encarga de actualizar solo las partes de la pantalla que lo necesitan.

## 2. ¿Qué es un componente?

Un componente es una función de JavaScript/TypeScript que devuelve una parte de la interfaz escrita en TSX. Por ejemplo, `AppHeader` es una función que devuelve el encabezado de la aplicación con el título y la descripción. Un componente representa algo identificable de la interfaz, puede recibir datos mediante propiedades y puede usarse dentro de otros componentes.

## 3. ¿Por qué los componentes comienzan con mayúscula?

Porque así React distingue un componente de una etiqueta HTML normal. Si escribo `<div>` o `<header>` (minúscula), React entiende que es una etiqueta del navegador. Si escribo `<TaskForm />` (mayúscula), entiende que debe llamar a la función `TaskForm` y mostrar lo que devuelve. Por eso los nombres siguen el formato PascalCase, como `TaskSummary` o `TaskItem`.

## 4. ¿Qué diferencia existe entre HTML y TSX?

TSX es una sintaxis parecida a HTML que se escribe dentro de TypeScript y que se convierte en código JavaScript al compilar. Se parece a HTML, pero tiene diferencias: se usa `className` en lugar de `class`, `htmlFor` en lugar de `for`, las etiquetas sin contenido se deben cerrar (`<input />`), y se pueden insertar valores o expresiones entre llaves, como `{title}` o `{total}`. Además, TypeScript revisa el código TSX y detecta errores antes de ejecutar la aplicación.

## 5. ¿Para qué se utiliza className?

Se utiliza para asignar clases de CSS a un elemento. En JSX/TSX no se puede usar `class` porque es una palabra reservada de JavaScript, así que React usa `className`. En el proyecto lo uso, por ejemplo, en `<article className="summary-card">` para aplicar los estilos de `index.css`, y en `TaskItem` con una plantilla de texto, `` className={`task-item task-item--${status}`} ``, para que cada tarea tenga una clase distinta según esté pendiente o completada.

## 6. ¿Qué son las propiedades o props?

Son los datos que un componente padre le envía a un componente hijo, parecidos a los argumentos de una función. Se escriben como atributos al usar el componente. Por ejemplo, `<TaskItem title="Configurar el proyecto React" status="completed" />` le pasa dos props al componente `TaskItem`, y `<TaskSummary total={3} pending={2} completed={1} />` le pasa tres números. Con ellas, el mismo componente puede mostrar información diferente.

## 7. ¿Cómo ayuda TypeScript a validar las propiedades?

TypeScript permite declarar qué propiedades recibe un componente y de qué tipo es cada una, por ejemplo con `interface TaskSummaryProps { total: number; pending: number; completed: number; }`. Si desde `App` enviara una cadena donde se espera un número, o escribiera un estado que no existe en el tipo unión `'pending' | 'completed'`, el editor y la compilación mostrarían un error antes de ejecutar la aplicación. Así se evitan errores por datos mal enviados y se tiene autocompletado.

## 8. ¿Cuál es la responsabilidad de App.tsx?

`App.tsx` es el componente principal y funciona como coordinador de la estructura general. No dibuja los detalles de cada parte; se encarga de reunir y ordenar los componentes (`AppHeader`, `TaskForm`, `TaskFilters`, `TaskSummary`, `TaskList` y el pie de página) y de enviarles los datos que necesitan, como los números del resumen. Esto es lo que se llama composición.

## 9. ¿Por qué la interfaz se dividió en varios componentes?

Porque cada componente tiene una sola responsabilidad: el encabezado, el formulario, los filtros, el resumen, la lista y cada tarea. Esto hace el código más fácil de leer, de corregir y de reutilizar, y permite que, en las siguientes actividades, cada parte reciba su propio comportamiento sin tener que modificar todo el archivo. Si hubiera dejado todo en `App.tsx`, el archivo sería muy largo y difícil de mantener.

## 10. ¿Por qué los botones todavía están deshabilitados?

Porque en esta actividad solo se construye la estructura visual. Todavía no se usan estado (`useState`) ni eventos, que son lo que permite que un botón haga algo (agregar, editar, cambiar estado o eliminar una tarea). Por eso los botones llevan el atributo `disabled` y el formulario avisa que se activará en una actividad posterior; así no parece que funcionen cuando todavía no lo hacen.

## 11. ¿Qué componente consideras más reutilizable y por qué?

`TaskItem`, porque representa una tarea completa y se puede usar tantas veces como haga falta enviándole un título y un estado distintos. En `TaskList` se reutiliza tres veces con datos diferentes y el mismo componente muestra una tarea completada o pendiente con su estilo correspondiente. Más adelante podrá usarse con un arreglo de tareas.

## 12. ¿Qué dificultad encontraste y cómo la resolviste?

<!-- Esta pregunta es sobre tu experiencia personal: escribe qué problema te encontraste de verdad
     (por ejemplo: un componente que no aparecía por no importarlo en App, usar class en lugar de className,
     un error de TypeScript por una prop con tipo incorrecto, estilos que no cargaban por no importar
     styles/index.css en main.tsx) y cómo lo resolviste. -->

Escribe aquí tu respuesta.
