import { fetchUserHierarchy, HierarchyResponse } from '@/server/userActions';
import Org from './_components/orgChart';
import { Employee, mapEmployeeData } from './_components/data';
//Resolving SSR issue here
const OrgPage = async () => {
	try {
		const heirarchyData: HierarchyResponse = await fetchUserHierarchy();
		const actualData: Employee = mapEmployeeData(heirarchyData[0]);

		return (
			<>
				<Org data={actualData} />
			</>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<div className="text-red-500">
				Failed to load data. Please try again later. <br />{' '}
				<a href="/" className="underline text-blue-500">
					Back to home
				</a>
			</div>
		);
	}
};

export default OrgPage;
