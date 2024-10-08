'use server';
import { redirect } from 'next/navigation';
import { callAPIWithToken, getSession } from './helper';

//Device type
export type Device = {
	id?: string;
	userId?: string;
	orgId?: string;
	addressId?: string | null;
	device_name: string;
	userName?: string;
	device_type: string;
	asset_serial_no?: string;
	serial_no: string;
	ram: string;
	processor: string;
	storage: string;
	custom_model: string;
	brand: string;
	warranty_status?: boolean;
	warranty_expiary_date: string | null;
	ownership: string;
	purchase_order: string;
	purchase_value: number;
	os: string;
	deleted_at?: string | null;
	device_purchase_date?: string;
	is_trending?: boolean;
	image?: string;
	createdAt?: string;
	updatedAt?: string;
};

export type DeviceResponse = {
	documents: Device[]; // Changed from 'devices' to 'documents'
	totalPages: number;
	currentPage: number;
	totalDocuments: number;
	pageSize: number;
	documentCount: number;
};

//Creating Devices
export const createDevices = async (
	device: Device,
): Promise<Device | undefined> => {
	try {
		const deviceData = {
			device_name: device.device_name || 'Default',
			device_type: device.device_type,
			asset_serial_no: device.asset_serial_no,
			serial_no: device.serial_no,
			ram: device.ram,
			processor: device.processor,
			storage: device.storage,
			custom_model: device.custom_model,
			brand: device.brand,
			warranty_status: device.warranty_status,
			warranty_expiary_date: device.warranty_expiary_date,
			ownership: device.ownership,
			purchase_order: device.purchase_order,
			purchase_value: device.purchase_value,
			os: device.os,
		};
		console.log(deviceData);
		// API call
		const res = await callAPIWithToken<Device>(
			'https://api.edify.club/edifybackend/v1/devices',
			'POST',
			deviceData,
		);
		console.log('res', res);

		return res.data;
	} catch (error) {
		console.error('Error creating device:', error);

		redirect('/login');
	}
};

//Getting Devices
export async function getAllDevices(): Promise<DeviceResponse> {
	try {
		const res = await callAPIWithToken<DeviceResponse>(
			'https://api.edify.club/edifybackend/v1/devices',
			'GET',
		);

		// Validate response structure
		if (!res.data || !Array.isArray(res.data.documents)) {
			throw new Error('Invalid API response structure');
		}

		return res.data;
	} catch (e: any) {
		// Optionally, handle specific error scenarios
		throw new Error(e.message || 'Failed to fetch devices');
	}
}

//Update Devices
export const updateDevice = async (
	deviceId: string,
	deviceData: Device,
): Promise<Device | undefined> => {
	try {
		// API call
		const res = await callAPIWithToken<Device>(
			`https://api.edify.club/edifybackend/v1/devices/${deviceId}`,
			'PUT',
			deviceData,
		);

		return res.data;
	} catch (error: any) {
		console.error('Error updating device:', error);

		throw new Error(error);
	}
};

//DELETE Devices
export async function deleteDevice(
	deviceId: string,
): Promise<Device | undefined> {
	try {
		const deleletedDevice = await callAPIWithToken<Device>(
			`https://api.edify.club/edifybackend/v1/devices/${deviceId}`,
			'DELETE',
		);

		return deleletedDevice.data;
	} catch (error) {
		console.error('Error deleting device:', error);

		return undefined;
	}
}

//Upload bulk device

export const bulkUploadDevices = async (formData: FormData): Promise<any> => {
	try {
		// Call the API with multipart/form-data
		const response = await callAPIWithToken<any>(
			'https://api.edify.club/edifybackend/v1/devices/upload',
			'POST',
			formData,
			{
				'Content-Type': 'multipart/form-data',
			},
		);
		return response;
	} catch (error) {
		console.error('Error in bulk uploading devices:', error);
		throw error;
	}
};

//Search api
export async function searchAPI(searchParams: {
	device_name?: string;
	brand?: string;
	custom_model?: string;
}): Promise<DeviceResponse> {
	try {
		const query = new URLSearchParams();

		if (searchParams.device_name) {
			query.append('device_name', searchParams.device_name);
		}

		if (searchParams.brand) {
			query.append('brand', searchParams.brand);
		}

		if (searchParams.custom_model) {
			query.append('custom_model', searchParams.custom_model);
		}

		const url = `https://api.edify.club/edifybackend/v1/devices?${query.toString()}`;

		const res = await callAPIWithToken<DeviceResponse>(url, 'GET');

		return res.data;
	} catch (error: any) {
		console.error('Error searching devices:', error);
		throw new Error(error);
	}
}

// Get Device by ID
export const getDeviceById = async (deviceId: string): Promise<Device> => {
	try {
		// Make the GET request to fetch a single device by ID
		const res = await callAPIWithToken<Device>(
			`https://api.edify.club/edifybackend/v1/devices/${deviceId}`,
			'GET',
		);

		// Return the fetched device
		return res.data;
	} catch (error: any) {
		console.error('Error fetching device by ID:', error);
		throw new Error('Failed to fetch device by ID');
	}
};

// Getting Devices by User ID

export const getDevicesByUserId = async (): Promise<DeviceResponse> => {
	const sess = await getSession(); // Fetch session details

	try {
		if (sess?.user && sess.user.id) {
			// Make the GET request to fetch Devices of user ID
			const res = await callAPIWithToken<DeviceResponse>(
				`https://api.edify.club/edifybackend/v1/devices/userDetails`,
				'GET',
			);

			console.log(res);

			// Return the list of Devices
			return res.data;
		} else {
			throw new Error('No user session found');
		}
	} catch (error: any) {
		console.error('Error fetching Devices of user ID:', error);
		throw new Error(error);
	}
};

//pagination
export const paginatedDevices = async (
	page: string,
): Promise<DeviceResponse> => {
	try {
		const res = await callAPIWithToken<DeviceResponse>(
			`https://api.edify.club/edifybackend/v1/devices/paginated?page=${page}`,
			'GET',
		);
		// console.log(res.data);
		return res.data;
	} catch (error: any) {
		throw new Error(error);
	}
};
