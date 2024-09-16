'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { RequestOTP, ResetPass } from '@/server/loginActions';

const ForgotPassSchema = z
	.object({
		email: z.string().email().min(5, { message: 'Email is required' }),
		otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' }),
		confirmPassword: z
			.string()
			.min(8, { message: 'Confirm Password must be at least 8 characters' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'], // Path of error
	});

type ForgotPassType = z.infer<typeof ForgotPassSchema>;

export default function ForgotPassForm() {
	const router = useRouter();
	const [uId, setUID] = useState('');
	const [next, setNext] = useState(0);
	const [loading, setLoading] = useState(false);
	const [otp, setOtp] = useState<string>('');

	const form = useForm<ForgotPassType>({
		resolver: zodResolver(ForgotPassSchema),
		mode: 'onTouched',
		defaultValues: { email: '', password: '', confirmPassword: '', otp: '' },
	});

	const handleNext = async () => {
		try {
			setLoading(true);
			const emailState = form.getFieldState('email');
			if (!emailState.invalid) {
				const res = await RequestOTP(form.getValues('email'));
				if (res.userId) {
					setUID(res.userId);
					setNext(1);
					form.clearErrors('root');
				} else {
					form.setError('root', { message: 'Invalid Email ID' });
				}
			}
		} catch (error) {
			form.setError('root', {
				message: 'Something went wrong. Please try again later.',
			});
		} finally {
			setLoading(false);
		}
	};

	const onSubmit = async (data: ForgotPassType) => {
		try {
			setLoading(true);
			const { password, otp } = data;
			if (next === 1) {
				const res = await ResetPass(uId, otp, password);
				if (res.message === 'Invalid or Expired otp') {
					form.setError('root', { message: 'Invalid or Expired OTP' });
				} else {
					router.push('/login');
					router.refresh();
				}
			}
		} catch (error) {
			form.setError('root', {
				message: 'Failed to reset password. Please try again.',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="border h-fit shadow-2xl flex flex-col gap-3 p-6 lg:p-10 rounded w-full lg:w-auto">
			<div className="px-4">
				<h1 className="text-start text-xl font-semibold">Reset Password</h1>
			</div>

			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-3 lg:gap-4 p-4">
				{next === 0 && (
					<div className="flex flex-col relative gap-2 items-start">
						<input
							type="email"
							{...form.register('email')}
							id="email"
							required
							className={`input border ${
								form.formState.errors.email
									? 'border-red-500'
									: 'border-[#bdbdbd]'
							} py-3 px-8 h-14 w-full lg:w-80 rounded focus:outline-none`}
							placeholder=""
							disabled={loading}
						/>
						<label
							htmlFor="email"
							className="label transition-all duration-300 ease-in-out">
							Email
						</label>
					</div>
				)}

				{next === 1 && (
					<>
						<div className="flex flex-col relative gap-2 items-start">
							<input
								id="otp"
								value={otp}
								onChange={(e) => {
									const value = e.target.value;
									if (/^\d{0,6}$/.test(value)) {
										setOtp(value);
										form.setValue('otp', value);
									}
								}}
								required
								type="text"
								maxLength={6}
								className={`input border ${
									form.formState.errors.otp
										? 'border-red-500'
										: 'border-[#bdbdbd]'
								} py-3 px-8 h-14 w-full lg:w-80 rounded focus:outline-none`}
								placeholder=""
								disabled={loading}
							/>
							<label
								htmlFor="otp"
								className="label transition-all duration-300 ease-in-out">
								OTP
							</label>
						</div>

						<div className="flex flex-col relative gap-2 items-start">
							<input
								type="password"
								{...form.register('password')}
								id="password"
								required
								className={`input border ${
									form.formState.errors.password
										? 'border-red-500'
										: 'border-[#bdbdbd]'
								} py-3 px-8 h-14 w-full lg:w-80 rounded focus:outline-none`}
								placeholder=""
								disabled={loading}
							/>
							<label
								htmlFor="password"
								className="label transition-all duration-300 ease-in-out">
								Password
							</label>
						</div>

						<div className="flex flex-col relative gap-2 items-start">
							<input
								type="password"
								{...form.register('confirmPassword')}
								id="cnf-password"
								required
								className={`input border ${
									form.formState.errors.confirmPassword
										? 'border-red-500'
										: 'border-[#bdbdbd]'
								} py-3 px-8 h-14 w-full lg:w-80 rounded focus:outline-none`}
								placeholder=""
								disabled={loading}
							/>
							<label
								htmlFor="cnf-password"
								className="label transition-all duration-300 ease-in-out">
								Confirm Password
							</label>
						</div>
					</>
				)}

				<p
					className={`text-red-400 text-sm ${
						form.formState.errors.root ? 'opacity-100' : 'opacity-0'
					}`}>
					{form.formState.errors.root?.message}
				</p>

				{loading ? (
					<button
						type="button"
						className="border rounded bg-gray-500 text-white p-3"
						disabled>
						Loading...
					</button>
				) : next === 0 ? (
					<button
						type="button"
						onClick={handleNext}
						className="border rounded bg-black text-white p-3">
						NEXT
					</button>
				) : (
					<button
						type="submit"
						className="border rounded bg-black text-white p-3">
						RESET
					</button>
				)}
			</form>

			{next === 0 && (
				<div className="flex justify-center items-center">
					<Link
						href="/login"
						className="border-b">
						Back to Login
					</Link>
				</div>
			)}
		</div>
	);
}
