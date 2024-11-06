// 'use server';
import { AxiosError } from 'axios';
import { DeviceResponse, getAllDevicesProp } from './deviceActions';
import { callAPIWithToken, getSession } from './helper';

//Getting Devices
export async function getStoreDevices(): Promise<getAllDevicesProp> {
	try {
		const res = await callAPIWithToken<getAllDevicesProp>(
			'https://api.edify.club/edifybackend/v1/devices/assets',
			'GET',
		);

		return res.data;
	} catch (e) {
		// redirect('/login');
		throw new Error((e as AxiosError).message);
	}
}
