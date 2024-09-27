'use client';

import { Button } from '@/components/wind/Buttons';
import { Form } from '@/components/wind/Form';
import { Input, Textarea } from '@/components/wind/Input';
import { Typography } from '@/components/wind/Typography';
import { createTeam } from '@/server/teamActions';

export const TeamForm = ({ closeBtn }: { closeBtn?: any }) => {
	const handleSubmit = async () => {};

	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col w-[90%] h-[80%] justify-start items-center">
				<Typography
					variant="h3"
					align="left"
					style={{ width: '100%', padding: '0.8rem 0' }}>
					Create a New Team
				</Typography>
				<Form
					width="100%"
					formId="team-form"
					onFormSubmit={async (e) => {
						// console.log(e);
						await createTeam(e['team-name'], e['team-description'], e['image']);
						//   {
						//     "team-name": "asdfasdf",
						//     "team-description": "asdfasdfsadfsa",
						//     "image": "http://localhost:3000/teams"
						// }
					}}>
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
							Submit
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
