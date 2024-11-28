'use client'
import { Team } from '@/server/teamActions';
import Link from 'next/link';
import CreateTeam from './create-team';

interface TeamsMainProps {
    teams:Team[],
    sess:any
}

export default function TeamsMain({ teams, sess }: TeamsMainProps) {
    // const sess = await getSession();
    return (
        <>
            <div className="flex justify-between items-center w-full mb-6 sm:mb-8">
					<input
						className="border rounded-lg px-4 py-2 w-[16rem] sm:w-[18rem] text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-opacity duration-300 opacity-50 focus:opacity-100 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-indigo-400"
						placeholder="Search Teams..."
					/>
					{sess?.user.role === 2 && <CreateTeam />}
			</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {teams.map((team) => (
                    <Link key={team._id} href={`/teams/${team._id}`} className="no-underline">
                        <TeamCard {...team} />
                    </Link>
                ))}
            </div>        
        </>
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
        <div className="relative group w-full h-full rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 p-6 flex flex-col items-center text-center cursor-pointer">
            {/* Image Section */}
            <div className="relative w-24 h-24 mb-4">
                <img
                    src={image || 'https://picsum.photos/300/300'}
                    alt="team-icon"
                    className="w-full h-full object-cover rounded-full shadow-md border-4 border-white dark:border-gray-700 group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Team Information */}
            <div className="flex flex-col items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {title} ({employees_count})
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {description}
                </p>
            </div>

            {/* Subtle background hover effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
        </div>
    );
};
