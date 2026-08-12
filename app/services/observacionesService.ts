import {
  collection, addDoc, updateDoc, doc, onSnapshot, query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Observacion, NuevaObservacionInput } from '../types';

const COLLECTION = 'observaciones';

// Escucha en tiempo real: cuando un gestor toma una observación, todos los
// demás dispositivos la ven actualizada al instante (RF-12).
export function subscribeToObservaciones(callback: (obs: Observacion[]) => void) {
  const q = query(collection(db, COLLECTION), orderBy('fecha_creacion', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Observacion, 'id'>) }));
    callback(items);
  });
}

export async function crearObservacion(input: NuevaObservacionInput) {
  await addDoc(collection(db, COLLECTION), {
    ...input,
    estado: 'pendiente',
    asignado_a: null,
    fecha_creacion: serverTimestamp(),
    fecha_asignacion: null,
    fecha_resolucion: null,
    evidencia_url: null,
  });
}

export async function tomarObservacion(observacionId: string, usuarioId: string, usuarioNombre: string) {
  await updateDoc(doc(db, COLLECTION, observacionId), {
    estado: 'proceso',
    asignado_a: usuarioId,
    asignado_a_nombre: usuarioNombre,
    fecha_asignacion: serverTimestamp(),
  });
}

export async function resolverObservacion(observacionId: string, evidenciaUrl: string) {
  await updateDoc(doc(db, COLLECTION, observacionId), {
    estado: 'resuelta',
    evidencia_url: evidenciaUrl,
    fecha_resolucion: serverTimestamp(),
  });
}
