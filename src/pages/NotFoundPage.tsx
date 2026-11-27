import { Link } from 'react-router';
export function NotFoundPage({ title = 'Página no encontrada',
  message = 'La dirección que intentaste abrir no existe.' }:
  { title?: string; message?: string }) {
  return <section className="panel not-found" role="status">
    <h2>{title}</h2><p>{message}</p>
    <Link className="button-link" to="/">Regresar al inicio</Link>
  </section>;
}
