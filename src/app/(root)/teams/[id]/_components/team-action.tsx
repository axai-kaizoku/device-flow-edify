import { Search, Plus, Trash2 } from "lucide-react";
import { DeleteTeam } from "./delete-team";
import AddTeamMember from "./add-team-member";
import { Team } from "@/server/teamActions";

interface TeamActionsProps {
  team: Team;
}

const TeamActions: React.FC<TeamActionsProps> = ({ team }) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-2 pl-3 pr-12 py-2 border rounded-full text-gray-600 hover:text-black hover:border-black">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search teams"
          className="focus:outline-none bg-transparent text-sm"
        />
      </div>
      <AddTeamMember teamData={team}>
        <div className="flex cursor-pointer items-center gap-2 px-4 py-2 border rounded-full text-gray-600 hover:text-black hover:border-black">
          <Plus size={18} />
          Add member
        </div>
      </AddTeamMember>
      <DeleteTeam id={team?._id ?? ""}>
        <div className="flex items-center gap-2 px-4 py-2 border  rounded-full text-gray-600 hover:text-black hover:border-black">
          <Trash2 size={18} />
          Delete Team
        </div>
      </DeleteTeam>
    </div>
  );
};

export default TeamActions;
