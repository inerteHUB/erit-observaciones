import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: reemplazar con la configuración real de tu proyecto de Firebase
// (Configuración del proyecto → General → tus apps → SDK setup and configuration)
const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_PROYECTO.firebaseapp.com',
  projectId: 'TU_PROYECTO',
  storageBucket: 'TU_PROYECTO.appspot.com',
  messagingSenderId: 'TU_SENDER_ID',
  appId: 'TU_APP_ID',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// experimentalForceLongPolling evita problemas de conexión en algunos emuladores Android
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });
export const storage = getStorage(app);
