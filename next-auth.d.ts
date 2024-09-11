import 'next-auth/jwt';

declare module 'next-auth/jwt' {
	interface JWT {
		token: string;
		id: string;
		email: string;
		first_name: string;
		last_name: string;
		orgId: string;
	}
}

declare module 'next-auth' {
	interface Session {
		user: User & {
			token: string;
			id: string;
			email: string;
			first_name: string;
			last_name: string;
			orgId: string;
		};
	}
}

declare module 'next-auth' {
	interface User {
		token: string;
		user: {
			_id: string;
			email: string;
			first_name: string;
			last_name: string;
			orgId: {
				_id: string;
			};
		};
	}
}
