import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export function EmployeeDashboardScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Dashboard</Text>
      <Text style={styles.text}>Welcome, {user?.displayName}</Text>
      <Text style={styles.text}>Tenant: {user?.tenantCode}</Text>
      <Text style={styles.text}>Personalized tasks and timings will render here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 14 },
  text: { fontSize: 16, marginBottom: 8 },
});
