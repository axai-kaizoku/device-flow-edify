'use client';
import { signOut, useSession } from 'next-auth/react';

export const AuthBtn = () => {
	return <button onClick={() => signOut()}>Logout</button>;
};

export const SessionState = () => {
	const session = useSession();
	return <div className="w-52 h-60 bg-pink-300">{JSON.stringify(session)}</div>;
};
