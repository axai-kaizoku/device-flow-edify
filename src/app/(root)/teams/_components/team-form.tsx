'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/side-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

export function CreateTeamForm() {
	const form = useForm<TeamType>({
		resolver: zodResolver(TeamSchema),
		mode: 'onSubmit',
		defaultValues: { title: '', image: '', description: '' },
	});

	const onSubmit = (data: TeamType) => {
		// TeamsData(...teams, data);
		console.log('message from form on submit');
		form.reset();
	};
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<button className="px-2 border rounded-md">Create Team + </button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Create Team</SheetTitle>
					</SheetHeader>
					<div className="flex flex-col">
						<Form {...form}>
							<form
								className="w-full space-y-6 rounded p-8"
								onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													placeholder="Title"
													{...field}
													className={
														form.formState.errors.title
															? 'focus-visible:ring-red-500'
															: 'focus-visible:ring-black dark:focus-visible:ring-white'
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<FormLabel>Description</FormLabel>
											<FormControl>
												<textarea
													placeholder="Team Description"
													{...field}
													className={`${
														form.formState.errors.description
															? 'focus-visible:ring-red-500 '
															: 'focus-visible:ring-black  dark:focus-visible:ring-white'
													} p-2 border rounded-md`}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="image"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Image Url</FormLabel>
											<FormControl>
												<Input
													placeholder="Image Url"
													{...field}
													className={
														form.formState.errors.image
															? 'focus-visible:ring-red-500'
															: 'focus-visible:ring-black dark:focus-visible:ring-white'
													}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<SheetFooter>
									<SheetClose>
										<Button type="submit">Submit</Button>
									</SheetClose>
								</SheetFooter>
							</form>
						</Form>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}

export const EditTeamForm = () => {
	const form = useForm<TeamType>({
		resolver: zodResolver(TeamSchema),
		mode: 'onSubmit',
		defaultValues: { title: '', image: '', description: '' },
	});

	const onSubmit = (data: TeamType) => {
		form.reset();
	};
	return (
		<Form {...form}>
			<form
				className="w-full space-y-6 rounded p-8"
				onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Title"
									{...field}
									className={
										form.formState.errors.title
											? 'focus-visible:ring-red-500'
											: 'focus-visible:ring-black dark:focus-visible:ring-white'
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Description</FormLabel>
							<FormControl>
								<textarea
									placeholder="Team Description"
									{...field}
									className={`${
										form.formState.errors.description
											? 'focus-visible:ring-red-500 '
											: 'focus-visible:ring-black  dark:focus-visible:ring-white'
									} p-2 border rounded-md`}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image Url</FormLabel>
							<FormControl>
								<Input
									placeholder="Image Url"
									{...field}
									className={
										form.formState.errors.image
											? 'focus-visible:ring-red-500'
											: 'focus-visible:ring-black dark:focus-visible:ring-white'
									}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<SheetFooter>
					<SheetClose>
						<Button type="submit">Submit</Button>
					</SheetClose>
				</SheetFooter>
			</form>
		</Form>
	);
};
