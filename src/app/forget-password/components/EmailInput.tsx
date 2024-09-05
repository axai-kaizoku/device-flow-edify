import React, { useState } from 'react';

interface EmailInputProps {
	onEmailSubmitted: (userId: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onEmailSubmitted }) => {
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
		if (!email) {
			setError('Email is required');
			return;
		}

		try {
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

			const data = await response.json();

			if (response.ok) {
				onEmailSubmitted(data.userId); // Pass userId to the next step
			} else {
				setError(data.message || 'Failed to send OTP');
			}
		} catch (err) {
			setError('Failed to send OTP. Please try again.');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-sm">
				<h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
				<input
					type="email"
					placeholder="Enter your email"
					className="input input-bordered w-full mb-4"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<button
					onClick={handleSubmit}
					className="btn btn-primary w-full">
					Send OTP
				</button>
			</div>
		</div>
	);
};

export default EmailInput;
