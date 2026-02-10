import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { OnboardingChoiceScreen } from '../screens/OnboardingChoiceScreen';
import { CreateOrganizationScreen } from '../screens/CreateOrganizationScreen';
import { MockOtpScreen } from '../screens/MockOtpScreen';
import { ScanQrJoinScreen } from '../screens/ScanQrJoinScreen';
import { EmployeeSignupScreen } from '../screens/EmployeeSignupScreen';
import { NewLoginScreen } from '../screens/NewLoginScreen';
import { AdminDashboardScreen } from '../screens/AdminDashboardScreen';
import { EmployeeDashboardScreen } from '../screens/EmployeeDashboardScreen';

type RootStackParamList = {
  OnboardingChoice: undefined;
  CreateOrganization: undefined;
  MockOtp: { otpToken: string };
  ScanQrJoin: undefined;
  EmployeeSignup: { tenantCode: string };
  NewLogin: undefined;
  AdminDashboard: undefined;
  EmployeeDashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen name="OnboardingChoice" component={OnboardingChoiceScreen} />
          <Stack.Screen name="CreateOrganization" component={CreateOrganizationScreen} />
          <Stack.Screen name="MockOtp" component={MockOtpScreen} />
          <Stack.Screen name="ScanQrJoin" component={ScanQrJoinScreen} />
          <Stack.Screen name="EmployeeSignup" component={EmployeeSignupScreen} />
          <Stack.Screen name="NewLogin" component={NewLoginScreen} />
        </>
      ) : user.role === 'admin' ? (
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      ) : (
        <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboardScreen} />
      )}
    </Stack.Navigator>
  );
}
