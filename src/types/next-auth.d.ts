import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
      isAdmin: boolean;
    };
    expires: ISODateString;
  }
}
