'use server';

import { callAPIWithToken, getTokenFromSession } from './helper';
import { redirect } from 'next/navigation';

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
	try {
		const res = await callAPIWithToken<TeamsResponse>(
			'https://api.edify.club/edifybackend/v1/teams',
			'GET',
		);

		return res;
	} catch (e: any) {
		redirect('/login');
	}
}

export async function CreateTeam(
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
		return res;
	} catch (e: any) {
		redirect('/login');
	}
}

export async function getTeamById<Team>(teamId: string) {
	try {
		const res = await callAPIWithToken<Team>(
			`https://api.edify.club/edifybackend/v1/teams/${teamId}`, // API endpoint
			'GET', // HTTP method
			null,
		);
		return res;
	} catch (e: any) {
		redirect('/login');
	}
}

export async function UpdateTeam(
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
		return res;
	} catch (e: any) {
		redirect('/login');
	}
}

// export async function DeleteTeam()
