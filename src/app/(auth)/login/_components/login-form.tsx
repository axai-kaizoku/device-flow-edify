import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { login } from '@/app/store/authSlice';
import InputField from '@/components/inputs/Input';
import { Dropdown } from '@/components/dropdown/Dropdown';
// Import the new InputField component

const LoginSchema = z.object({
	email: z.string().email().min(5, { message: 'Email is required' }),
	password: z.string().min(8, { message: 'Password should be min 8 chars.' }),
});

export type LoginType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();
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

				const userData = {
					id: 'dummyUserId',
					name: 'dummyUserName',
					email,
				};
				dispatch(login({ userData }));
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
								callbackUrl: 'http://localhost:3000/dashboard',
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
							{/* Google SVG */}
						</svg>
						<h1 className="text-sm text-[#616161] dark:text-white">
							Sign up with Google
						</h1>
					</div>
					<Dropdown
						items={[
							'option1',
							'option2',
							'option3',
							'option4',
							'option5',
							'option6',
							'option7',
						]}
					/>
				</form>
			</div>
		</div>
	);
}
