export function formatTaskDate(date: string): string {
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(new Date(date));
}
