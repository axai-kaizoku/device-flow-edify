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
    <div className="flex gap-2 font-gilroyMedium -mb-16">
      {/* <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
        <Search size={20} className="text-[#7F7F7F]" />{" "}
        <input
          className="bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
          placeholder="Search teams"
        />
      </div> */}

      <AddTeamMember teamData={team}>
        <div className="flex  cursor-pointer items-center rounded-lg border border-[rgba(0,0,0,0.2)]  p-[7px]  hover:bg-black hover:text-white hover:border-white group">
          <div className=" group-hover:text-white text-nowrap text-sm font-gilroyMedium">
            Add Memebers
          </div>
        </div>
      </AddTeamMember>
      <InvitePeopleTeam id={team?._id ?? ""}>
        <div className="flex  cursor-pointer items-center rounded-lg border border-[rgba(0,0,0,0.2)]  p-[7px]  hover:bg-black hover:text-white hover:border-white group">
          <div className=" group-hover:text-white text-nowrap text-sm font-gilroyMedium">
            Invite People
          </div>
        </div>
      </InvitePeopleTeam>
      <DeleteTeam id={team?._id ?? ""}>
        <div className="flex  cursor-pointer items-center rounded-lg border border-[rgba(0,0,0,0.2)]  p-[7px]  hover:bg-black hover:text-white hover:border-white group">
          <div className=" group-hover:text-white text-nowrap text-sm font-gilroyMedium">
            Delete Team
          </div>
        </div>
      </DeleteTeam>
    </div>
  );
};

export default TeamActions;
