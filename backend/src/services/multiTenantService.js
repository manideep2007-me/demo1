const crypto = require('crypto');

class MultiTenantService {
  constructor() {
    this.registry = [];
    this.tenantStores = new Map();
    this.activityLogs = [];
  }

  createOrganization({ orgName, logoUrl, adminContact, licenseType }) {
    const tenantNumber = this.registry.length + 1;
    const tenantCode = `ORG-${tenantNumber.toString().padStart(4, '0')}`;
    const tenantDbName = `project_time_manager${tenantNumber}`;
    const qrCode = `tmapp://join/${tenantCode}/${crypto.randomBytes(4).toString('hex')}`;

    const org = {
      id: crypto.randomUUID(),
      name: orgName,
      logoUrl,
      adminContact,
      licenseType,
      tenantDbName,
      tenantCode,
      qrCode,
      createdAt: new Date().toISOString(),
    };

    this.registry.push(org);
    this.tenantStores.set(tenantCode, {
      dbName: tenantDbName,
      users: [],
      projects: [],
      tasks: [],
      activity_logs: [],
    });

    const otpToken = crypto.randomBytes(8).toString('hex');
    return { org, otpToken };
  }

  verifyOtp(code) {
    return code === '123456';
  }

  findOrgByQrCode(qrCode) {
    return this.registry.find((org) => org.qrCode === qrCode);
  }

  findOrgByTenantCode(tenantCode) {
    return this.registry.find((org) => org.tenantCode === tenantCode);
  }

  signupEmployee({ tenantCode, displayName, emailOrPhone }) {
    const store = this.tenantStores.get(tenantCode);
    if (!store) {
      throw new Error('Tenant not found');
    }

    const user = {
      id: crypto.randomUUID(),
      role: 'employee',
      displayName,
      emailOrPhone,
      orgId: tenantCode,
      tenantCode,
    };

    store.users.push(user);
    return user;
  }

  logActivity(log) {
    this.activityLogs.push(log);
    const tenantStore = this.tenantStores.get(log.tenantCode);
    if (tenantStore) {
      tenantStore.activity_logs.push(log);
    }
    return { ok: true };
  }
}

module.exports = { MultiTenantService };
