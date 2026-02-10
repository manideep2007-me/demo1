# Multi-tenant Time Management App (Prototype)

Technical prototype using React Native (Expo-style structure) and Node.js with PostgreSQL-oriented multi-tenant logic.

## Prototype features

- **Onboarding Choice Screen** with two primary actions:
  - Create Organization (Admin flow)
  - Scan QR to Join (Employee flow)
- **Admin onboarding flow**:
  - Org name, logo URL, admin email/phone
  - License type (Trial/Pro)
  - Mock OTP verification (`123456`)
- **Employee onboarding flow**:
  - Mock QR scan
  - Employee signup form
- **New Login Screen**:
  - Organization logo rendered dynamically by tenant context
- **Dashboards**:
  - Admin dashboard with tenant QR display and Add Employees action
  - Employee dashboard personalized to logged-in user
- **Multi-tenant backend logic**:
  - Master registry + dynamic tenant store creation (`project_time_manager{N}`)
  - Activity logging (`who`, `what`, `when`, `entity`, `tenantCode`)

## Structure

- `mobile/` React Native navigation, screens, and state contexts
- `backend/` Node.js API with in-memory prototype of PostgreSQL multi-tenancy
- `backend/src/db/schema.sql` SQL schema reference for master DB and tenant DBs

## Run backend prototype

```bash
cd backend
npm install
npm run dev
```

API starts on `http://localhost:4000`.

## Notes

- This is a technical prototype and intentionally uses mock OTP + mock QR scanner input.
- Tenant databases are simulated as isolated stores in memory. The SQL file provides the intended PostgreSQL table structures for production implementation.
