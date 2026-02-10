import { ActivityLog, LicenseType, Organization, User } from '../types';

const API_BASE = 'http://localhost:4000';

interface CreateOrgPayload {
  orgName: string;
  logoUrl: string;
  adminContact: string;
  licenseType: LicenseType;
}

export async function createOrganization(payload: CreateOrgPayload): Promise<{ org: Organization; otpToken: string }> {
  const res = await fetch(`${API_BASE}/api/onboarding/create-organization`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to create organization');
  return res.json();
}

export async function verifyMockOtp(otpToken: string, code: string): Promise<{ ok: boolean }> {
  const res = await fetch(`${API_BASE}/api/onboarding/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otpToken, code }),
  });

  if (!res.ok) throw new Error('OTP verification failed');
  return res.json();
}

export async function scanQrAndGetOrg(qrCode: string): Promise<{ org: Organization }> {
  const res = await fetch(`${API_BASE}/api/onboarding/scan-qr`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qrCode }),
  });

  if (!res.ok) throw new Error('QR lookup failed');
  return res.json();
}

export async function employeeSignup(payload: {
  tenantCode: string;
  displayName: string;
  emailOrPhone: string;
}): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE}/api/onboarding/employee-signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Employee signup failed');
  return res.json();
}

export async function getTenantQr(tenantCode: string): Promise<{ qrCode: string }> {
  const res = await fetch(`${API_BASE}/api/dashboard/admin/tenant-qr/${tenantCode}`);
  if (!res.ok) throw new Error('Failed to get tenant QR');
  return res.json();
}

export async function createLog(log: ActivityLog): Promise<{ ok: boolean }> {
  const res = await fetch(`${API_BASE}/api/logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log),
  });
  if (!res.ok) throw new Error('Failed to write activity log');
  return res.json();
}
