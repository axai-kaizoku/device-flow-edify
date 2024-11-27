import { Device } from './deviceActions';
import { callAPIWithToken } from './helper';
import { Issues } from './issueActions';
import { User } from './userActions';

export interface FilterApiParams {
	filters?: any[][];
	fields?: string[];
	searchQuery?: string;
	pageLength?: number;
}

export const devicesFields = [
	'device_name',
	'device_type',
	'os',
	'brand',
	'custom_model',
	'asset_serial_no',
	'ownership',
	'processor',
	'purchase_order',
	'purchase_value',
	'ram',
	'serial_no',
	'storage',
	'warranty_expiary_date',
	'warranty_status',
];

export const usersFields = [
	'first_name',
	'last_name',
	'gender',
	'marital_status',
	'physically_handicapped',
	'about',
	'interests_and_hobbies',
	'role',
	'designation',
	'employment_type',
	'onboarding_date',
	'reporting_manager',
	'email',
	'phone',
	'deleted_at'
];

export async function deletedUsers({
	filters = [],
	fields = usersFields,
	searchQuery = '',
	pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
	try {
		const payload = {
				fields,
				filters: filters.length > 0 ? filters : [],
				page_length: pageLength,
				isDeleted:true
		}

		// Construct the URL with an optional search query
		const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
			searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ''
		}`;

		// API call
		const res = await callAPIWithToken<User[]>(apiUrl, 'POST', payload);
		// console.log(apiUrl, payload);
		// Check if response has data
		if (res && res.data) {
			// console.log('Filtered Data:', res.data);
			return res.data; // Return the filtered data
		} else {
			throw new Error('No data received from the API');
		}
	} catch (error: any) {
		// Enhanced error logging
		console.error(
			'Error filtering users:',
			error.response?.data || error.message,
		);

		// Throw more specific error message
		throw new Error(
			error.response?.data?.message ||
				'Failed to filter Users. Please try again later.',
		);
	}
}

export async function filterUsers({
	filters = [],
	fields = usersFields,
	searchQuery = '',
	pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
	try {
		const payload = {
			fields,
			filters: filters.length > 0 ? filters : [],
			page_length: pageLength,
		};

		// Construct the URL with an optional search query
		const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
			searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ''
		}`;

		// API call
		const res = await callAPIWithToken<User[]>(apiUrl, 'POST', payload);
		// console.log(apiUrl, payload);
		// Check if response has data
		if (res && res.data) {
			// console.log('Filtered Data:', res.data);
			return res.data; // Return the filtered data
		} else {
			throw new Error('No data received from the API');
		}
	} catch (error: any) {
		// Enhanced error logging
		console.error(
			'Error filtering users:',
			error.response?.data || error.message,
		);

		// Throw more specific error message
		throw new Error(
			error.response?.data?.message ||
				'Failed to filter Users. Please try again later.',
		);
	}
}

export async function filterDevice({
	filters = [],
	fields = devicesFields,
	searchQuery = '',
	pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
	try {
		const payload = {
			fields,
			filters: filters.length > 0 ? filters : [],
			page_length: pageLength,
		};

		console.log(payload)
		// Construct the URL with an optional search query
		const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
			searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ''
		}`;

		// API call
		const res = await callAPIWithToken<Device[]>(apiUrl, 'POST', payload);
		// Check if response has data
		if (res && res.data) {
			// console.log('Filtered Data:', res.data);
			return res.data; // Return the filtered data
		} else {
			throw new Error('No data received from the API');
		}
	} catch (error: any) {
		// Enhanced error logging
		console.error(
			'Error filtering devices:',
			error.response?.data || error.message,
		);

		// Throw more specific error message
		throw new Error(
			error.response?.data?.message ||
				'Failed to filter devices. Please try again later.',
		);
	}
}

export const issueFields = [
	'description',
	'title',
	'status',
	'createdAt',
	'updatedAt',
	'priority',
	'userName',
	'serial_no',
	'email',
];

export async function filterIssues({
	filters = [],
	fields = issueFields,
	searchQuery = '',
	pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
	try {
		const payload = {
			fields,
			filters: filters.length > 0 ? filters : [],
			page_length: pageLength,
		};

		// Construct the URL with an optional search query
		const apiUrl = `https://api.edify.club/edifybackend/v1/issue/filter${
			searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ''
		}`;

		// API call
		const res = await callAPIWithToken<Issues[]>(apiUrl, 'POST', payload);
		// console.log(apiUrl, payload);
		// Check if response has data
		if (res && res.data) {
			// console.log('Filtered Data:', res.data);
			return res.data; // Return the filtered data
		} else {
			throw new Error('No data received from the API');
		}
	} catch (error: any) {
		// Enhanced error logging
		console.error(
			'Error filtering issues:',
			error.response?.data || error.message,
		);

		// Throw more specific error message
		throw new Error(
			error.response?.data?.message ||
				'Failed to filter issues. Please try again later.',
		);
	}
}
