import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { verifyMockOtp } from '../services/api';

export function MockOtpScreen({ navigation, route }: any) {
  const [code, setCode] = useState('123456');
  const { otpToken } = route.params;

  const onVerify = async () => {
    try {
      await verifyMockOtp(otpToken, code);
      navigation.navigate('NewLogin');
    } catch (err) {
      Alert.alert('OTP Failed', (err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mock OTP sent. Use 123456 for prototype.</Text>
      <TextInput style={styles.input} value={code} onChangeText={setCode} keyboardType="number-pad" />
      <Button title="Verify OTP" onPress={onVerify} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  text: { marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16 },
});
