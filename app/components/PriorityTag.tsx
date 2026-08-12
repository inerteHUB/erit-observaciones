import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Prioridad } from '../types';

const COLORS: Record<Prioridad, string> = { urgente: '#EA5B1E', normal: '#C98A00', baja: '#5B6472' };
const LABELS: Record<Prioridad, string> = { urgente: 'Urgente', normal: 'Normal', baja: 'Baja' };

export default function PriorityTag({ prioridad }: { prioridad: Prioridad }) {
  return <Text style={[styles.tag, { backgroundColor: COLORS[prioridad] }]}>{LABELS[prioridad]}</Text>;
}

const styles = StyleSheet.create({
  tag: {
    color: '#fff', fontSize: 10, fontWeight: '800', paddingVertical: 4, paddingHorizontal: 9,
    borderRadius: 6, overflow: 'hidden', alignSelf: 'flex-start',
  },
});
