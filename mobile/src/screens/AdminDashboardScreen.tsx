import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { createLog, getTenantQr } from '../services/api';

export function AdminDashboardScreen() {
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState('Loading...');

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        const result = await getTenantQr(user.tenantCode);
        setQrCode(result.qrCode);
      } catch (err) {
        setQrCode('Could not load tenant QR');
      }
    };

    load();
  }, [user]);

  const addEmployee = async () => {
    if (!user) return;
    await createLog({
      actorId: user.id,
      actorRole: 'admin',
      action: 'employee_invited',
      entityType: 'employee',
      entityId: 'pending',
      tenantCode: user.tenantCode,
      createdAt: new Date().toISOString(),
      meta: { source: 'admin_dashboard_add_employees' },
    });
    Alert.alert('Invite Flow', 'Employee invite intent logged to activity_logs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.label}>Organization Join QR</Text>
      <Text selectable style={styles.qr}>{qrCode}</Text>
      <Button title="Add Employees" onPress={addEmployee} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 14 },
  label: { fontWeight: '600', marginBottom: 8 },
  qr: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16 },
});
