import React, { createContext, useContext, useMemo, useState } from 'react';
import { Organization } from '../types';

interface TenantContextValue {
  currentOrg: Organization | null;
  setCurrentOrg: (org: Organization | null) => void;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const value = useMemo(() => ({ currentOrg, setCurrentOrg }), [currentOrg]);

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}
