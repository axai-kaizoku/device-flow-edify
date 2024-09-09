'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const AuthBtn = () => {
	const session = useSession();

	return (
		<div>
			{session.data?.user && <div>{session.data.user.name} hi 💌!!</div>}
			{session.data?.user ? (
				<button onClick={() => signOut()} className="text-sm ">
					Logout
				</button>
			) : (
				<Link href="/login">Login</Link>
			)}
		</div>
	);
};
