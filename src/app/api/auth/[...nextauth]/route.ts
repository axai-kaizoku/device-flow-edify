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
          "https://staging.deviceflow.ai/edifybackend/v1/auth/login",
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
          throw new Error(body.message || "Login failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      async profile(profile, tokens) {
        const res = await fetch(
          "https://staging.deviceflow.ai/edifybackend/v1/auth/login",
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

        const returnData = {
          id: profile.sub,
          user: data.user,
        };

        if (res.status === 200) {
          return returnData as User;
        } else {
          throw new Error(data.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.userId = user.user[0]._id;
        token.email = user.user[0].email;
        token.firstName = user.user[0].first_name;
        token.lastName = user.user[0].last_name;
        token.role = user.user[0].role;
        token.employeeCount = user.user[0].employeeCount;
        token.designation = user.user[0].designation;
        token.orgId = user.user[0].orgId;
        token.teamId = user.user[0].teamId;
        // @ts-ignore
        token.addressDetails = user.user[0].addressDetails[0];
      }

      // console.log("JWT token:", token);
      return token;
    },

    async session({ session, token }) {
      session.user.user = {
        token: token.token,
        userId: token.userId,
        email: token.email,
        firstName: token.firstName,
        lastName: token.lastName,
        role: token.role,
        employeeCount: token.employeeCount,
        designation: token.designation,
        orgId: token.orgId,
        teamId: token.teamId,
        addressDetails: token.addressDetails,
      };

      // console.log("Session object:", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
