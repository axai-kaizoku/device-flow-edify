'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { CreateTeam } from '@/server/actions';

// Update schema for team form
const TeamSchema = z.object({
	title: z.string().min(3, {
		message: 'Title is required and must be at least 3 characters.',
	}),
	description: z.string().min(6, {
		message: 'Description is required and must be at least 6 characters.',
	}),
	image: z.string().url({ message: 'Image URL must be valid.' }),
});

export type TeamType = z.infer<typeof TeamSchema>;

export default function TeamForm() {
	const router = useRouter();

	const form = useForm<TeamType>({
		resolver: zodResolver(TeamSchema),
		mode: 'onSubmit',
		defaultValues: { title: '', description: '', image: '' },
	});

	const onSubmit = async (data: TeamType) => {
		const { title, description, image } = data;

		try {
			// server action
			const res = await CreateTeam(title, description, image);
			if (res) {
				form.clearErrors('root');
				form.clearErrors('title');
				form.clearErrors('description');
				form.clearErrors('image');

				router.refresh();
			} else {
				form.setError('root', { message: 'Submission failed' });
				form.setError('title', { message: 'Invalid title' });
				form.setError('description', { message: 'Invalid description' });
				form.setError('image', { message: 'Invalid image URL' });
			}
		} catch (error) {
			throw new Error();
		}
	};

	return (
		<div className="border p-3 rounded">
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6 lg:gap-8 p-4">
				<input
					id="title"
					type="text"
					placeholder="Team Title"
					{...form.register('title')}
					className="col-span-3 border rounded p-2"
				/>
				<textarea
					placeholder="Team Description"
					{...form.register('description')}
					className="border rounded p-2"
				/>
				<input
					type="text"
					placeholder="Image URL"
					{...form.register('image')}
					className="border rounded p-2"
				/>
				<button
					type="submit"
					className="border rounded bg-black text-white p-3">
					{form.formState.errors.root
						? 'Submission Failed. Try Again'
						: 'SUBMIT TEAM'}
				</button>
			</form>
		</div>
	);
}
