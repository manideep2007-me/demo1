const express = require('express');
const cors = require('cors');
const { MultiTenantService } = require('./services/multiTenantService');

const app = express();
const port = 4000;
const tenants = new MultiTenantService();

app.use(cors());
app.use(express.json());

app.post('/api/onboarding/create-organization', (req, res) => {
  const { orgName, logoUrl, adminContact, licenseType } = req.body;
  if (!orgName || !adminContact || !licenseType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { org, otpToken } = tenants.createOrganization({ orgName, logoUrl, adminContact, licenseType });

  tenants.logActivity({
    actorId: 'system',
    actorRole: 'admin',
    action: 'org_created',
    entityType: 'organization',
    entityId: org.id,
    tenantCode: org.tenantCode,
    createdAt: new Date().toISOString(),
    meta: { licenseType },
  });

  return res.status(201).json({ org, otpToken });
});

app.post('/api/onboarding/verify-otp', (req, res) => {
  const { code } = req.body;
  if (!tenants.verifyOtp(code)) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }

  return res.json({ ok: true });
});

app.post('/api/onboarding/scan-qr', (req, res) => {
  const { qrCode } = req.body;
  const org = tenants.findOrgByQrCode(qrCode);
  if (!org) {
    return res.status(404).json({ error: 'Unknown QR code' });
  }

  return res.json({ org });
});

app.post('/api/onboarding/employee-signup', (req, res) => {
  const { tenantCode, displayName, emailOrPhone } = req.body;

  try {
    const user = tenants.signupEmployee({ tenantCode, displayName, emailOrPhone });
    tenants.logActivity({
      actorId: user.id,
      actorRole: 'employee',
      action: 'employee_joined',
      entityType: 'employee',
      entityId: user.id,
      tenantCode,
      createdAt: new Date().toISOString(),
      meta: { onboardingMethod: 'qr_scan' },
    });
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

app.get('/api/dashboard/admin/tenant-qr/:tenantCode', (req, res) => {
  const org = tenants.findOrgByTenantCode(req.params.tenantCode);
  if (!org) {
    return res.status(404).json({ error: 'Tenant not found' });
  }

  return res.json({ qrCode: org.qrCode });
});

app.post('/api/logs', (req, res) => {
  const result = tenants.logActivity(req.body);
  return res.status(201).json(result);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Prototype API listening at http://localhost:${port}`);
  });
}

module.exports = { app, tenants };
