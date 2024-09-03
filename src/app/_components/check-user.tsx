'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CheckUser() {
	const session = useSession();
	const router = useRouter();
	if (session.status === 'unauthenticated') {
		router.push('/login');
	}
	if (session.status === 'authenticated') {
		router.push('/');
	}
}
