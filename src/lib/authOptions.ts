import { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";

const GITHUB_ID = process.env.AUTH_GITHUB_ID;
const GITHUB_SECRET = process.env.AUTH_GITHUB_SECRET;

if (!GITHUB_ID || !GITHUB_SECRET) {
  throw new Error("Missing GITHUB_ID or GITHUB_SECRET");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHub({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const { name, email, image } = session.user || {};
      try {
        connectToDb();

        let user = await User.findOne({ email: session.user?.email });
        if (!user) {
          user = new User({
            username: name,
            email,
            img: image,
          });
          await user.save();
        }

        const newSession = {
          user: {
            ...session.user,
            id: user._id,
            isAdmin: user.isAdmin,
          },
          expires: session.expires,
        };

        return newSession;
      } catch (error) {
        console.error(error);
      }

      return session;
    },
  },
};
