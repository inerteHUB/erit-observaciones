import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Observacion } from '../types';
import PriorityTag from './PriorityTag';
import StatusBadge from './StatusBadge';

export default function ObservacionCard({
  observacion,
  onPress,
}: {
  observacion: Observacion;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <PriorityTag prioridad={observacion.prioridad} />
      </View>
      <StatusBadge estado={observacion.estado} />
      <Text style={styles.title}>
        {observacion.categoria_icono} {observacion.descripcion}
      </Text>
      <Text style={styles.meta}>{observacion.ubicacion_etiqueta}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 13, padding: 12, borderWidth: 1, borderColor: '#E4E7EC' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 13.5, fontWeight: '700', marginTop: 10, color: '#20242B' },
  meta: { fontSize: 11.5, color: '#636B76', marginTop: 3 },
});
