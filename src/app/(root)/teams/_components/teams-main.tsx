import { Team } from '@/server/teamActions';
import Link from 'next/link';

export default function TeamsMain({ teams }: { teams: Team[] }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
			{teams.map((team) => (
				<Link key={team._id} href={`/teams/${team._id}`}>
					<TeamCard {...team} />
				</Link>
			))}
		</div>
	);
}

const TeamCard = ({
	title,
	description,
	image,
	employees_count,
}: {
	title: string;
	description: string;
	image: string;
	employees_count: string;
}) => {
	return (
		<div className="w-full h-full rounded-lg shadow-sm bg-white hover:shadow-md hover:shadow-slate-300 transition-transform transform hover:scale-105 p-6 flex flex-col items-center text-center duration-200">
			<img
				src={image || 'https://picsum.photos/300/300'}
				alt="team-icon"
				className="w-16 h-16 object-cover rounded-full mb-4 border-2 border-slate-500"
			/>
			<div className="flex flex-col gap-2">
				<span className="text-xl font-semibold text-gray-800">
					{title} ({employees_count})
				</span>
				<span className="text-sm text-gray-500">{description}</span>
			</div>
		</div>
	);
};
