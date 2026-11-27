import { TaskForm } from '../components/TaskForm';
import { TaskFilters } from '../components/TaskFilters';
import { TaskSummary } from '../components/TaskSummary';
import { TaskList } from '../components/TaskList';
import type { Task } from '../models/task.interface';
import type { PageMeta } from '../models/api.types';
import type { TaskFilter, TaskSort } from '../models/task-view.types';
interface Props {
  tasks: Task[]; query: string; filter: TaskFilter; sortBy: TaskSort;
  meta: PageMeta | null; loading: boolean; error: string; canDelete: boolean;
  onAddTask: (title: string) => Promise<boolean>;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: TaskFilter) => void;
  onSortChange: (value: TaskSort) => void;
  onClearCriteria: () => void;
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => Promise<boolean>;
  onDeleteTask: (id: string) => Promise<boolean>;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}
export function TasksPage(props: Props) {
  return <div className="page-stack">
    <h2 className="page-title">Mis tareas · API REST</h2>
    <TaskForm onAddTask={props.onAddTask} />
    <TaskFilters query={props.query} filter={props.filter} sortBy={props.sortBy}
      resultCount={props.meta?.total ?? props.tasks.length}
      onQueryChange={props.onQueryChange} onFilterChange={props.onFilterChange}
      onSortChange={props.onSortChange} onClear={props.onClearCriteria} />
    <TaskSummary tasks={props.tasks} />
    {props.loading && <p className="remote-message" role="status">Consultando tareas en MongoDB…</p>}
    {props.error && <div className="remote-message" role="alert">
      {props.error} <button type="button" onClick={props.onRetry}>Reintentar</button>
    </div>}
    {!props.error && <TaskList
      tasks={props.tasks}
      emptyMessage="No hay tareas que coincidan con los criterios."
      onToggleStatus={props.onToggleStatus} onEditTask={props.onEditTask}
      onDeleteTask={props.onDeleteTask} canDelete={props.canDelete}
    />}
    {props.meta && <div className="panel remote-controls">
      <span>Página {props.meta.page} de {Math.max(1, props.meta.totalPages)} · {props.meta.total} tareas</span>
      <button disabled={props.loading || !props.meta.hasPreviousPage}
        onClick={() => props.onPageChange(props.meta!.page - 1)}>Anterior</button>
      <button disabled={props.loading || !props.meta.hasNextPage}
        onClick={() => props.onPageChange(props.meta!.page + 1)}>Siguiente</button>
    </div>}
  </div>;
}
