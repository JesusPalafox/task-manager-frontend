import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import type { Task } from '../models/task.interface';
import { deleteTask, getTaskById } from '../services/task-api.service';
import { HttpError } from '../services/http.service';
import { formatTaskDate } from '../utils/date';
import { NotFoundPage } from './NotFoundPage';

interface Props { token: string; canDelete: boolean; onDeleted: () => void }
export function TaskDetailPage({ token, canDelete, onDeleted }: Props) {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (!taskId) { setNotFound(true); setLoading(false); return; }
    const controller = new AbortController();
    setTask(null); setNotFound(false); setError(''); setLoading(true);
    void getTaskById(taskId, token, controller.signal).then(result => {
      if (!controller.signal.aborted) setTask(result);
    }).catch(reason => {
      if (controller.signal.aborted) return;
      if (reason instanceof HttpError && (reason.status === 404 || reason.status === 422))
        setNotFound(true);
      else setError(reason instanceof Error ? reason.message : 'No se pudo consultar el detalle.');
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [taskId, token, retry]);

  async function removeTask() {
    if (!task || !canDelete || !window.confirm('¿Eliminar esta tarea?')) return;
    try {
      await deleteTask(task.id, token);
      onDeleted();
      navigate('/tasks', { replace: true });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No se pudo eliminar la tarea.');
    }
  }
  if (loading) return <section className="panel">Consultando detalle de la tarea…</section>;
  if (notFound) return <NotFoundPage title="Tarea no encontrada"
    message="No existe una tarea con ese identificador en MongoDB." />;
  if (error) return <section className="panel" role="alert"><p>{error}</p>
    <button onClick={() => setRetry(v => v + 1)}>Reintentar</button></section>;
  if (!task) return null;
  return <section className="panel task-detail">
    <p className="section-heading__eyebrow">Detalle remoto</p>
    <h2>{task.title}</h2>
    <dl><dt>ID</dt><dd>{task.id}</dd>
      <dt>Estado</dt><dd>{task.status === 'completed' ? 'Completada' : 'Pendiente'}</dd>
      <dt>Creación</dt><dd>{formatTaskDate(task.createdAt)}</dd>
      <dt>Última actualización</dt><dd>{formatTaskDate(task.updatedAt)}</dd></dl>
    <div className="detail-actions">
      <Link className="button-link" to="/tasks">Volver</Link>
      {canDelete && <button className="button-danger" type="button"
        onClick={() => { void removeTask(); }}>Eliminar tarea</button>}
    </div>
  </section>;
}
