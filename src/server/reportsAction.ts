import { AxiosError } from 'axios';
import { Device } from './deviceActions';
// Get the Assigned Devices

export type DeviceReport = {
	devices: Device[];
};
import { callAPIWithToken } from './helper';
import { User } from './userActions';

// Get the Assigned Devices
export async function getDeviceReport(status: string): Promise<DeviceReport> {
	try {
		const res = await callAPIWithToken<DeviceReport>(
			`https://api.edify.club/edifybackend/v1/devices/userStatus?status=${status}`,
			'GET',
		);

		return res?.data;
	} catch (e) {
		// Optionally, handle specific error scenarios
		throw new Error((e as AxiosError)?.message || 'Failed to fetch devices');
	}
}

// Get the SoldInventory report
export async function getSoldInventoryReport(): Promise<any> {
	try {
		const res = await callAPIWithToken<any>(
			`https://api.edify.club/edifybackend/v1/soldInventory/org`,
			'GET',
		);

		return res?.data;
	} catch (e) {
		// Optionally, handle specific error scenarios
		throw new Error((e as AxiosError)?.message || 'Failed to fetch devices');
	}
}

// Get the Users based on Date

const usersFields = [
	'first_name',
	'last_name',
	'email',
	'phone',
	'password',
	'teamId',
	'orgId',
	'role',
	'designation',
	'reporting_manager',
	'employment_type',
	'about',
	'interests_and_hobbies',
	'date_of_birth',
	'image',
	'gender',
	'marital_status',
	'physically_handicapped',
	'deleted_at',
	'onboarding_date',
	'createdAt',
	'updatedAt',
];

const devicesFields = [
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
	'deleted_at',
	'ram',
	'serial_no',
	'storage',
	'warranty_expiary_date',
	'device_purchase_date',
	'payable',
	'assigned_at',
	'warranty_status',
];

export async function getUserReports({
	filters = [],
	fields = usersFields,
	searchQuery = '',
	pageLength = 20,
}: any): Promise<any> {
	try {
		const payload = {
			fields,
			filters: filters && filters?.length > 0 ? filters : [],
			page_length: pageLength,
		};

		// Construct the URL with an optional search query
		const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
			searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ''
		}`;

		// API call
		const res = await callAPIWithToken<User[]>(apiUrl, 'POST', payload);
		// Check if response has data
		if (res && res?.data) {
			return res?.data; // Return the filtered data
		} else {
			throw new Error('No data received from the API');
		}
	} catch (error: any) {
		// Throw more specific error message
		throw new Error(
			error?.response?.data?.message ||
				'Failed to filter Users. Please try again later.',
		);
	}
}

// Get Assigned Devices
export async function getAssignedDevicesReport({
	filters = [],
	fields = devicesFields,
	searchQuery = '',
	pageLength = 1000,
}: any): Promise<any> {
	try {
		const payload = {
			fields,
			filters: filters && filters?.length > 0 ? filters : [],
			page_length: pageLength,
		};

		// Construct the URL with an optional search query
		const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
			searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ''
		}`;

		// API call
		const res = await callAPIWithToken<Device[]>(apiUrl, 'POST', payload);
		// Check if response has data
		if (res && res?.data) {
			return res?.data; // Return the filtered data
		} else {
			throw new Error('No data received from the API');
		}
	} catch (error: any) {
		
		// Throw more specific error message
		throw new Error(
			error?.response?.data?.message ||
				'Failed to filter Devices. Please try again later.',
		);
	}
}


export async function getDeletedDevicesReport({
	filters = [],
	fields = devicesFields,
	searchQuery = '',
	pageLength = 100000,
}: any): Promise<any> {
	try {
		const payload = {
			fields,
			filters: filters && filters?.length > 0 ? filters : [],
			page_length: pageLength,
		};

		// Construct the URL with an optional search query
		const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
			searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ''
		}`;

		// API call
		const res = await callAPIWithToken<Device[]>(apiUrl, 'POST', payload);
		// Check if response has data
		if (res && res?.data) {
			return res?.data; // Return the filtered data
		} else {
			throw new Error('No data received from the API');
		}
	} catch (error: any) {
		
		// Throw more specific error message
		throw new Error(
			error?.response?.data?.message ||
				'Failed to filter Devices. Please try again later.',
		);
	}
}
