'use server';

export async function RequestResetPass() {
	const url =
		'https://api.edify.club/edifybackend/v1/auth/request-password-reset';
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return res;
}
