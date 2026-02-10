import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../context/TenantContext';

export function NewLoginScreen() {
  const { currentOrg } = useTenant();
  const { login } = useAuth();

  return (
    <View style={styles.container}>
      {currentOrg?.logoUrl ? <Image source={{ uri: currentOrg.logoUrl }} style={styles.logo} /> : null}
      <Text style={styles.orgName}>{currentOrg?.name ?? 'Organization'}</Text>
      <Button
        title="Login as Admin"
        onPress={() =>
          login({
            id: 'admin-1',
            role: 'admin',
            displayName: 'Admin User',
            emailOrPhone: currentOrg?.adminContact ?? 'admin@example.com',
            orgId: currentOrg?.id ?? 'unknown',
            tenantCode: currentOrg?.tenantCode ?? 'unknown',
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, alignItems: 'center' },
  logo: { width: 120, height: 120, borderRadius: 60, marginBottom: 12 },
  orgName: { fontSize: 20, fontWeight: '600', marginBottom: 20 },
});
