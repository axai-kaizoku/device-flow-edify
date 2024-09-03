'use server';

import { LoginType } from '@/app/_components/login-form';

export const updateUserAction = async (data: LoginType) => {
	await new Promise((resolve) => setTimeout(resolve, 3000));
	console.log(data);
};
