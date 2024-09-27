'use server';
import { redirect } from 'next/navigation'; // Use correct redirect import from Next.js
import { callAPIWithToken } from './helper';

// Define the Device type
export type Device = {
	id?: string;
	userId?: string;
	orgId?: string;
	addressId?: string;
	device_name: string;
	device_type: string;
	asset_serial_no?: string;
	serial_no: string;
	ram: string;
	processor: string;
	storage: string;
	custom_model: string;
	brand: string;
	warranty_status?: boolean;
	warranty_expiary_date: string;
	ownership: string;
	purchase_order: string;
	purchase_value: number;
	os: string;
	deleted_at?: null | string;

	device_purchase_date: string;
};

type DeviceResponse = Device[];

//Creating Devices
export const createDevices = async (
	device: Device,
): Promise<Device | undefined> => {
	try {
		const deviceData = {
			device_name: device.device_name || 'BC',
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

		return res.data;
	} catch (e: any) {
		redirect('/login');
	}
}

//Update Devices
export const updateDevice = async (): Promise<Device | undefined> => {
	try {
		const deviceData = {
			device_name: '',
			device_type: '',
			asset_serial_no: '',
			serial_no: '',
			ram: '',
			processor: '',
			storage: '',
			custom_model: '',
			brand: '',
			warranty_status: false,
			warranty_expiary_date: '',
			ownership: '',
			purchase_order: '',
			purchase_value: '',
			os: '',
		};

		// API call
		const res = await callAPIWithToken<Device>(
			'https://api.edify.club/edifybackend/v1/devices',
			'PUT',
			deviceData,
		);

		return res.data;
	} catch (error) {
		console.error('Error creating device:', error);

		redirect('/login');
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

//upload bulk device

export const bulkUploadDevices = async (formData: FormData): Promise<any> => {
	try {
		// Call the API with multipart/form-data
		const response = await callAPIWithToken<any>(
			'https://api.edify.club/edifybackend/v1/devices/bulk-upload',
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
