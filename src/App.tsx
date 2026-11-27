import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { AppLayout } from './layouts/AppLayout';
import { useAuth } from './context/useAuth';
import type { Task } from './models/task.interface';
import type { PageMeta, TaskListQuery } from './models/api.types';
import type { TaskFilter, TaskSort } from './models/task-view.types';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TaskDetailPage } from './pages/TaskDetailPage';
import { TasksPage } from './pages/TasksPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicOnlyRoute } from './routes/PublicOnlyRoute';
import { createTask, deleteTask, getTasks, patchTask } from './services/task-api.service';

const INITIAL_PAGE_SIZE = 5;

export default function App() {
  const { token, user, status } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<TaskSort>('updated-desc');
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || status !== 'authenticated' || !user) return;
    const controller = new AbortController();
    const sort: Pick<TaskListQuery, 'sortBy' | 'order'> =
      sortBy === 'title-asc' ? { sortBy: 'title', order: 'asc' }
        : sortBy === 'created-desc' ? { sortBy: 'createdAt', order: 'desc' }
          : { sortBy: 'updatedAt', order: 'desc' };

    setLoading(true);
    void getTasks({
      page, limit: INITIAL_PAGE_SIZE, ...sort,
      ...(query.trim() ? { search: query.trim() } : {}),
      ...(filter === 'all' ? {} : { status: filter }),
    }, token, controller.signal).then(response => {
      if (!controller.signal.aborted) {
        setTasks(response.data);
        setMeta(response.meta);
        setError('');
      }
    }).catch(reason => {
      if (controller.signal.aborted) return;
      setError(reason instanceof Error ? reason.message : 'Error al consultar tareas.');
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });

    return () => controller.abort();
  }, [token, user, status, query, filter, sortBy, page, revision]);

  function clearCriteria() {
    setQuery('');
    setFilter('all');
    setSortBy('updated-desc');
    setPage(1);
  }

  function reload() {
    setRevision(current => current + 1);
  }

  async function mutate(callback: () => Promise<unknown>): Promise<boolean> {
    setError('');
    try {
      await callback();
      reload();
      return true;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No fue posible guardar los cambios.');
      return false;
    }
  }

  function handleAddTask(title: string): Promise<boolean> {
    if (!token || status !== 'authenticated') return Promise.resolve(false);
    return mutate(() => createTask(title, token));
  }

  function handleEditTask(id: string, title: string): Promise<boolean> {
    if (!token || status !== 'authenticated') return Promise.resolve(false);
    return mutate(() => patchTask(id, { title }, token));
  }

  function handleToggleStatus(id: string): void {
    const selected = tasks.find(task => task.id === id);
    if (!selected || !token || status !== 'authenticated') return;
    void mutate(() => patchTask(id, {
      status: selected.status === 'pending' ? 'completed' : 'pending',
    }, token));
  }

  function handleDeleteTask(id: string): Promise<boolean> {
    if (!token || status !== 'authenticated' || user?.role !== 'admin') return Promise.resolve(false);
    const selected = tasks.find(task => task.id === id);
    if (!window.confirm('¿Eliminar la tarea ' + (selected?.title ?? id) + '?')) {
      return Promise.resolve(false);
    }
    return mutate(() => deleteTask(id, token));
  }

  return <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<HomePage tasks={status === 'authenticated' ? tasks : []} />} />
      <Route element={<PublicOnlyRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="tasks" element={<TasksPage
          tasks={tasks} query={query} filter={filter} sortBy={sortBy}
          meta={meta} loading={loading} error={error}
          canDelete={user?.role === 'admin'}
          onAddTask={handleAddTask}
          onQueryChange={value => { setQuery(value); setPage(1); }}
          onFilterChange={value => { setFilter(value); setPage(1); }}
          onSortChange={value => { setSortBy(value); setPage(1); }}
          onClearCriteria={clearCriteria}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onPageChange={setPage}
          onRetry={reload}
        />} />
        <Route path="tasks/:taskId" element={token ? <TaskDetailPage
          token={token} canDelete={user?.role === 'admin'} onDeleted={reload}
        /> : null} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>;
}
