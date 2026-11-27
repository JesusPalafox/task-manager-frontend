import type { ApiDataResponse, TaskListQuery, TaskListResponse } from '../models/api.types';
import type { Task, UpdateTaskInput } from '../models/task.interface';
import { http } from './http.service';
function taskPath(id: string) { return '/tasks/' + encodeURIComponent(id); }
export function getTasks(query: TaskListQuery, token: string, signal?: AbortSignal) {
  const params = new URLSearchParams({
    page: String(query.page), limit: String(query.limit),
    sortBy: query.sortBy, order: query.order,
  });
  if (query.search?.trim()) params.set('search', query.search.trim());
  if (query.status) params.set('status', query.status);
  return http<TaskListResponse>('/tasks?' + params.toString(), token, { signal });
}
export async function getTaskById(id: string, token: string, signal?: AbortSignal): Promise<Task> {
  return (await http<ApiDataResponse<Task>>(taskPath(id), token, { signal })).data;
}
export async function createTask(title: string, token: string): Promise<Task> {
  return (await http<ApiDataResponse<Task>>('/tasks', token, {
    method: 'POST', body: { title },
  })).data;
}
export async function patchTask(id: string, changes: UpdateTaskInput, token: string): Promise<Task> {
  return (await http<ApiDataResponse<Task>>(taskPath(id), token, {
    method: 'PATCH', body: changes,
  })).data;
}
export async function deleteTask(id: string, token: string): Promise<void> {
  return http<void>(taskPath(id), token, { method: 'DELETE' });
}
