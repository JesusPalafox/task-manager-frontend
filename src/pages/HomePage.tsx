import { Link } from 'react-router';
import { TaskSummary } from '../components/TaskSummary';
import type { Task } from '../models/task.interface';
export function HomePage({ tasks }: { tasks: Task[] }) {
  return <div className="page-stack">
    <section className="panel welcome-panel">
      <p className="section-heading__eyebrow">Inicio</p>
      <h2>Bienvenido al administrador de tareas</h2>
      <p>Organiza tus actividades, consulta tus avances y controla sus estados.</p>
      <Link className="button-link" to="/tasks">Ir a mis tareas</Link>
    </section>
    <TaskSummary tasks={tasks} />
  </div>;
}
