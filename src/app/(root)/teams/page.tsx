import { CombinedContainer } from '@/components/container/container';
import { fetchTeams } from '@/server/teamActions';
import CreateTeam from './_components/create-team';
import TeamsMain from './_components/teams-main';

export default async function Teams() {
	const teams = await fetchTeams();

	if (!teams) {
		return <div>Data Not found</div>;
	}

	return (
		<CombinedContainer title="Teams">
			<div className="flex justify-between items-center w-full mb-8">
				<input
					className="border rounded-lg px-4 py-2 w-[16rem] text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
					placeholder="Search Teams..."
				/>
				<CreateTeam />
			</div>
			<TeamsMain teams={teams} />
		</CombinedContainer>
	);
}
