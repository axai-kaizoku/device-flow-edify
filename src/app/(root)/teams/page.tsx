import NotFound from "@/app/not-found";
import { CombinedContainer } from "@/components/container/container";
import { fetchActiveTeams, fetchInactiveTeams } from "@/server/teamActions";
import { HierarchyResponse, fetchUserHierarchy } from "@/server/userActions";
import TabDisplay from "./TabDisplay";

export default async function Teams() {
  try {
    const teams = await fetchActiveTeams();
    const deletedTeams = await fetchInactiveTeams();
    const heirarchyData: HierarchyResponse = await fetchUserHierarchy();
   

    return (
      <CombinedContainer title="Teams" description="Manage your teams">
        <TabDisplay
          teams={teams}
          deletedTeams={deletedTeams}
          orgData={heirarchyData}
        />
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Teams">
        <NotFound />
      </CombinedContainer>
    );
  }
}
