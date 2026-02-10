import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { scanQrAndGetOrg } from '../services/api';
import { useTenant } from '../context/TenantContext';

export function ScanQrJoinScreen({ navigation }: any) {
  const [qrCode, setQrCode] = useState('');
  const { setCurrentOrg } = useTenant();

  const scan = async () => {
    try {
      const { org } = await scanQrAndGetOrg(qrCode);
      setCurrentOrg(org);
      navigation.navigate('EmployeeSignup', { tenantCode: org.tenantCode });
    } catch (err) {
      Alert.alert('Scan Failed', (err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mock QR Scanner</Text>
      <TextInput style={styles.input} placeholder="Paste QR code" value={qrCode} onChangeText={setQrCode} />
      <Button title="Scan and Join" onPress={scan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16 },
});
