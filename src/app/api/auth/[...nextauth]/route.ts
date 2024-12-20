import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          "https://api.edify.club/edifybackend/v1/auth/login",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const body = await res.json();
        // console.log(body);

        if (res.status === 200) {
          return body;
        } else {
          console.log(body.message);
          throw new Error(body.message || "Login failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      async profile(profile, tokens) {
        console.log("profile google", profile);
        console.log("tokens google", tokens);

        const res = await fetch(
          "https://api.edify.club/edifybackend/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: profile.email,
            }),
          }
        );

        const data = await res.json();
        console.log("google api data", data);

        const returnData = {
          id: profile.sub,
          user: data.user,
        };

        if (res.status === 200) {
          return returnData as User;
        } else {
          console.log(data.message);
          throw new Error(data.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log('jwt token:', token);
      // console.log('jwt user:', user);

      if (user) {
        token.token = user.token;
        token.id = user.user._id; // Ensure you're correctly referencing the user object
        token.email = user.user.email;
        token.first_name = user.user.first_name;
        token.last_name = user.user.last_name;
        token.orgId = user.user.orgId._id; // Ensure orgId is available
        token.role = user.user.role;
      }

      // console.log('jwt token only:', token);
      return token;
    },

    async session({ session, token }) {
      // console.log('session token:', token);
      // console.log('session session:', session);

      if (token.token) {
        session.user.token = token.token;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.orgId = token.orgId;
        session.user.role = token.role;
      }

      // console.log('session only:', session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
