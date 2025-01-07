import { CombinedContainer } from "@/components/container/container";
import { fetchDeletedTeams, fetchTeams } from "@/server/teamActions";
import TabDisplay from "./TabDisplay";
import NotFound from "@/app/not-found";
import { fetchUserHierarchy, HierarchyResponse } from "@/server/userActions";
import { Employee, mapEmployeeData } from "../_org-chart/_components/data";

export default async function Teams() {
  try {
    const teams = await fetchTeams();
    const deletedTeams = await fetchDeletedTeams();
    const heirarchyData: HierarchyResponse = await fetchUserHierarchy();
		const actualData: Employee = mapEmployeeData(heirarchyData[0]);

    return (
      <CombinedContainer title="Teams" description="Manage your teams">
        <TabDisplay teams={teams} deletedTeams={deletedTeams} orgData = {actualData}/>
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
