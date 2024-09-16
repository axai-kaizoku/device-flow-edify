'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const getTokenFromSession = async () => {
	const session = await getServerSession(authOptions);
	const token = session?.user.token;
	return token;
};

// Enhanced function with inbuilt token retrieval
export async function callAPIWithToken<T>(
	url: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	body: any = null,
): Promise<T> {
	// Retrieve the token from the session
	const token = await getTokenFromSession();

	if (!token) {
		// Handle case where token is not available
		throw new Error('Unauthorized: No token available.');
	}

	try {
		// Make the API call with the token in the Authorization header
		const response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: body ? JSON.stringify(body) : null,
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		// Parse and return the response as JSON
		return await response.json();
	} catch (error: any) {
		// Handle errors and redirect to login if unauthorized
		console.error('API call failed:', error);
		throw new Error(error.message);
	}
}
