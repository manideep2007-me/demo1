import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export function OnboardingChoiceScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Time Manager</Text>
      <Button title="Create Organization" onPress={() => navigation.navigate('CreateOrganization')} />
      <View style={styles.spacer} />
      <Button title="Scan QR to Join" onPress={() => navigation.navigate('ScanQrJoin')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  spacer: { height: 16 },
});
