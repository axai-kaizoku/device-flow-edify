'use client';
import React, { useState } from 'react';
import EmailInput from './components/EmailInput';
import OTPInput from './components/OTPInput';

const ForgotPassword: React.FC = () => {
	const [step, setStep] = useState<number>(1);
	const [userId, setUserId] = useState<string>('');

	const handleEmailSubmitted = (userId: string) => {
		setUserId(userId);
		setStep(2);
	};

	return (
		<div className="min-h-screen flex items-center justify-center">
			{step === 1 && <EmailInput onEmailSubmitted={handleEmailSubmitted} />}
			{step === 2 && <OTPInput userId={userId} />}
		</div>
	);
};

export default ForgotPassword;
