import { buttonVariants } from "@/components/buttons/Button";
import { Team } from "@/server/teamActions";
import AddTeamMember from "./add-team-member";
import { DeleteTeam } from "./delete-team";
import InvitePeopleTeam from "./invite-people-team";
import BulkMove from "./new-bulk-move";

interface TeamActionsProps {
  team: Team;
  selectedIds: string[];
  setSelectedIds: (state: any) => void;
}

const TeamActions: React.FC<TeamActionsProps> = ({
  team,
  selectedIds,
  setSelectedIds,
}) => {
  return (
    <div className="flex gap-2 w-full justify-between font-gilroyMedium ">
      {/* <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
        <Search size={20} className="text-[#7F7F7F]" />{" "}
        <input
          className="bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
          placeholder="Search teams"
        />
      </div> */}
      <div className="flex items-center gap-2">
        <div className="flex  items-center rounded-md border py-[7px] px-4 gap-1 ">
          <div className=" text-[#7F7F7F] text-nowrap text-sm font-gilroySemiBold">
            Team Code:{" "}
            <span className="text-black">{team?.team_code ?? ""}</span>
          </div>
        </div>
      </div>
      {/* {JSON.stringify(team)} */}

      <div className="flex gap-2">
        {team?.deleted_at ? (
          <></>
        ) : (
          <>
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
          </>
        )}
        <DeleteTeam id={team?._id ?? ""}>
          <div className={buttonVariants({ variant: "primary" })}>
            <div className="  text-nowrap text-sm font-gilroyMedium">
              Delete Team
            </div>
          </div>
        </DeleteTeam>
        {selectedIds.length > 0 && (
          <BulkMove
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            teamId={team?._id ?? ""}
          >
            <div className={buttonVariants({ variant: "primary" })}>
              <div className="  text-nowrap text-sm font-gilroyMedium">
                Bulk Move
              </div>
            </div>
          </BulkMove>
        )}
      </div>
    </div>
  );
};

export default TeamActions;
