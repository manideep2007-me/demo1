export type LicenseType = 'Trial' | 'Pro';
export type UserRole = 'admin' | 'employee';

export interface Organization {
  id: string;
  name: string;
  logoUrl: string;
  adminContact: string;
  licenseType: LicenseType;
  tenantDbName: string;
  tenantCode: string;
}

export interface User {
  id: string;
  role: UserRole;
  displayName: string;
  emailOrPhone: string;
  orgId: string;
  tenantCode: string;
}

export interface ActivityLog {
  actorId: string;
  actorRole: UserRole;
  action: 'org_created' | 'employee_invited' | 'employee_joined' | 'project_created' | 'task_updated';
  entityType: 'organization' | 'employee' | 'project' | 'task';
  entityId: string;
  tenantCode: string;
  meta?: Record<string, unknown>;
  createdAt: string;
}
