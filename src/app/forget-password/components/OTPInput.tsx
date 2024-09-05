import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OTPInputProps {
	userId: string;
}

const OTPInput: React.FC<OTPInputProps> = ({ userId }) => {
	const [otp, setOtp] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async () => {
		if (!otp) {
			setError('OTP is required');
			return;
		}
		if (!password || !confirmPassword) {
			setError('New password and confirm password are required');
			return;
		}
		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
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

			const data = await response.json();

			if (response.ok) {
				// On successful reset, redirect to login page
				router.push('/login');
			} else {
				setError(data.message || 'Invalid OTP or password reset failed');
			}
		} catch (err) {
			setError('Failed to reset password. Please try again.');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-sm">
				<h2 className="text-xl font-semibold mb-4">
					Verify OTP and Reset Password
				</h2>
				<input
					type="text"
					placeholder="Enter OTP"
					className="input input-bordered w-full mb-4"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				/>
				<input
					type="password"
					placeholder="New password"
					className="input input-bordered w-full mb-4"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Confirm password"
					className="input input-bordered w-full mb-4"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<button
					onClick={handleSubmit}
					className="btn btn-primary w-full">
					Verify OTP and Reset Password
				</button>
			</div>
		</div>
	);
};

export default OTPInput;
