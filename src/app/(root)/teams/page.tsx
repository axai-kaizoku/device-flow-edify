import { CombinedContainer } from '@/components/container/container';
import { fetchDeletedTeams, fetchTeams } from '@/server/teamActions';
import CreateTeam from './_components/create-team';
import TeamsMain from './_components/teams-main';
import { getSession } from '@/server/helper';
import TabDisplay from './TabDisplay';

export default async function Teams() {
	try {
		const teams = await fetchTeams();
		const deletedTeams = await fetchDeletedTeams();
		const sess = await getSession();

		return (
			<CombinedContainer title="Teams" description="Manage your teams">
				<TabDisplay
					sess={sess}
					teams={teams}
					deletedTeams={deletedTeams}
				/>
				{/* <TeamsMain teams={teams} /> */}
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="Teams">
				<div className="text-red-500 dark:text-red-400">
					Failed to load data. Please try again later. <br />{' '}
					<a href="/" className="underline text-blue-500">
						Back to home
					</a>
				</div>
			</CombinedContainer>
		);
	}
}
