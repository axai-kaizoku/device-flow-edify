'use server';

import { callAPI } from '@/lib/utils';

type RequestOTPProps = {
	message: string;
	userId?: string;
};
export async function RequestOTP(email: string): Promise<RequestOTPProps> {
	const { data } = await callAPI<RequestOTPProps>(
		'https://api.edify.club/edifybackend/v1/auth/request-password-reset',
		'POST',
		{ email },
		{
			'Content-Type': 'application/json',
		},
	);

	return data;
}

type ResetPassProps = {
	message: string;
};
export async function ResetPass(
	userId: string,
	otp: string,
	password: string,
): Promise<ResetPassProps> {
	const { data } = await callAPI<ResetPassProps>(
		'https://api.edify.club/edifybackend/v1/auth/verify-otp',
		'POST',
		{
			userId,
			otp,
			newPassword: password,
		},
		{
			'Content-Type': 'application/json',
		},
	);

	return data;
}
