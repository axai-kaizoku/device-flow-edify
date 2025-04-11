import { Search, Plus, Trash2, Send } from "lucide-react";
import { DeleteTeam } from "./delete-team";
import AddTeamMember from "./add-team-member";
import { Team } from "@/server/teamActions";
import InvitePeopleTeam from "./invite-people-team";
import { buttonVariants } from "@/components/buttons/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";

interface TeamActionsProps {
  team: Team;
}

const TeamActions: React.FC<TeamActionsProps> = ({ team }) => {
  const router = useRouter();
  return (
    <div className="flex gap-2 w-full justify-between font-gilroyMedium ">
      {/* <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
        <Search size={20} className="text-[#7F7F7F]" />{" "}
        <input
          className="bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
          placeholder="Search teams"
        />
      </div> */}
      <div
        className={buttonVariants({
          variant: "outlineTwo",
          className: "size-4 px-[10px] cursor-pointer",
        })}
        onClick={() => router.back()}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} />
        <span className="sr-only">Back Button</span>
      </div>

      <div className="flex gap-2">
        <AddTeamMember teamData={team}>
          <div className={buttonVariants({ variant: "outlineTwo" })}>
            <div className=" group-hover:text-black text-nowrap text-sm font-gilroyMedium">
              Add Members
            </div>
          </div>
        </AddTeamMember>
        <InvitePeopleTeam id={team?._id ?? ""}>
          <div className={buttonVariants({ variant: "outlineTwo" })}>
            <div className=" group-hover:text-black text-nowrap text-sm font-gilroyMedium">
              Invite People
            </div>
          </div>
        </InvitePeopleTeam>
        <DeleteTeam id={team?._id ?? ""}>
          <div className={buttonVariants({ variant: "primary" })}>
            <div className="  text-nowrap text-sm font-gilroyMedium">
              Delete Team
            </div>
          </div>
        </DeleteTeam>
      </div>
    </div>
  );
};

export default TeamActions;
