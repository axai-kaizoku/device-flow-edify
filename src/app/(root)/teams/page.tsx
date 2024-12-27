import { CombinedContainer } from "@/components/container/container";
import { fetchDeletedTeams, fetchTeams } from "@/server/teamActions";
import { getSession } from "@/server/helper";
import TabDisplay from "./TabDisplay";
import NotFound from "@/app/not-found";
import UserTeamView from "./_components/user-team-view";

export default async function Teams() {
  try {
    const teams = await fetchTeams();
    const deletedTeams = await fetchDeletedTeams();
    const sess = await getSession();
    const isAdmin = sess?.user?.role === 2;
    // const teamId = "670370b2f95db70c42788288";

    return (
      <CombinedContainer title="Teams" description="Manage your teams">
        {isAdmin ? (
          <TabDisplay sess={sess} teams={teams} deletedTeams={deletedTeams} />
        ) : (
          <UserTeamView />
        )}

        {/* <TeamsMain teams={teams} /> */}
      </CombinedContainer>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <CombinedContainer title="Teams">
        <NotFound />
      </CombinedContainer>
    );
  }
}
