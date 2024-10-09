// src/server/filterActions.tsx
import { callAPIWithToken } from './helper';

export async function filterUsers({
	modelName,
	filters,
	sortBy = 'created_at',
	sortOrder = 'desc',
}: {
	modelName: string;
	filters: [string, string, string][]; // Array of tuples [field, operator, value]
	sortBy?: string;
	sortOrder?: string;
}): Promise<any> {
	try {
		const payload = {
			List: {
				model_name: modelName,
				filters: filters,
				sort_by: sortBy,
				sort_order: sortOrder,
			},
		};
		console.log('Filter Payload:', payload);
		// API call
		const res = await callAPIWithToken<any>(
			'https://api.edify.club/edifybackend/v1/user/filter',
			'POST',
			payload,
		);

		// Return the filtered data
		return res.data;
		console.log('Data' + res.data);
	} catch (error: any) {
		console.error(
			'Error filtering users:',
			error.response?.data || error.message,
		);
		throw new Error(error.response?.data?.message || 'Failed to filter users');
	}
}
