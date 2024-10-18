import { AxiosError } from 'axios';
import { callAPIWithToken, getSession } from './helper';

export type Issues = {
	_id: string;
	userId?: string;
	description?: string;
	orgId?: string;
	title?: string;
	status: string;
	deleted_at?: null | string;
	createdAt?: string;
	updatedAt?: string;
	priority?: string;
	userName?: string;
	serial_no: string;
	email: string;
};

export type getAllResponse = Issues[];

export type IssueResponse = {
	issues: Issues[]; // Changed from 'devices' to 'documents'
	total_count: number;
	page_size: number;
};

export interface IssueData {
	deviceId: string | undefined; // ID of the device
	serial_no: string; // Serial number of the device
	priority: string; // Priority of the issue
	status: string; // Status of the issue (e.g., 'Open')
	title: string; // Title of the issue
	description: string; // Detailed description of the issue
}

//get all issues-admin
export async function getAllIssues(): Promise<IssueResponse> {
	try {
		const res = await callAPIWithToken<IssueResponse>(
			'https://api.edify.club/edifybackend/v1/issue',
			'GET',
		);
		return res.data;
	} catch (error) {
		throw new Error((error as AxiosError).message);
	}
}

//get single issue by ID-admin/user
export async function getIssueById<Issues>(issueId: string) {
	try {
		const res = await callAPIWithToken<Issues>(
			`https://api.edify.club/edifybackend/v1/issue/${issueId}`,
			'GET',
			null,
		);
		return res.data;
	} catch (error) {
		throw new Error('Failed to fetch Issue');
	}
}

//update issue
export const updateIssue = async (
	issueId: string,
	issueData: Issues,
): Promise<Issues | undefined> => {
	try {
		const res = await callAPIWithToken<Issues>(
			`https://api.edify.club/edifybackend/v1/issue/${issueId}`,
			'PUT',
			issueData,
		);
		return res.data;
	} catch (error) {
		throw new Error((error as AxiosError).message);
	}
};

//delete issue
export async function deleteIssue(
	issueId: string,
): Promise<Issues | undefined> {
	try {
		const deleletedIssues = await callAPIWithToken<Issues>(
			`https://api.edify.club/edifybackend/v1/issue/${issueId}`,
			'DELETE',
		);

		return deleletedIssues.data;
	} catch (error) {
		console.error('Error deleting Issues:', error);

		return undefined;
	}
}

// Create Issue - Employee

export const createIssue = async (
	issueData: IssueData,
): Promise<Issues | undefined> => {
	const sess = await getSession();
	try {
		if (sess?.user) {
			const issue = {
				...issueData,
				orgId: sess.user.orgId,
				userId: sess.user.id,
				email: sess.user.email,
				createdAt: new Date().toISOString(),
			};
			const res = await callAPIWithToken<Issues>(
				'https://api.edify.club/edifybackend/v1/issue/',
				'POST',
				issue,
			);
			return res.data;
		}
	} catch (error) {
		console.error('Error creating a new issue:', error);
		throw new Error((error as AxiosError).message);
	}
};

//  Get Issues by UserId

export const getIssueByUserId = async (): Promise<getAllResponse> => {
	const sess = await getSession(); // Fetch session details

	try {
		if (sess?.user && sess.user.id) {
			// const userId = sess.user.id;

			// Make the GET request to fetch issues by user ID
			const res = await callAPIWithToken<getAllResponse>(
				`https://api.edify.club/edifybackend/v1/issue/userDetails`,
				'GET',
			);

			// Return the list of issues
			return res.data;
		} else {
			throw new Error('No user session found');
		}
	} catch (error) {
		console.error('Error fetching issues by user ID:', error);
		throw new Error((error as AxiosError).message);
	}
};

//pagination
export const paginatedIssue = async (page: string): Promise<IssueResponse> => {
	try {
		const res = await callAPIWithToken<IssueResponse>(
			`https://api.edify.club/edifybackend/v1/issue/paginated?page=${page}`,
			'GET',
		);
		// console.log(res.data);
		return res.data;
	} catch (error) {
		throw new Error((error as AxiosError).message);
	}
};

//search-api
export async function issueSearchAPI(query: string): Promise<IssueResponse> {
	try {
		const url = `https://api.edify.club/edifybackend/v1/issue/search?query=${query}`;
		const res = await callAPIWithToken<IssueResponse>(url, 'GET');

		return res.data;
	} catch (error) {
		console.error('Error searching:', error);
		throw new Error((error as AxiosError).message);
	}
}
