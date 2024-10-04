import { callAPIWithToken, getSession } from './helper';

export type Issues = {
	id?: string;
	userId?: string;
	description?: string;
	orgId?: string;
	title?: string;
	status?: string;
	deleted_at?: null | string;
	createdAt?: string;
	updatedAt?: string;
	priority?: string;
	userName?: string;

	serial_no?: string;
	email?: string;
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

// Create Issue - Employee

export const createIssue = async (
	issueData: Issues,
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
	} catch (error: any) {
		console.error('Error creating a new issue:', error);
		throw new Error(error);
	}
};

//  Get Issues by UserId

export const getIssueByUserId = async (): Promise<
	IssueResponse | undefined
> => {
	const sess = await getSession(); // Fetch session details

	try {
		if (sess?.user && sess.user.id) {
			const userId = sess.user.id;

			// Make the GET request to fetch issues by user ID
			const res = await callAPIWithToken<IssueResponse>(
				`https://api.edify.club/edifybackend/v1/issue/${userId}`,
				'GET',
			);

			// Return the list of issues
			return res.data;
		} else {
			throw new Error('No user session found');
		}
	} catch (error: any) {
		console.error('Error fetching issues by user ID:', error);
		throw new Error(error);
	}
};
