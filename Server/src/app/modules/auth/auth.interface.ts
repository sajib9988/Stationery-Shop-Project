export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';  // Changed from optional 'user'|'admin' to required 'customer'|'admin'
  userId: string;
  profileImage?: string;
  isBlocked?: boolean;
  address?: string;
  phone?: string;
  city?: string;
  zipcode?: number;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export const USER_ROLE = {
  // user: 'user',
  admin: 'admin',
  customer: 'customer',
}