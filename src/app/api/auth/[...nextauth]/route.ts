import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const res = await fetch('http://localhost:3000/api/login', {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});
				// const email = 'akshay@gmail.com';
				// const pass = '1234';
				// if (credentials?.email === email && credentials.password === pass) {
				// 	console.log(credentials);
				// }
				// console.log(user.user.email);
				// console.log(res);

				if (res.ok) {
					const user = await res.json();
					return user;
				} else {
					console.log('check your credentials');
					return null;
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
});

export { handler as GET, handler as POST };
