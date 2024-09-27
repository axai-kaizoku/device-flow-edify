'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const getSession = async () => {
	const session = await getServerSession(authOptions);
	return session;
};

export const getTokenFromSession = async () => {
	const session = await getServerSession(authOptions);
	const token = session?.user.token;
	return token;
};

// Enhanced function with inbuilt token retrieval
// export async function callAPIWithToken<T>(
// 	url: string,
// 	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
// 	body: any = null,
// ): Promise<T> {
// 	// Retrieve the token from the session
// 	const token = await getTokenFromSession();

// 	if (!token) {
// 		// Handle case where token is not available
// 		throw new Error('Unauthorized: No token available.');
// 	}

// 	try {
// 		// Make the API call with the token in the Authorization header
// 		const response = await fetch(url, {
// 			method,
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${token}`,
// 			},
// 			body: body ? JSON.stringify(body) : null,
// 		});

// 		if (!response.ok) {
// 			throw new Error(`Error: ${response}`);
// 		}

// 		// Parse and return the response as JSON
// 		return await response.json();
// 	} catch (error: any) {
// 		// Handle errors and redirect to login if unauthorized
// 		console.error('API call failed:', error);
// 		throw new Error(error.message);
// 	}
// }

import axios, { AxiosResponse } from 'axios';

interface APIResponse<T> {
	data: T;
	status: number;
}

// Main function using axios
export async function callAPIWithToken<T>(
	url: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	body: any = null,
	headers: Record<string, string> = {}, // Allow passing custom headers
): Promise<APIResponse<T>> {
	// Retrieve the token
	const token = await getTokenFromSession();

	if (!token) {
		throw new Error('Unauthorized: No token available.');
	}

	try {
		// Default headers, including Authorization
		const defaultHeaders: Record<string, string> = {
			Authorization: `Bearer ${token}`,
			...headers, // Allow additional headers to be passed
		};

		// Set 'Content-Type' only if not already provided (for multipart/form-data)
		if (!defaultHeaders['Content-Type']) {
			defaultHeaders['Content-Type'] = 'application/json';
		}

		// Make the API call using axios
		const response: AxiosResponse<T> = await axios({
			url,
			method,
			data: method !== 'GET' ? body : undefined,
			headers: defaultHeaders,
		});

		// Return response data and status
		return {
			data: response.data,
			status: response.status,
		};
	} catch (error: any) {
		// Handle error and re-throw it for further handling
		console.error('API call failed:', error.message);
		throw new Error(error.response?.data?.message || 'API request failed');
	}
}
