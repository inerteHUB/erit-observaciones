import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// TODO: portar desde el prototipo HTML — selector de categoría con sugerencia
// de prioridad (sugerirPrioridad en constants/categorias.ts), navegación a
// SelectorUbicacionScreen, adjuntar foto opcional, y llamada a crearObservacion().
export default function CrearObservacionScreen() {
  const navigation = useNavigation<any>();
  const [descripcion, setDescripcion] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Describe lo que observaste"
      />
      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Cancelar (formulario en construcción)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 12, fontWeight: '700', color: '#343B44', marginBottom: 8 },
  input: { borderWidth: 1.5, borderColor: '#E4E7EC', borderRadius: 11, padding: 12, height: 90, textAlignVertical: 'top' },
  btn: { marginTop: 20, backgroundColor: '#F1F3F6', borderRadius: 11, padding: 14, alignItems: 'center' },
  btnText: { color: '#343B44', fontWeight: '700' },
});
