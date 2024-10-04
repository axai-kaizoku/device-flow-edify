'use server';

import { callAPIWithToken, getSession } from './helper';

export type Team = {
	_id?: string;
	title: string;
	description: string;
	image: string;
	size?: string;
	employees_count: string;
	deleted_at?: string | null;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
};

type TeamsResponse = Team[];

export async function fetchTeams(): Promise<TeamsResponse> {
	try {
		const res = await callAPIWithToken<TeamsResponse>(
			'https://api.edify.club/edifybackend/v1/teams',
			'GET',
		);

		return res.data;
	} catch (e) {
		throw new Error('Failed to fetch teams');
	}
}

export async function createTeam(
	title: string,
	description: string,
	image: string,
): Promise<Team> {
	try {
		const sess = await getSession();

		const res = await callAPIWithToken<Team>(
			'https://api.edify.club/edifybackend/v1/teams', // API endpoint
			'POST', // HTTP method
			{
				title,
				description,
				image,
				orgId: sess?.user.orgId,
			},
		);

		return res.data;
	} catch (e) {
		throw new Error('Failed to create team');
	}
}

export async function getTeamById<Team>(teamId: string) {
	try {
		const res = await callAPIWithToken<Team>(
			`https://api.edify.club/edifybackend/v1/teams/${teamId}`, // API endpoint
			'GET', // HTTP method
			null,
		);

		return res.data;
	} catch (e) {
		console.log(e);
		throw new Error('Failed to fetch team');
	}
}

export async function updateTeam(
	id: string,
	title: string,
	description: string,
	image: string,
): Promise<Team> {
	try {
		const res = await callAPIWithToken<Team>(
			`https://api.edify.club/edifybackend/v1/teams/${id}`, // API endpoint
			'PUT', // HTTP method
			{
				title,
				description,
				image,
			},
		);
		console.log(res);
		return res.data;
	} catch (e) {
		throw new Error('Failed to Update team');
	}
}

export async function deleteTeam<Team>(teamId: string) {
	try {
		const res = await callAPIWithToken<Team>(
			`https://api.edify.club/edifybackend/v1/teams/${teamId}`, // API endpoint
			'DELETE',
			null,
		);
		return res.data;
	} catch (e) {
		throw new Error('Failed to delete team');
	}
}
