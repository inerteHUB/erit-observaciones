import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

// TODO: portar desde el prototipo HTML — línea de tiempo, botón de
// tomar/resolver (tomarObservacion / resolverObservacion), y el visor de
// evidencia ampliable (lightbox).
export default function DetalleObservacionScreen() {
  const route = useRoute<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalle de la observación {route.params?.id}</Text>
      <Text style={styles.todo}>Pantalla en construcción — portar desde el prototipo HTML.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  text: { fontSize: 14, fontWeight: '700', color: '#20242B' },
  todo: { fontSize: 12, color: '#9AA1AB', marginTop: 8 },
});
