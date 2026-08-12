// Cloud Function: loginWithQR
// Valida un código QR contra la colección `usuarios` y devuelve un custom
// token de Firebase Auth. Ver Arquitectura Técnica, sección 5.
//
// Despliegue: firebase deploy --only functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.loginWithQR = functions.https.onRequest(async (req, res) => {
  const { qrCode } = req.body;

  if (!qrCode) {
    res.status(400).json({ error: 'Falta el código QR.' });
    return;
  }

  const snapshot = await admin
    .firestore()
    .collection('usuarios')
    .where('qr_code', '==', qrCode)
    .where('activo', '==', true)
    .limit(1)
    .get();

  if (snapshot.empty) {
    res.status(404).json({ error: 'QR no reconocido o usuario inactivo.' });
    return;
  }

  const usuarioDoc = snapshot.docs[0];
  const token = await admin.auth().createCustomToken(usuarioDoc.id);

  res.status(200).json({ token });
});
