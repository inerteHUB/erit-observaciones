const PASILLOS = Array.from({ length: 32 }, (_, i) => ({
  id: `pasillo_${i + 1}`,
  tipo: 'pasillo' as const,
  etiqueta: `Pasillo ${i + 1}`,
}));

const LATERALES = [
  { id: 'lateral_33', tipo: 'lateral' as const, etiqueta: 'Pasillo 33 — lateral' },
  { id: 'lateral_34', tipo: 'lateral' as const, etiqueta: 'Pasillo 34 — lateral' },
];

const ZONAS = [
  { id: 'rumas', tipo: 'zona' as const, etiqueta: 'Rumas — pasillo central' },
  { id: 'tendencia', tipo: 'zona' as const, etiqueta: 'Tendencia' },
  { id: 'cajas', tipo: 'zona' as const, etiqueta: 'Cajas' },
  { id: 'checkout', tipo: 'zona' as const, etiqueta: 'Checkout' },
  { id: 'fila_unica', tipo: 'zona' as const, etiqueta: 'Fila única' },
  { id: 'showroom_interno', tipo: 'zona' as const, etiqueta: 'Showroom interno' },
  { id: 'showroom_externo', tipo: 'zona' as const, etiqueta: 'Showroom externo' },
  { id: 'tarimas', tipo: 'zona' as const, etiqueta: 'Tarimas' },
];

export const UBICACIONES = [...PASILLOS, ...LATERALES, ...ZONAS];
