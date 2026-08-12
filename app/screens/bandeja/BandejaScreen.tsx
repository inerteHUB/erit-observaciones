import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { subscribeToObservaciones } from '../../services/observacionesService';
import { Observacion } from '../../types';
import ObservacionCard from '../../components/ObservacionCard';

export default function BandejaScreen() {
  const navigation = useNavigation<any>();
  const [observaciones, setObservaciones] = useState<Observacion[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'urgente' | 'normal' | 'baja'>('todas');

  useEffect(() => {
    const unsubscribe = subscribeToObservaciones(setObservaciones);
    return unsubscribe;
  }, []);

  const lista = filtro === 'todas' ? observaciones : observaciones.filter((o) => o.prioridad === filtro);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bandeja de observaciones</Text>
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CrearObservacion')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ObservacionCard
            observacion={item}
            onPress={() => navigation.navigate('DetalleObservacion', { id: item.id })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Sin observaciones por ahora.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F3F6' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, backgroundColor: '#EA5B1E',
  },
  title: { color: '#fff', fontSize: 17, fontWeight: '800' },
  fab: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  fabText: { color: '#EA5B1E', fontSize: 20, fontWeight: '800' },
  list: { padding: 16, gap: 12 },
  empty: { textAlign: 'center', color: '#9AA1AB', marginTop: 60 },
});
