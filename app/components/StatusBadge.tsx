import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Estado } from '../types';

const CONFIG: Record<Estado, { bg: string; color: string; label: string }> = {
  pendiente: { bg: '#DDEAF5', color: '#173E60', label: 'Pendiente' },
  proceso: { bg: '#FBEDCB', color: '#8A6300', label: 'En proceso' },
  resuelta: { bg: '#DCF1EC', color: '#0E8A72', label: 'Resuelta' },
};

export default function StatusBadge({ estado }: { estado: Estado }) {
  const c = CONFIG[estado];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.color }]}>{c.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { marginTop: 9, borderRadius: 8, paddingVertical: 7, paddingHorizontal: 10, alignSelf: 'flex-start' },
  text: { fontSize: 11, fontWeight: '700' },
});
