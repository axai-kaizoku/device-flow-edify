'use client';

import { signOut, useSession } from 'next-auth/react';
import LoginForm from '../_components/login-form';
import Link from 'next/link';

export default function Login() {
	return <LoginForm />;
}

const AuthBtn = () => {
	const session = useSession();

	return (
		<div className="fixed top-10 right-10 p-2 rounded-lg border">
			{session.data?.user && <div>{session.data.user.name} hi 💌!!</div>}
			{session.data?.user ? (
				<button onClick={() => signOut()} className="text-sm ">
					Logout
				</button>
			) : (
				<Link href="/login">Go to login page</Link>
			)}
		</div>
	);
};

export { AuthBtn };
