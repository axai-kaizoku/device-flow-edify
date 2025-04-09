import { CombinedContainer } from "@/components/container/container";
import { NewPageTeams } from "./new-page";

export default function Teams() {
  // const teams = await fetchActiveTeams();
  // const deletedTeams = await fetchInactiveTeams();
  // const heirarchyData: HierarchyResponse = await fetchUserHierarchy();

  return (
    <CombinedContainer title="Teams" description="Manage your teams">
      {/* <TabDisplay
          teams={teams}
          deletedTeams={deletedTeams}
          orgData={heirarchyData}
        /> */}
      <NewPageTeams />
    </CombinedContainer>
  );
}
