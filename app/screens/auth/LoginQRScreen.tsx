import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { loginWithQrCode } from '../../services/authService';

export default function LoginQRScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission]);

  async function handleScan({ data }: { data: string }) {
    if (scanning) return;
    setScanning(true);
    try {
      await loginWithQrCode(data);
      // La navegación cambia sola: App.tsx observa el estado de sesión.
    } catch (err: any) {
      Alert.alert('No se pudo ingresar', err.message ?? 'QR no reconocido');
      setScanning(false);
    }
  }

  if (!permission || !permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.hint}>Se necesita acceso a la cámara para escanear tu QR.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ERIT Observaciones</Text>
      <Text style={styles.subtitle}>Escanea tu QR de colaborador para ingresar</Text>
      <View style={styles.viewfinder}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={scanning ? undefined : handleScan}
        />
      </View>
      {scanning && (
        <View style={styles.loadingRow}>
          <ActivityIndicator color="#EA5B1E" />
          <Text style={styles.hint}>Verificando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#14171C', alignItems: 'center', justifyContent: 'center', padding: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#14171C' },
  title: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#9BA0A8', fontSize: 13, marginBottom: 24, textAlign: 'center' },
  viewfinder: { width: 240, height: 240, borderRadius: 16, overflow: 'hidden', borderWidth: 2, borderColor: '#EA5B1E' },
  loadingRow: { flexDirection: 'row', gap: 8, marginTop: 20, alignItems: 'center' },
  hint: { color: '#9BA0A8', fontSize: 12 },
});
