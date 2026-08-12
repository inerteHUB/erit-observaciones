import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UBICACIONES } from '../../constants/ubicaciones';

// TODO: al seleccionar, devolver la ubicación elegida a CrearObservacionScreen
// (por ejemplo vía navigation.navigate('CrearObservacion', { ubicacion: item })).
export default function SelectorUbicacionScreen() {
  const navigation = useNavigation<any>();
  return (
    <FlatList
      data={UBICACIONES}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.row} onPress={() => navigation.goBack()}>
          <Text style={styles.label}>{item.etiqueta}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#E4E7EC' },
  label: { fontSize: 13, color: '#20242B' },
});
