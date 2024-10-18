import { Device } from './deviceActions';
import { callAPIWithToken } from './helper';

interface FilterDeviceParams {
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
export async function filterDevice({
	filters = [],
	fields = devicesFields,
	searchQuery = '',
	pageLength = 20,
}: FilterDeviceParams = {}): Promise<any> {
	try {
		const payload = {
			fields,
			filters: filters.length > 0 ? filters : [],
			page_length: pageLength,
		};

		// Construct the URL with an optional search query
		const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
			searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ''
		}`;

		// API call
		const res = await callAPIWithToken<Device[]>(apiUrl, 'POST', payload);
		console.log(apiUrl, payload);
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
