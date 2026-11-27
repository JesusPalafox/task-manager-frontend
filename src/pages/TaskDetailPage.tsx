import { Link, useNavigate, useParams } from 'react-router';
import type { Task } from '../models/task.interface';
import { formatTaskDate } from '../utils/date';
import { NotFoundPage } from './NotFoundPage';
interface Props { tasks: Task[]; onDeleteTask: (id: string) => boolean }
export function TaskDetailPage({ tasks, onDeleteTask }: Props) {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const task = tasks.find(item => item.id === taskId);
  if (!task) return <NotFoundPage title="Tarea no encontrada"
    message="No existe una tarea con ese identificador." />;
  return <section className="panel task-detail">
    <p className="section-heading__eyebrow">Detalle de tarea</p>
    <h2>{task.title}</h2>
    <dl>
      <dt>ID</dt><dd>{task.id}</dd>
      <dt>Estado</dt><dd>{task.status === 'completed' ? 'Completada' : 'Pendiente'}</dd>
      <dt>Creación</dt><dd>{formatTaskDate(task.createdAt)}</dd>
      <dt>Última actualización</dt><dd>{formatTaskDate(task.updatedAt)}</dd>
    </dl>
    <div className="detail-actions">
      <Link className="button-link" to="/tasks">Volver a tareas</Link>
      <button className="button-danger" type="button" onClick={() => {
        if (onDeleteTask(task.id)) navigate('/tasks', { replace: true });
      }}>Eliminar tarea</button>
    </div>
  </section>;
}
