import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";
import { cookies } from "next/headers";

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
          let user = await User.findOne({ email: profile?.email });

          if (!user) {
            user = new User({
              username: profile?.login,
              email: profile?.email,
              img: profile?.avatar_url,
            });

            await user.save();
          }

          cookies().set({
            name: "user",
            value: user.email,
            maxAge: 60 * 60 * 24 * 30,
          });
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

    // 新增 redirect callback
    async redirect({ url, baseUrl }) {
      // 指定成功登入後導向首頁，登出後導向blog頁面

      if (url === `${process.env.MAIN_API_DOMAIN}/login`)
        return `${baseUrl}/blog`;
      else return url;
    },
  },
});
