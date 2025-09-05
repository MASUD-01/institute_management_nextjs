import "next-auth";
// NextAuth type augmentation
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    data?: {
      user_id: number;
      company_id: number;
      email: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      role_id: number;
      username: string;
      photo: string;
      status: number;
      created_at: string;
      updated_at: string;
    };
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    email?: string;
    phone_number?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    data?: {
      email?: string;
      role?: string;
    };
  }
}
