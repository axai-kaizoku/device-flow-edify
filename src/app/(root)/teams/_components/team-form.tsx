'use client';

import { Button } from '@/components/wind/Buttons';
import { Form } from '@/components/wind/Form';
import { Input, Textarea } from '@/components/wind/Input';
import { Typography } from '@/components/wind/Typography';
import { createTeam, updateTeam } from '@/server/teamActions';
import { useRouter } from 'next/navigation';

export const TeamForm = ({
	closeBtn,
	isEditForm,
	id,
	title,
	description,
	image,
}: {
	closeBtn?: any;
	isEditForm?: boolean;
	id?: string;
	title?: string;
	description?: string;
	image?: string;
}) => {
	const router = useRouter();

	const data = {
		'team-name': title ?? '',
		'team-description': description ?? '',
		image: image ?? '',
	};

	const handleSubmit = async (e: any) => {
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
				router.refresh();
				closeBtn(false);
			}
		}
	};

	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col w-[90%] h-[80%] justify-start items-center">
				<Typography
					variant="h3"
					align="left"
					style={{ width: '100%', padding: '0.8rem 0' }}>
					{isEditForm ? 'Edit Team' : 'Create a New Team'}
				</Typography>
				<Form
					prefill={{
						'team-name': data['team-name'],
						'team-description': data['team-description'],
						image: data.image,
					}}
					width="100%"
					formId="team-form"
					onFormSubmit={handleSubmit}>
					<Input
						label="Team Name"
						rules={{ required: true }}
						width="100%"
						name="team-name"
						type="text"
					/>
					<Textarea
						rules={{ required: true }}
						label="Team Description"
						width="100%"
						name="team-description"
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
					/>
					<div className="flex justify-end">
						<Button
							onClick={() => {}}
							hoverColor="#000000"
							type="submit"
							color="black">
							{isEditForm ? 'Edit Team' : 'Create Team'}
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
