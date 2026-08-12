import { Rol } from '../types';

export const ROLE_LABEL: Record<Rol, string> = {
  gestor: 'Gestor ERIT',
  consultor: 'Consultor de ventas',
  subgerente: 'Subgerente de tienda',
  admin: 'Admin de plataforma',
};

export const ROLE_CAN_EXECUTE: Record<Rol, boolean> = {
  gestor: true,
  consultor: false,
  subgerente: false,
  admin: true,
};
