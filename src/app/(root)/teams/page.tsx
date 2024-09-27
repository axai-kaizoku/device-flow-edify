import { CombinedContainer } from '@/components/container/container';

import TeamsTable from './_components/teams-table';
import { fetchTeams } from '@/server/teamActions';
import CreateTeam from './_components/create-team';

export default async function Teams() {
	const teams = await fetchTeams();
	console.log(teams);

	return (
		<CombinedContainer title="Teams">
			<div className="flex justify-end w-full">
				<div className="flex gap-5">
					<input
						className="border-2 rounded-md p-2"
						placeholder="Search Teams .."
					/>
					<CreateTeam />
				</div>
			</div>
			<div className="h-10" />
			<div className="w-full">
				<TeamsTable data={teams} />
			</div>
		</CombinedContainer>
	);
}
