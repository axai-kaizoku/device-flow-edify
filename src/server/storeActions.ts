'use server';
import { DeviceResponse } from './deviceActions';
import { callAPIWithToken, getSession } from './helper';

//Getting Devices
export async function getStoreDevices(): Promise<DeviceResponse> {
	try {
		const res = await callAPIWithToken<DeviceResponse>(
			'https://api.edify.club/edifybackend/v1/devices/trending',
			'GET',
		);

		return res.data;
	} catch (e: any) {
		// redirect('/login');
		throw new Error(e);
	}
}
