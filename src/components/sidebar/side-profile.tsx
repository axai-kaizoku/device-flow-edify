'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

export const AuthBtn = () => {
	const session = useSession();
	const dispatch = useDispatch();
	const handleLogout = () => {
		signOut();
		dispatch(logout());
	};

	return (
		<div>
			{session.data?.user && <div>{session.data.user.name} hi 💌!!</div>}
			{session.data?.user ? (
				<button
					onClick={handleLogout}
					className="text-sm ">
					Logout
				</button>
			) : (
				<Link href="/login">Login</Link>
			)}
		</div>
	);
};
