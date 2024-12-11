import TeamTable from "./team-table";
import { User } from "@/server/userActions";

interface TeamMembersProps {
  users: User[];
}

const TeamMembers: React.FC<TeamMembersProps> = ({ users }) => {
  return (
    <div className="p-4 border rounded-3xl flex flex-col gap-4">
      <div className="flex gap-3 p-6 items-center">
        <h2 className="text-lg font-semibold text-gray-800">Team Members</h2>
        <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
          {users?.length ?? "N/A"} Members
        </span>
      </div>
      <TeamTable data={users} />
    </div>
  );
};

export default TeamMembers;
