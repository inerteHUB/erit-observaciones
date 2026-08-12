import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Usuario } from '../types';

export async function getUsuarioById(uid: string): Promise<Usuario | null> {
  const ref = doc(db, 'usuarios', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Usuario, 'id'>) };
}
