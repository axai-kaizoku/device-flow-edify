import { CombinedContainer } from '@/components/container/container';
import TeamTable from './_components/team-table';
import { getTeamById, Team } from '@/server/teamActions';
import EditTeam from './_components/edit-team';
import { Icon } from '@/components/wind/Icons';
import { DeleteTeam } from './_components/delete-team';

interface TeamPageProps {
	params: { id: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
	const data: Team = await getTeamById(params.id);

	return (
		<CombinedContainer
			title={data.title}
			description="Manage your team members and operations effortlessly.">
			<div className="flex justify-end w-full mb-8">
				<input
					className="border rounded-lg px-4 py-2 w-[16rem] text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
					placeholder="Search users..."
				/>
			</div>

			<div className="w-full py-8 px-8 flex justify-between items-center bg-white shadow-md rounded-lg">
				<div className="flex gap-6 items-center">
					<img
						src={data.image}
						alt="team-image"
						className="w-24 h-24 object-cover rounded-full ring-4 ring-indigo-500"
					/>
					<div className="flex flex-col gap-1">
						<span className="text-2xl font-semibold text-gray-800">
							{data.title}
						</span>
						<span className="text-gray-500">{data.description}</span>
					</div>
				</div>
				<div className="flex gap-5">
					<EditTeam
						_id={params.id}
						title={data.title}
						description={data.description}
						image={data.image}>
						<Icon
							type="OutlinedEdit"
							color="gray"
							style={{
								width: '1.5rem',
								height: '1.5rem',
								cursor: 'pointer',
							}}
							// className="w-6 h-6 cursor-pointer hover:text-indigo-500 transition"
						/>
					</EditTeam>
					<DeleteTeam id={params.id}>
						<Icon
							type="OutlinedBin"
							color="red"
							style={{
								width: '1.5rem',
								height: '1.5rem',
								cursor: 'pointer',
							}}
							// className="w-6 h-6 cursor-pointer hover:text-red-600 transition"
						/>
						{/* <Icon type="" color="grey" /> */}
					</DeleteTeam>
				</div>
			</div>

			<div className="mt-12">
				<TeamTable data={[]} />
			</div>
		</CombinedContainer>
	);
}
