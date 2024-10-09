import { CombinedContainer } from '@/components/container/container';
import { fetchTeams } from '@/server/teamActions';
import CreateTeam from './_components/create-team';
import TeamsMain from './_components/teams-main';
import { getSession } from '@/server/helper';

export default async function Teams() {
	try {
		const teams = await fetchTeams();
		const sess = await getSession();

		return (
			<CombinedContainer title="Teams">
				<div className="flex justify-between items-center w-full mb-8">
					<input
						className="border rounded-lg opacity-0 pointer-events-none px-4 py-2 w-[16rem] text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
						placeholder="Search Teams..."
					/>
					{sess?.user.role === 2 && <CreateTeam />}
				</div>
				<TeamsMain teams={teams} />
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="Teams">
				<div className="text-red-500">
					Failed to load data. Please try again later.
				</div>
			</CombinedContainer>
		);
	}
}
