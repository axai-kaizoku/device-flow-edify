'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import InputField from '@/components/inputs/Input';

const LoginSchema = z.object({
	email: z.string().email().min(5, { message: 'Email is required' }),
	password: z.string().min(8, { message: 'Password should be min 8 chars.' }),
});

export type LoginType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const { data: session } = useSession();

	const form = useForm<LoginType>({
		resolver: zodResolver(LoginSchema),
		mode: 'onSubmit',
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = async (data: LoginType) => {
		const { email, password } = data;

		try {
			const response = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (response?.status === 200) {
				form.clearErrors('root');
				form.clearErrors('email');
				form.clearErrors('password');

				router.push('/');
				router.refresh();
			} else {
				form.setError('root', { message: 'Invalid credentials' });
				form.setError('email', { message: 'Invalid credentials' });
				form.setError('password', { message: 'Invalid credentials' });
			}
		} catch (error) {
			throw new Error();
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="border p-8 w-full h-screen justify-evenly lg:p-16 rounded flex flex-col lg:flex-row">
			<div className="hidden">
				<Image
					src="/logo/background.png"
					width={650}
					height={650}
					alt="edify-background"
					quality={100}
				/>
			</div>
			<div className="border h-fit shadow-2xl flex flex-col gap-3 p-6 lg:p-10 rounded w-full lg:w-auto">
				<div className="px-2">
					<Image
						src="/logo/logo.png"
						width={133}
						height={43}
						alt="edify-logo"
						quality={100}
					/>
				</div>
				<div className="px-4">
					<h1 className="text-start text-sm">LET&apos;S GET YOU STARTED</h1>
				</div>
				<div className="px-4">
					<h1 className="text-start text-xl font-semibold">
						Login to your account
					</h1>
				</div>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6 lg:gap-8 p-4">
					<InputField
						id="email"
						label="Email"
						type="email"
						register={form.register('email')}
						error={form.formState.errors.email}
					/>
					<InputField
						id="password"
						label="Password"
						type="password"
						register={form.register('password')}
						error={form.formState.errors.password}
						showPassword={showPassword}
						togglePasswordVisibility={togglePasswordVisibility}
					/>
					<button
						type="submit"
						className="border rounded bg-black text-white p-3">
						{form.formState.errors.root
							? 'Invalid Credentials. Try Again'
							: 'LOGIN'}
					</button>
					<div className="flex text-sm underline justify-between items-center text-[#616161] dark:text-white">
						<div className="opacity-0"></div>
						<Link href="/login/forgot-password">Forgot Password?</Link>
					</div>
					<div className="flex justify-center items-center">
						<div className="border border-[#E0E0E0] w-[45%]"></div>
						<h1 className="px-3">Or</h1>
						<div className="border border-[#E0E0E0] w-[45%]"></div>
					</div>
					<div
						onClick={() =>
							signIn('google', {
								callbackUrl: 'http://localhost:3000',
								redirect: true,
							})
						}
						className="border gap-12 cursor-pointer hover:border-[#424242] duration-300 border-[#b2b2b2] h-12 flex items-center px-5 justify-center rounded">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="19"
							height="19"
							viewBox="0 0 19 19"
							fill="none">
							<mask
								id="mask0_8061_14285"
								maskUnits="userSpaceOnUse"
								x="0"
								y="0"
								width="19"
								height="19">
								<rect
									x="0.499512"
									y="0.5"
									width="18"
									height="18"
									fill="white"
								/>
							</mask>
							<g mask="url(#mask0_8061_14285)">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M16.8536 8.03113H16.2495V8H9.49951V11H13.7381C13.1198 12.7464 11.4581 14 9.49951 14C7.01439 14 4.99951 11.9851 4.99951 9.5C4.99951 7.01488 7.01439 5 9.49951 5C10.6466 5 11.6903 5.43275 12.4849 6.13963L14.6063 4.01825C13.2668 2.76987 11.475 2 9.49951 2C5.35764 2 1.99951 5.35813 1.99951 9.5C1.99951 13.6419 5.35764 17 9.49951 17C13.6414 17 16.9995 13.6419 16.9995 9.5C16.9995 8.99713 16.9478 8.50625 16.8536 8.03113Z"
									fill="#FFC107"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M2.86426 6.00912L5.32838 7.81625C5.99513 6.1655 7.60988 5 9.49951 5C10.6466 5 11.6903 5.43275 12.4849 6.13962L14.6063 4.01825C13.2668 2.76987 11.475 2 9.49951 2C6.61876 2 4.12051 3.62637 2.86426 6.00912Z"
									fill="#FF3D00"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M9.49951 17C11.4368 17 13.197 16.2586 14.5279 15.053L12.2066 13.0888C11.4536 13.6591 10.5176 14 9.49951 14C7.54876 14 5.89238 12.7561 5.26838 11.0203L2.82263 12.9046C4.06388 15.3335 6.58463 17 9.49951 17Z"
									fill="#4CAF50"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M16.8536 8.03113H16.2495V8H9.49951V11H13.7381C13.4411 11.8389 12.9015 12.5623 12.2055 13.0891C12.2059 13.0888 12.2063 13.0887 12.2066 13.0884L14.5279 15.0526C14.3636 15.2019 16.9995 13.25 16.9995 9.5C16.9995 8.99713 16.9478 8.50625 16.8536 8.03113Z"
									fill="#1976D2"
								/>
							</g>
						</svg>
						<h1 className="text-sm text-[#616161] dark:text-white">
							Sign up with Google
						</h1>
					</div>
				</form>
			</div>
		</div>
	);
}
