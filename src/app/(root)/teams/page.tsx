import { CombinedContainer } from "@/components/container/container";
import { fetchDeletedTeams, fetchTeams } from "@/server/teamActions";
import TabDisplay from "./TabDisplay";
import NotFound from "@/app/not-found";

export default async function Teams() {
  try {
    const teams = await fetchTeams();
    const deletedTeams = await fetchDeletedTeams();

    return (
      <CombinedContainer title="Teams" description="Manage your teams">
        <TabDisplay teams={teams} deletedTeams={deletedTeams} />
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
