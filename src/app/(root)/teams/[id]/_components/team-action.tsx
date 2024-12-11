import { Search, Plus, Trash2 } from "lucide-react";
import { DeleteTeam } from "./delete-team";

interface TeamActionsProps {
  teamId: string;
}

const TeamActions: React.FC<TeamActionsProps> = ({ teamId }) => {
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
      <div className="flex cursor-pointer items-center gap-2 px-4 py-2 border rounded-full text-gray-600 hover:text-black hover:border-black">
        <Plus size={18} />
        Add member
      </div>
      <DeleteTeam id={teamId}>
        <button className="flex items-center gap-2 px-4 py-2 border  rounded-full text-gray-600 hover:text-black hover:border-black">
          <Trash2 size={18} />
          Delete Team
        </button>
      </DeleteTeam>
    </div>
  );
};

export default TeamActions;
