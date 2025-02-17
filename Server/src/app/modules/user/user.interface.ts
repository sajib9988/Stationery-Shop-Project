export interface IUser {
    name: string;
    email: string;
    password: string;
    profileImage?: string | null;
    role: "customer" | "admin";
    userId: string,
    isBlocked?: boolean;
    phone?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
  