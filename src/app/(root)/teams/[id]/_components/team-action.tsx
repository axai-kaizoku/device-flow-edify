import { Search, Plus, Trash2, Send } from "lucide-react";
import { DeleteTeam } from "./delete-team";
import AddTeamMember from "./add-team-member";
import { Team } from "@/server/teamActions";
import InvitePeopleTeam from "./invite-people-team";

interface TeamActionsProps {
  team: Team;
}

const TeamActions: React.FC<TeamActionsProps> = ({ team }) => {
  return (
    <div className="flex gap-4 font-gilroyMedium -mb-16">
      {/* <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
        <Search size={20} className="text-[#7F7F7F]" />{" "}
        <input
          className="bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
          placeholder="Search teams"
        />
      </div> */}

      <AddTeamMember teamData={team}>
        <div className="flex items-center justify-center relative py-1.5 gap-1   pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
          <Plus className="text-[#6C6C6C]  size-5 -mt-1" />
          <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
            Add Members
          </span>
        </div>
      </AddTeamMember>
      <InvitePeopleTeam id={team?._id ?? ""}>
        <div className="flex items-center relative py-1.5 gap-1  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
          <Send className="text-[#6C6C6C]  size-4" />
          <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
            Invite People
          </span>
        </div>
      </InvitePeopleTeam>
      <DeleteTeam id={team?._id ?? ""}>
        <div className="flex items-center justify-center relative py-1.5 gap-2  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
          <Trash2 className="text-[#6C6C6C]  size-4 -mt-1" />
          <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
            Delete Team
          </span>
        </div>
      </DeleteTeam>
    </div>
  );
};

export default TeamActions;
