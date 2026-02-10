import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { createOrganization } from '../services/api';
import { LicenseType } from '../types';
import { useTenant } from '../context/TenantContext';

export function CreateOrganizationScreen({ navigation }: any) {
  const [orgName, setOrgName] = useState('');
  const [logoUrl, setLogoUrl] = useState('https://placehold.co/120x120');
  const [adminContact, setAdminContact] = useState('');
  const [licenseType, setLicenseType] = useState<LicenseType>('Trial');
  const { setCurrentOrg } = useTenant();

  const submit = async () => {
    try {
      const { org, otpToken } = await createOrganization({ orgName, logoUrl, adminContact, licenseType });
      setCurrentOrg(org);
      navigation.navigate('MockOtp', { otpToken });
    } catch (err) {
      Alert.alert('Error', (err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Organization Name" value={orgName} onChangeText={setOrgName} />
      <TextInput style={styles.input} placeholder="Logo URL" value={logoUrl} onChangeText={setLogoUrl} />
      <TextInput
        style={styles.input}
        placeholder="Admin Email or Phone"
        value={adminContact}
        onChangeText={setAdminContact}
      />

      <Text style={styles.label}>License Type</Text>
      <View style={styles.inlineButtons}>
        <Button title={`Trial${licenseType === 'Trial' ? ' ✓' : ''}`} onPress={() => setLicenseType('Trial')} />
        <Button title={`Pro${licenseType === 'Pro' ? ' ✓' : ''}`} onPress={() => setLicenseType('Pro')} />
      </View>

      <Button title="Create Organization" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  label: { marginVertical: 8, fontWeight: '600' },
  inlineButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
});
