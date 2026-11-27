const raw = import.meta.env.VITE_API_URL?.trim();
if (!raw) throw new Error('Falta la variable VITE_API_URL.');
export const API_URL = raw.replace(/\/+$/, '');
