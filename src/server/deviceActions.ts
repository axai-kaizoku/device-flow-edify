import { callAPI } from '@/lib/utils';
type Device = {
	userId: string;
	orgId: string;
	device_name: string;
	device_type: string;
	os: string;
	deleted_at: null | string;
	_id: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};
export const createDevices = async <Device>(
	device_type: String,
	device_name: string,
	os: string,
) => {
	const res = await callAPI<Device>(
		'https://api.edify.club/edifybackend/v1/devices',
		'POST',
		{
			device_type: '',
			os: '',
			device_name: '',
		},
		{
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	);
};
