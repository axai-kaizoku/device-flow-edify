export const requestPasswordReset = async (email: string) => {
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
};

export const verifyOTP = async (otp: string) => {
	const response = await fetch(
		'https://api.edify.club/edifybackend/v1/auth/verify-otp',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ otp }),
		},
	);
	return response.json();
};

export const resetPassword = async (password: string, token: string) => {
	const response = await fetch(
		'https://api.edify.club/edifybackend/v1/auth/reset-password',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ password }),
		},
	);
	return response.json();
};
