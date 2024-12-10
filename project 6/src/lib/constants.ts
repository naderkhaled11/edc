export const AUTH_STATES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  BLOCKED: 'blocked',
} as const;

export const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
} as const;

export const VIEWS = {
  AUTH: 'auth',
  ADMIN: 'admin',
  REGISTER: 'register',
} as const;