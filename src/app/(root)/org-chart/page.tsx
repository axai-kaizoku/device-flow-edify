import { fetchUserHierarchy } from '@/server/userActions';
import Org from './_components/orgChart';
import { mapEmployeeData } from './_components/data';
//Resolving SSR issue here
const OrgPage = async () => {
	const heirarchyData: any = await fetchUserHierarchy();
	const actualData = mapEmployeeData(heirarchyData[0]);

	return (
		<>
			<Org data={actualData} />
		</>
	);
};

export default OrgPage;
