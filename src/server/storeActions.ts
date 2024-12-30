// 'use server';
import { AxiosError } from 'axios';
import { DeviceResponse, getAllDevicesProp } from './deviceActions';
import { callAPIWithToken, getSession } from './helper';
import { cache } from 'react';

//Getting Devices
export const getStoreDevices = cache(async function (): Promise<getAllDevicesProp> {
	try {
		const res = await callAPIWithToken<getAllDevicesProp>(
			'https://api.edify.club/edifybackend/v1/devices/assets',
			'GET',
		);

		return res?.data;
	} catch (e) {
		// redirect('/login');
		throw new Error((e as AxiosError)?.message);
	}
});


//Getting Devices
export const getTrendingDevice = cache(async function (): Promise<getAllDevicesProp> {
	try {
		const res = await callAPIWithToken<getAllDevicesProp>(
			'https://api.edify.club/edifybackend/v1/devices/assets?query=trending',
			'GET',
		);

		return res?.data;
	} catch (e) {
		// redirect('/login');
		throw new Error((e as AxiosError)?.message);
	}
});
