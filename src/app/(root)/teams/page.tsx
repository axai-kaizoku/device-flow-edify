import { CombinedContainer } from '@/components/container/container';
import { fetchTeams } from '@/server/teamActions';
import CreateTeam from './_components/create-team';
import Link from 'next/link';

export default async function Teams() {
	const teams = await fetchTeams();
	// console.log(teams);

	return (
		<CombinedContainer title="Teams">
			<div className="flex justify-between items-center w-full mb-8">
				<input
					className="border rounded-lg px-4 py-2 w-[16rem] text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
					placeholder="Search Teams..."
				/>
				<CreateTeam />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
				{teams.map((team) => (
					<Link key={team._id} href={`/teams/${team._id}`}>
						<TeamCard {...team} />
					</Link>
				))}
			</div>
		</CombinedContainer>
	);
}

const TeamCard = ({
	title,
	description,
	image,
}: {
	title: string;
	description: string;
	image: string;
}) => {
	return (
		<div className="w-full h-full rounded-lg shadow-sm bg-white hover:shadow-md hover:shadow-slate-300 transition-transform transform hover:scale-105 p-6 flex flex-col items-center text-center duration-200">
			<img
				src={image || 'https://picsum.photos/300/300'}
				alt="team-icon"
				className="w-16 h-16 object-cover rounded-full mb-4 border-2 border-slate-500"
			/>
			<div className="flex flex-col gap-2">
				<span className="text-xl font-semibold text-gray-800">{title}</span>
				<span className="text-sm text-gray-500">{description}</span>
			</div>
		</div>
	);
};
