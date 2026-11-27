import { TaskForm } from '../components/TaskForm';
import { TaskFilters } from '../components/TaskFilters';
import { TaskSummary } from '../components/TaskSummary';
import { TaskList } from '../components/TaskList';
import type { Task } from '../models/task.interface';
import type { TaskFilter, TaskSort } from '../models/task-view.types';
interface Props {
  tasks: Task[];
  visibleTasks: Task[];
  query: string;
  filter: TaskFilter;
  sortBy: TaskSort;
  emptyMessage: string;
  onAddTask: (title: string) => void;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: TaskFilter) => void;
  onSortChange: (value: TaskSort) => void;
  onClearCriteria: () => void;
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => boolean;
}
export function TasksPage(props: Props) {
  return <div className="page-stack">
    <h2 className="page-title">Mis tareas</h2>
    <TaskForm onAddTask={props.onAddTask} />
    <TaskFilters
      query={props.query} filter={props.filter} sortBy={props.sortBy}
      resultCount={props.visibleTasks.length}
      onQueryChange={props.onQueryChange}
      onFilterChange={props.onFilterChange} onSortChange={props.onSortChange}
      onClear={props.onClearCriteria}
    />
    <TaskSummary tasks={props.tasks} />
    <TaskList tasks={props.visibleTasks} emptyMessage={props.emptyMessage}
      onToggleStatus={props.onToggleStatus} onEditTask={props.onEditTask}
      onDeleteTask={props.onDeleteTask}
    />
  </div>;
}
