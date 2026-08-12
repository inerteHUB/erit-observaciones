// Llama a la Cloud Function `loginWithQR` (ver Arquitectura Técnica, sección 5)
// que valida el código QR y devuelve un custom token de Firebase Auth.
import { signInWithCustomToken, signOut } from 'firebase/auth';
import { auth } from './firebase';

// TODO: reemplazar por la URL real una vez desplegada la Cloud Function
const CLOUD_FUNCTION_URL = 'https://REGION-TU_PROYECTO.cloudfunctions.net/loginWithQR';

export async function loginWithQrCode(qrCode: string) {
  const response = await fetch(CLOUD_FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qrCode }),
  });
  if (!response.ok) {
    throw new Error('QR no reconocido. Verifica que esté registrado.');
  }
  const { token } = await response.json();
  await signInWithCustomToken(auth, token);
}

export async function logout() {
  await signOut(auth);
}
