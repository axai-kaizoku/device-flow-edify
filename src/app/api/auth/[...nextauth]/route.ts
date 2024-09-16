import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	session: { strategy: 'jwt' },
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const res = await fetch(
					'https://api.edify.club/edifybackend/v1/auth/login',
					{
						method: 'POST',
						body: JSON.stringify(credentials),
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);

				const body = await res.json();
				// console.log(body);

				if (res.status === 200) {
					return body;
				} else {
					console.log(body.message);
					throw new Error(body.message || 'Login failed');
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// console.log(token, 'jwt token');
			// console.log(user, 'jwt user');
			if (user) {
				token.token = user.token;
				token.id = user.id ? user.id : user.user._id;
				token.email = user.email ? user.email : user.user.email;
				token.first_name = user.name ? '' : user.user.first_name;
				token.last_name = user.name ? '' : user.user.last_name;
				token.orgId = user.image ? '' : user.user.orgId._id;
			}
			return token;
		},

		async session({ session, token }) {
			// console.log(token, 'session token');
			// console.log(session, 'session session');
			if (token.token) {
				session.user.token = token.token;
				session.user.email = token.email;
				session.user.id = token.id;
				session.user.first_name = token.first_name;
				session.user.last_name = token.last_name;
				session.user.orgId = token.orgId;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
