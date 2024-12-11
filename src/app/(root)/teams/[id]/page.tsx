import { CombinedContainer } from "@/components/container/container";

import { getTeamById, Team } from "@/server/teamActions";
import { getUsersByTeamId, User } from "@/server/userActions";
import TeamHeader from "./_components/team-header";
import TeamActions from "./_components/team-action";
import TeamMembers from "./_components/team-members";

interface TeamPageProps {
  params: { id: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
  try {
    const data: Team = await getTeamById(params.id);
    const users: User[] = await getUsersByTeamId(params.id);

    return (
      <CombinedContainer title="Teams">
        <div className="bg-white p-8 my-6 mx-8 rounded-3xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <TeamHeader
              image={data?.image ?? "N/A"}
              title={data?.title ?? "N/A"}
              description={data?.description ?? "N/A"}
            />
            <TeamActions teamId={data?._id! ?? "N/A"} />
          </div>
          <TeamMembers users={users} />
        </div>
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Teams">
        <div className="text-red-500">
          Failed to load data. Try again later.
        </div>
      </CombinedContainer>
    );
  }
}
