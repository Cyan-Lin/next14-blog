import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        connectToDb();

        try {
          const user = await User.findOne({ email: profile?.email });

          if (!user) {
            const newUser = new User({
              username: profile?.login,
              email: profile?.email,
              img: profile?.avatar_url,
            });

            await newUser.save();
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }

      return true;
    },

    async session({ session }) {
      // console.log(session);

      // if (session?.user) {
      //   connectToDb();
      //   const user = await User.findOne({ email: session.user.email });
      //   console.log(user);

      //   if(user)
      //   session.user.isAdmin = user
      //   // connectToDb();
      //   // const user = await User.findById(token.sub);
      //   // session.user.username = user?.username;
      //   // session.user.email = user?.email;
      //   // session.user.img = user?.img;
      // }
      return session;
    },

    // async jwt({ token, user }) {
    //   console.log("jwt user", token);

    //   if (user) {
    //     token.id = user._id;
    //   }
    //   return token;
    // },
  },
});
