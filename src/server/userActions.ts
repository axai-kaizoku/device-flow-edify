'use server';

import { callAPIWithToken, getSession } from './helper';
import { Team } from './teamActions';

type Address = {
	address: string;
	phone: number;
	is_primary: boolean;
	image: string;
	_id: string;
};

type Org = {
	deleted_at: null;
	_id?: string;
	name: string;
	legal_entity_name: string;
	office_address: Address[];
	logo: string;
	__v: number;
	email: string;
};

type Manager = {
	deleted_at: null;
	_id: string;
	first_name: string;
	last_name: string;
	password: string;
	email: string;
	phone: string;
	orgId: string;
	employment_type: string;
	created_at: string;
	__v: number;
	date_of_birth: string;
	onboarding_date: string;
	reporting_manager: Manager | null;
};

export type User = {
	deleted_at: null;
	_id: string;
	first_name: string;
	last_name: string;
	gender: string;
	marital_status: string;
	physically_handicapped: string;
	about: string;
	interests_and_hobbies: string;
	password: string;
	email: string;
	phone: string;
	orgId?: Org;
	role: number;
	designation: string;
	image: string;
	teamId: Team;
	employment_type: string;
	created_at: string;
	__v: number;
	date_of_birth: string;
	onboarding_date: string;
	reporting_manager: Manager;
};

export type CreateUserArgs = {
	first_name: string;
	last_name: string;
	gender: string;
	marital_status?: string;
	physically_handicapped?: string;
	about?: string;
	interests_and_hobbies?: string;
	_id?: string;
	email: string;
	phone: string;
	role?: number;
	designation: string;
	image?: string;
	teamId: string;
	employment_type: string;
	date_of_birth: string;
	onboarding_date: string;
	reporting_manager: string;
};

type UsersResponse = User[];

export async function fetchUsers(): Promise<UsersResponse> {
	try {
		const res = await callAPIWithToken<UsersResponse>(
			'https://api.edify.club/edifybackend/v1/user',
			'GET',
		);

		return res.data;
	} catch (e) {
		throw new Error('Failed to fetch users');
	}
}

export async function createUser(userData: CreateUserArgs): Promise<User> {
	try {
		const sess = await getSession();
		const user = {
			...userData,
			password: 'winuall123',
			orgId: sess?.user.orgId,
		};
		console.log(user);

		const res = await callAPIWithToken<User>(
			'https://api.edify.club/edifybackend/v1/user', // API endpoint
			'POST', // HTTP method
			user,
		);

		return res.data;
	} catch (e) {
		throw new Error('Failed to create user');
	}
}

export async function getUserById<User>(userId: string) {
	try {
		const res = await callAPIWithToken<User>(
			`https://api.edify.club/edifybackend/v1/user/${userId}`, // API endpoint
			'GET', // HTTP method
			null,
		);

		return res.data;
	} catch (e) {
		console.log(e);
		throw new Error('Failed to fetch user');
	}
}

export async function updateUser(
	id: string,
	userData: CreateUserArgs,
): Promise<User> {
	try {
		const res = await callAPIWithToken<User>(
			`https://api.edify.club/edifybackend/v1/user/${id}`, // API endpoint
			'PUT', // HTTP method
			userData,
		);
		console.log(res);
		return res.data;
	} catch (e) {
		throw new Error('Failed to Update user');
	}
}

export async function deleteUser<User>(userId: string) {
	try {
		const res = await callAPIWithToken<User>(
			`https://api.edify.club/edifybackend/v1/user/${userId}`, // API endpoint
			'DELETE',
			null,
		);
		return res.data;
	} catch (e) {
		throw new Error('Failed to delete user');
	}
}

export const bulkUploadUsers = async (formData: FormData): Promise<any> => {
	try {
		// Call the API with multipart/form-data
		const response = await callAPIWithToken<any>(
			'https://api.edify.club/edifybackend/v1/user/bulk-upload',
			'POST',
			formData,
			{
				'Content-Type': 'multipart/form-data',
			},
		);
		return response;
	} catch (error) {
		console.error('Error in bulk uploading users:', error);
		throw error;
	}
};

export async function getUsersByTeamId<User>(teamId: string) {
	try {
		const res = await callAPIWithToken<User>(
			`https://api.edify.club/edifybackend/v1/user/${teamId}/team`, // API endpoint
			'GET', // HTTP method
			null,
		);

		return res.data;
	} catch (e) {
		console.log(e);
		throw new Error('Failed to fetch user');
	}
}
