'use server';

import { callAPIWithToken } from './helper';

export type Team = {
	_id?: string;
	title: string;
	description: string;
	image: string;
	size?: string;
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
		const res = await callAPIWithToken<Team>(
			'https://api.edify.club/edifybackend/v1/teams', // API endpoint
			'POST', // HTTP method
			{
				title,
				description,
				image,
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
		throw new Error('Failed to fetch team');
	}
}

export async function updateTeam(
	title?: string,
	description?: string,
	image?: string,
): Promise<Team> {
	try {
		const res = await callAPIWithToken<Team>(
			'https://api.edify.club/edifybackend/v1/teams', // API endpoint
			'POST', // HTTP method
			{
				title,
				description,
				image,
			},
		);
		return res.data;
	} catch (e) {
		throw new Error('Failed to Update team');
	}
}

export async function deleteTeam<Team>(teamId: string) {
	try {
		const res = await callAPIWithToken<Team>(
			`https://api.edify.club/edifybackend/v1/teams/${teamId}`, // API endpoint
			'DELETE', // HTTP method
			null,
		);
		return res.data;
	} catch (e) {
		throw new Error('Failed to delete team');
	}
}
