import { CombinedContainer } from '@/components/container/Container';

interface TeamPageProps {
	params: { id: string };
}
export default function TeamPage({ params }: TeamPageProps) {
	const teams = [
		{
			_id: '66e40351b83635490e26bda4',
			title: 'Tech Team',
			size: '8',
			description: 'Tech team description',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-13T09:18:09.972Z',
			updatedAt: '2024-09-13T09:18:09.972Z',
			__v: 0,
		},
		{
			_id: '66e403aeb83635490e26bda7',
			title: 'Finance',
			size: '8',

			description: 'Finance team description',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-13T09:19:42.679Z',
			updatedAt: '2024-09-13T09:19:42.679Z',
			__v: 0,
		},
		{
			_id: '66e7daacb83635490e26bdd3',
			title: 'Display',
			size: '8',

			description: 'Display team desciption',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-16T07:13:48.625Z',
			updatedAt: '2024-09-16T07:13:48.625Z',
			__v: 0,
		},
		{
			_id: '66e7f8fab83635490e26bdf6',
			title: 'Physical QC',
			size: '8',

			description: 'Physical QC description bruh',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-16T09:23:06.437Z',
			updatedAt: '2024-09-16T09:23:06.437Z',
			__v: 0,
		},
	];

	return (
		<CombinedContainer title="Teams Page">
			Teams
			<br />
			{params.id}
			<br />
			<br />
			<div>
				<div className="text-2xl font-medium">Team details</div>
				{teams
					.filter((v) => v._id === params.id)
					.map((v) => (
						<p key={v._id}>{JSON.stringify(v)}</p>
					))}
			</div>
		</CombinedContainer>
	);
}
