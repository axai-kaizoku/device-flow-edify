'use server';

import { callAPI } from '@/lib/utils';
import { AxiosError } from 'axios';

type RequestOTPProps = {
	message: string;
	userId?: string;
};

type RequestDemoProps = {
	name:string;
	email:string;
	company_name:string;
	team_size:string;
	phone:string;
}

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



export async function requestForDemo({name, email, teamSize, cmpname, phone}:{name: string; email: string; teamSize: string; cmpname: string; phone: string;}){
	try {
		const { data } = await callAPI<RequestDemoProps>(
			'https://api.edify.club/edifybackend/v1/auth/user/onboard',
			'POST',
			{
				name,
				email,
				company_name: cmpname,
				team_size: teamSize,
				phone
			},
			{
				'Content-Type': 'application/json',
			},
		);
	
		return data;
		
	} catch (e) {
		throw new Error(
			(e as AxiosError)?.message || "Failed to fetch previous orders"
		  );
	}

}
