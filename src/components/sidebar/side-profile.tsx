'use client';
import { signOut, useSession } from 'next-auth/react';

export const AuthBtn = () => {
	return <button onClick={() => signOut()}>Logout</button>;
};

export const SessionState = () => {
	const session = useSession();
	return (
		<div className="w-96 bg-muted rounded-md h-fit p-6 break-all">
			{JSON.stringify(session)}
		</div>
	);
};
