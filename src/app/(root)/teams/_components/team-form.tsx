'use client';

import { Button } from '@/components/wind/Buttons';
import { Form } from '@/components/wind/Form';
import { Input, Textarea } from '@/components/wind/Input';
import { Typography } from '@/components/wind/Typography';
import { createTeam, updateTeam } from '@/server/teamActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TeamFormData {
	'team-name': string;
	'team-description': string;
	image: string;
}

export const TeamForm = ({
	closeBtn,
	isEditForm,
	id,
	title,
	description,
	image,
}: {
	closeBtn: (value: boolean) => void;
	isEditForm?: boolean;
	id?: string;
	title?: string;
	description?: string;
	image?: string;
}) => {
	const router = useRouter();

	// State to manage form data
	const [formData, setFormData] = useState<TeamFormData>({
		'team-name': title ?? '',
		'team-description': description ?? '',
		image: image ?? '',
	});

	// Function to handle form data changes
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Function to handle form submission
	const handleSubmit = async (e: TeamFormData) => {
		if (isEditForm) {
			if (e['team-name'] && e['team-description'] && e['image']) {
				await updateTeam(
					id!,
					e['team-name'],
					e['team-description'],
					e['image'],
				);
				router.refresh();
				closeBtn(false);
			}
		} else {
			if (e['team-name'] && e['team-description'] && e['image']) {
				await createTeam(e['team-name'], e['team-description'], e['image']);
				router.push('/teams');
				router.refresh();
				closeBtn(false);
			}
		}

		// Reset form fields after successful submission
		setFormData({
			'team-name': '',
			'team-description': '',
			image: '',
		});
	};

	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col w-[90%] h-[80%] justify-start items-center">
				<Typography
					variant="h3"
					align="left"
					style={{ width: '100%', padding: '0.8rem 0' }}
					className='dark:text-white'>
					{isEditForm ? 'Edit Team' : 'Create a New Team'}
				</Typography>
				<Form
					width="100%"
					formId="team-form"
					onFormSubmit={() => handleSubmit(formData)}>
					<Input
						label="Team Name"
						rules={{ required: true }}
						width="100%"
						name="team-name"
						value={formData['team-name']}
						onChange={handleChange}
						type="text"
					/>
					<Textarea
						rules={{ required: true }}
						label="Team Description"
						width="100%"
						name="team-description"
						value={formData['team-description']}
						onChange={handleChange}
					/>
					<Input
						label="Image"
						rules={{
							required: true,
							pattern:
								'/https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/',
						}}
						name="image"
						type="text"
						width="100%"
						value={formData.image}
						onChange={handleChange}
					/>
					<div className="flex justify-end">
						<Button
							onClick={() => {}}
							hoverColor="#000000"
							type="submit"
							color="black"
							className='dark:bg-blue-500 dark:hover:bg-blue-600'>
							{isEditForm ? 'Edit Team' : 'Create Team'}
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
