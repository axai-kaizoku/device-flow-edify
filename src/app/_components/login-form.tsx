'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginSchema = z.object({
	email: z.string().email().min(5, { message: 'Email is required' }),
	password: z.string().min(8, { message: 'Password should be min 8 chars.' }),
});

export type LoginType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
	const form = useForm<LoginType>({
		resolver: zodResolver(LoginSchema),
		mode: 'onSubmit',
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = async (data: LoginType) => {
		await signIn('credentials', {
			email: data.email,
			password: data.password,
			callbackUrl: 'http://localhost:3000/dashboard',
			redirect: true,
		});

		form.reset();
	};

	return (
		<div className="border p-4 w-fit rounded">
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-3 p-4">
				<h2>Login Form</h2>
				<div className="flex flex-col gap-2 items-start">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						{...form.register('email')}
						id="email"
						className="border p-1 rounded"
					/>
					{form.formState.errors?.email && (
						<p className="text-red-400 text-sm ">
							{form.formState.errors.email.message}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 items-start">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						{...form.register('password')}
						className="border p-1 rounded"
					/>
					{form.formState.errors?.password && (
						<p className="text-red-400 text-sm ">
							{form.formState.errors.password.message}
						</p>
					)}
				</div>
				<button
					type="submit"
					className="border rounded border-black bg-gray-50 p-3">
					Login
				</button>
			</form>
			<br />
			<div className="border mb-4 " />
			<div>
				<button
					onClick={() =>
						signIn('google', {
							callbackUrl: 'http://localhost:3000/dashboard',
							redirect: true,
						})
					}>
					Sign In with Google
				</button>
			</div>
		</div>
	);
}
