'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import LoginForm from '../_components/login-form';

export default function Login() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<LoginForm />
		</div>
	);
}

const AuthBtn = () => {
	const session = useSession();

	return (
		<div className="fixed top-10 right-10 bg-slate-100 p-4 rounded-full">
			{session.data?.user && <div>{session.data.user.name} hi 💌!!</div>}
			{session.data?.user ? (
				<button
					onClick={() => signOut()}
					className="text-sm ">
					Logout
				</button>
			) : (
				<button
					onClick={() => signIn()}
					className="text-sm ">
					Login
				</button>
			)}
		</div>
	);
};

export { AuthBtn };
