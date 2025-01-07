import TeamTable from "./team-table";
import { User } from "@/server/userActions";

interface TeamMembersProps {
  users: User[];
}

const TeamMembers: React.FC<TeamMembersProps> = ({ users }) => {
  return (
    <div
      className="rounded-2xl flex flex-col "
      style={{ border: "1px solid #F6F6F6" }}
    >
      <div className="flex gap-3 p-3 items-center">
        <h2 className="text-lg pl-3 font-gilroySemiBold text-gray-800">
          Team Members
        </h2>

        <span className="bg-[#F9F5FF] font-gilroySemiBold text-[#6941C6] text-xs px-2 py-1 rounded-full">
          {users?.length
            ? `${users.length} ${users.length > 1 ? "Members" : "Member"}`
            : "N/A"}
        </span>
      </div>
      <TeamTable data={users} />
    </div>
  );
};

export default TeamMembers;
