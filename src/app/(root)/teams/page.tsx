import { CombinedContainer } from "@/components/container/container";
import { fetchDeletedTeams, fetchTeams } from "@/server/teamActions";
import { getSession } from "@/server/helper";
import TabDisplay from "./TabDisplay";
import NotFound from "@/app/not-found";

export default async function Teams() {
  try {
    const teams = await fetchTeams();
    const deletedTeams = await fetchDeletedTeams();
    const sess = await getSession();

    return (
      <CombinedContainer title="Teams" description="Manage your teams">
        <TabDisplay sess={sess} teams={teams} deletedTeams={deletedTeams} />
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
