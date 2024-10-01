import { callAPIWithToken } from './helper';

export type Issues = {
	id?: string;
	userId?: string;
	orgId?: string;
	title?: string;
	status?: string;
	deleted_at?: null | string;
	createdAt?: string;
	updatedAt?: string;
	priority?: string;
};

type IssueResponse = Issues[];

//get all issues-admin
export async function getAllIssues(): Promise<IssueResponse> {
	try {
		const res = await callAPIWithToken<IssueResponse>(
			'https://api.edify.club/edifybackend/v1/issue',
			'GET',
		);
		return res.data;
	} catch (error: any) {
		throw new Error(error);
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
	} catch (error: any) {
		throw new Error(error);
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
