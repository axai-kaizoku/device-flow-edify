'use server';

type RequestOTPProps = {
	message: string;
	userId?: string;
};

export async function RequestOTP(email: string): Promise<RequestOTPProps> {
	const response = await fetch(
		'https://api.edify.club/edifybackend/v1/auth/request-password-reset',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		},
	);
	return response.json();
}

type ResetPassProps = {
	message: string;
};

export async function ResetPass(
	userId: string,
	otp: string,
	password: string,
): Promise<ResetPassProps> {
	const response = await fetch(
		'https://api.edify.club/edifybackend/v1/auth/verify-otp',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId,
				otp,
				newPassword: password,
			}),
		},
	);
	return response.json();
}
