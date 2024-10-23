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
			<CombinedContainer title="Teams" description="Manage your teams">
				<div className="flex justify-between items-center w-full mb-6 sm:mb-8">
					<input
						className="border rounded-lg px-4 py-2 w-[16rem] sm:w-[18rem] text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-opacity duration-300 opacity-50 focus:opacity-100 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-indigo-400"
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
				<div className="text-red-500 dark:text-red-400">
					Failed to load data. Please try again later.
				</div>
			</CombinedContainer>
		);
	}
}
