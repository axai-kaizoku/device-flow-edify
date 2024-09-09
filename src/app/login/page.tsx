'use client';

import { signOut, useSession } from 'next-auth/react';
import LoginForm from '../_components/login-form';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

export default function Login() {
	return <LoginForm />;
}

const AuthBtn = () => {
	const session = useSession();
	const dispatch = useDispatch();
	const handleLogout = () => {
		signOut();
		dispatch(logout());
	};

	return (
		<div className="fixed top-10 right-10 p-2 rounded-lg border">
			{session.data?.user && <div>{session.data.user.name} hi 💌!!</div>}
			{session.data?.user ? (
				<button
					onClick={handleLogout}
					className="text-sm ">
					Logout
				</button>
			) : (
				<Link href="/login">Go to login page</Link>
			)}
		</div>
	);
};

export { AuthBtn };
