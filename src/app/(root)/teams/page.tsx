import { CombinedContainer } from "@/components/container/container";
import {
  fetchActiveTeams,
  fetchInactiveTeams,
  fetchTeams,
} from "@/server/teamActions";
import TabDisplay from "./TabDisplay";
import NotFound from "@/app/not-found";
import { fetchUserHierarchy, HierarchyResponse } from "@/server/userActions";
import { Employee, mapEmployeeData } from "../_org-chart/_components/data";

export default async function Teams() {
  try {
    const teams = await fetchActiveTeams();
    const deletedTeams = await fetchInactiveTeams();
    const heirarchyData: HierarchyResponse = await fetchUserHierarchy();
    const actualData: Employee = mapEmployeeData(heirarchyData);

    return (
      <CombinedContainer title="Teams" description="Manage your teams">
        {/* {JSON.stringify(deletedTeams)} */}
        <TabDisplay
          teams={teams}
          deletedTeams={deletedTeams}
          orgData={actualData}
        />
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
