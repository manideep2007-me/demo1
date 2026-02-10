import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { employeeSignup } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function EmployeeSignupScreen({ route }: any) {
  const { tenantCode } = route.params;
  const [displayName, setDisplayName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const { login } = useAuth();

  const submit = async () => {
    try {
      const { user } = await employeeSignup({ tenantCode, displayName, emailOrPhone });
      login(user);
    } catch (err) {
      Alert.alert('Signup Failed', (err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Full Name" value={displayName} onChangeText={setDisplayName} />
      <TextInput style={styles.input} placeholder="Email or Phone" value={emailOrPhone} onChangeText={setEmailOrPhone} />
      <Button title="Create Employee Account" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
});
