import { callAPIWithToken } from './helper';

export type Address = {
	isPrimary?: boolean;
	deleted_at?: string;
	_id?: string;
	city?: string;
	deviceId?: string;
	orgId?: string;
};

export async function getAddress(): Promise<Address[]> {
	try {
		const res = await callAPIWithToken<Address[]>(
			'https://api.edify.club/edifybackend/v1/address',
			'GET',
		);
		return res.data;
	} catch (e: any) {
		throw new Error(e);
	}
}
