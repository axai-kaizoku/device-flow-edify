'use client';
import { signOut, useSession } from 'next-auth/react';

export const AuthBtn = () => {
	return <button onClick={() => signOut()}>Logout</button>;
};

export const SessionState = () => {
	const session = useSession();
	return <div>{JSON.stringify(session)}</div>;
};
