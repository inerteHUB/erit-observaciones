import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import { logout } from '../../services/authService';
import { ROLE_LABEL } from '../../constants/roles';

export default function PerfilScreen() {
  const { usuario } = useAuthContext();
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{usuario?.nombre ?? '—'}</Text>
      <Text style={styles.role}>{usuario ? ROLE_LABEL[usuario.rol_id] : '—'}</Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F3F6', alignItems: 'center', paddingTop: 60 },
  name: { fontSize: 16, fontWeight: '700', color: '#20242B' },
  role: { fontSize: 13, color: '#636B76', marginTop: 4 },
  logoutBtn: {
    marginTop: 30, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E4E7EC',
    borderRadius: 11, paddingVertical: 12, paddingHorizontal: 20,
  },
  logoutText: { fontSize: 13, fontWeight: '700', color: '#343B44' },
});
