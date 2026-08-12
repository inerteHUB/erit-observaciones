import { Prioridad, Rol } from '../types';

export const CATEGORIAS = [
  { id: 'precio', nombre: 'Precio / Cartel', icono: '🏷️', prioridad_base: 'normal' as Prioridad },
  { id: 'exhibicion', nombre: 'Exhibición', icono: '🧱', prioridad_base: 'normal' as Prioridad },
  { id: 'seguridad', nombre: 'Seguridad', icono: '⚠️', prioridad_base: 'urgente' as Prioridad },
  { id: 'reposicion', nombre: 'Reposición', icono: '📦', prioridad_base: 'normal' as Prioridad },
  { id: 'otro', nombre: 'Otro', icono: '✏️', prioridad_base: 'baja' as Prioridad },
];

// Combina la categoría con el rol de quien reporta (ver Acta / Requerimientos RF-07).
// Un Subgerente o Admin eleva la prioridad sugerida un nivel.
export function sugerirPrioridad(prioridadBase: Prioridad, rol: Rol): Prioridad {
  const orden: Prioridad[] = ['baja', 'normal', 'urgente'];
  let idx = orden.indexOf(prioridadBase);
  if (rol === 'subgerente' || rol === 'admin') {
    idx = Math.min(idx + 1, 2);
  }
  return orden[idx];
}
