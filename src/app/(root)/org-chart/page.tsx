import { fetchUserHierarchy, HierarchyResponse } from '@/server/userActions';
import Org from './_components/orgChart';
import { Employee, mapEmployeeData } from './_components/data';
//Resolving SSR issue here
const OrgPage = async () => {
	const heirarchyData: HierarchyResponse = await fetchUserHierarchy();
	const actualData: Employee = mapEmployeeData(heirarchyData[0]);

	return (
		<>
			<Org data={actualData} />
		</>
	);
};

export default OrgPage;
