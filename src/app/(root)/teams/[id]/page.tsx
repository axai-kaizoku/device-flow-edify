import { CombinedContainer } from '@/components/container/container';
import TeamTable from './_components/team-table';
import { getTeamById, Team } from '@/server/teamActions';

interface TeamPageProps {
	params: { id: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
	const data: Team = await getTeamById(params.id);

	return (
		<CombinedContainer
			title="Tech Team"
			description="Manage your people in teams">
			<div className="flex justify-end w-full">
				<div className="flex gap-5">
					<input className="border rounded-md p-1" placeholder="Search users" />
				</div>
			</div>
			<div className="h-10" />
			<div className="w-full py-8 flex gap-4">
				<img
					src={data.image}
					alt="Image"
					className="w-20 h-20 rounded-full ring-2 ring-muted"
				/>
				<div className="flex flex-col gap-2">
					<span>{data.title}</span>
					<span>{data.description}</span>
				</div>
			</div>
			{/* <div className="break-words">{JSON.stringify(data)}</div> */}

			<div className="w-full">
				<TeamTable data={[]} />
			</div>
		</CombinedContainer>
	);
}
