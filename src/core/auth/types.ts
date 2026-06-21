export type UserRole = 'admin' | 'driver' | 'customer';

export type UserProfile = {
  id: string;
  role: UserRole;
  email: string;
};
