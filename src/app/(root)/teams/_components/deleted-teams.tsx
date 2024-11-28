import { Icon } from '@/components/wind/Icons';
import { Team, updateTeam } from '@/server/teamActions'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function DeletedTeams({ teams } :{teams: Team[]}) {
    // const sess = await getSession();
    const router = useRouter();

    return (
        <>
            <div className="flex justify-between items-center w-full mb-6 sm:mb-8">
					<input
						className="border rounded-lg px-4 py-2 w-[16rem] sm:w-[18rem] text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-opacity duration-300 opacity-50 focus:opacity-100 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:ring-indigo-400"
						placeholder="Search Teams..."
					/>
			</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {teams.map((team:Team) => (
                    <TeamCard team={team} />
                ))}
            </div>        
        </>
    );
}

const TeamCard = ({
    team
}: {team:Team}) => {
    const router = useRouter();

    const permanantDelete = async (team:Team)=> {
        const confirmDelete = confirm(
			"This Team will be deleted permanently. Are you sure you want to delete?"
		);
		if (!confirmDelete) return;
	
		try {
			await updateTeam(team._id, { ...team, orgId: null });
            router.refresh();
		} catch (error) {
			console.error("Error deleting Team:", error);
			alert("Failed to delete the Team. Please try again.");
		}
    }

    const restoreTeam = async (team: Team) => {
		const confirmRestore = confirm("Are you sure you want to restore the Team?");
		if (!confirmRestore) return;
	
		try {
			await updateTeam(team._id, { ...team, deleted_at: null });
            router.refresh();
		} catch (error) {
			console.error("Error restoring Team:", error);
			alert("Failed to restore the Team. Please try again.");
		}
	};

    return (
        <div className="relative group w-full h-full rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 p-6 flex flex-col items-center text-center cursor-pointer">
            {/* Image Section */}
            <div className="relative w-24 h-24 mb-4">
                <img
                    src={team.image || 'https://picsum.photos/300/300'}
                    alt="team-icon"
                    className="w-full h-full object-cover rounded-full shadow-md border-4 border-white dark:border-gray-700 group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Team Information */}
            <div className="flex flex-col items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {team.title} ({team.employees_count})
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {team.description}
                </p>
            </div>

            {/* Overlay with Buttons */}
            <div className="absolute inset-0 bg-slate-300 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <button
                    className="bg-white text-gray-800 py-2 px-4 rounded-lg mx-2 shadow dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
                    onClick={()=>{permanantDelete(team)}} >
                    <Icon type="OutlinedBin" color="black"  style={{cursor:"pointer"}} />
                </button>
                <button
                    className="bg-white text-gray-800 py-2 px-4 rounded-lg mx-2 shadow dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
                    onClick={()=>{restoreTeam(team)}}>
                    <Icon type="OutlinedReset" color="black"  style={{cursor:"pointer"}} />
                </button>
            </div>
        </div>
    );
};
