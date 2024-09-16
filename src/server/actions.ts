'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { callAPI } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const getTokenFromSession = async () => {
	const session = await getServerSession(authOptions);
	const token = await session?.user.token;
	return token;
};

type RequestOTPProps = {
	message: string;
	userId?: string;
};
export async function RequestOTP(email: string): Promise<RequestOTPProps> {
	const { data } = await callAPI<RequestOTPProps>(
		'https://api.edify.club/edifybackend/v1/auth/request-password-reset',
		'POST',
		{ email },
		{
			'Content-Type': 'application/json',
		},
	);

	return data;
}

type ResetPassProps = {
	message: string;
};
export async function ResetPass(
	userId: string,
	otp: string,
	password: string,
): Promise<ResetPassProps> {
	const { data } = await callAPI<ResetPassProps>(
		'https://api.edify.club/edifybackend/v1/auth/verify-otp',
		'POST',
		{
			userId,
			otp,
			newPassword: password,
		},
		{
			'Content-Type': 'application/json',
		},
	);

	return data;
}

type Team = {
	_id: string;
	title: string;
	description: string;
	image: string;
	deleted_at: string | null;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

type TeamsResponse = Team[];

export async function fetchTeams(): Promise<TeamsResponse> {
	const token = await getTokenFromSession();
	console.log(token);
	try {
		const res = await callAPI<TeamsResponse>(
			'https://api.edify.club/edifybackend/v1/teams', // API endpoint
			'GET', // HTTP method
			null, // No body required for GET requests
			{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`, // Add the Bearer token here
			},
		);

		return res.data;
	} catch (e: any) {
		redirect('/login');
	}
}

export async function CreateTeam(
	title: string,
	description: string,
	image: string,
): Promise<Team> {
	const token = await getTokenFromSession();
	try {
		const res = await callAPI<Team>(
			'https://api.edify.club/edifybackend/v1/teams', // API endpoint
			'POST', // HTTP method
			{
				title,
				description,
				image,
			},
			{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`, // Add the Bearer token here
			},
		);
		return res.data;
	} catch (e: any) {
		redirect('/login');
	}
}

export async function getTeamById<Team>(teamId: string) {
	const token = await getTokenFromSession();
	try {
		const res = await callAPI<Team>(
			`https://api.edify.club/edifybackend/v1/teams/${teamId}`, // API endpoint
			'GET', // HTTP method
			null,
			{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`, // Add the Bearer token here
			},
		);
		return res.data;
	} catch (e: any) {
		redirect('/login');
	}
}

export async function UpdateTeam(
	title?: string,
	description?: string,
	image?: string,
): Promise<Team> {
	const token = await getTokenFromSession();
	try {
		const res = await callAPI<Team>(
			'https://api.edify.club/edifybackend/v1/teams', // API endpoint
			'POST', // HTTP method
			{
				title,
				description,
				image,
			},
			{
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`, // Add the Bearer token here
			},
		);
		return res.data;
	} catch (e: any) {
		redirect('/login');
	}
}

// export async function DeleteTeam()
