export type Rol = 'gestor' | 'consultor' | 'subgerente' | 'admin';

export type Estado = 'pendiente' | 'proceso' | 'resuelta';

export type Prioridad = 'baja' | 'normal' | 'urgente';

export interface Usuario {
  id: string;
  nombre: string;
  qr_code: string;
  rol_id: Rol;
  tienda_id: string;
  activo: boolean;
}

export interface Observacion {
  id: string;
  categoria_id: string;
  categoria_icono: string;
  ubicacion_id: string;
  ubicacion_etiqueta: string;
  descripcion: string;
  prioridad: Prioridad;
  estado: Estado;
  creado_por: string;
  creado_por_nombre: string;
  asignado_a: string | null;
  asignado_a_nombre?: string | null;
  fecha_creacion: any;
  fecha_asignacion: any;
  fecha_resolucion: any;
  evidencia_url: string | null;
  tienda_id: string;
}

export interface NuevaObservacionInput {
  categoria_id: string;
  categoria_icono: string;
  ubicacion_id: string;
  ubicacion_etiqueta: string;
  descripcion: string;
  prioridad: Prioridad;
  creado_por: string;
  creado_por_nombre: string;
  tienda_id: string;
}
