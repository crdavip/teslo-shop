import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: Date | null;
      role: string;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    emailVerified?: Date | null;
    role: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    data?: {
      id: string;
      name: string;
      email: string;
      emailVerified?: Date | null;
      role: string;
      image?: string | null;
    };
  }
}
