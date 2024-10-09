import { CombinedContainer } from '@/components/container/container';
import DeviceContainer from './_components/deviceContainer';
import { DeviceResponse, getDevicesByUserId } from '@/server/deviceActions';
import { getAllResponse, getIssueByUserId, IssueResponse, Issues } from '@/server/issueActions';

export default async function Devices() {
	const devicesData: DeviceResponse = await getDevicesByUserId(); 
	const issueData: getAllResponse = await getIssueByUserId();
	// const data: Issues[] = issueData.documents;
	return (
		<CombinedContainer title="Devices">
			<DeviceContainer devices={devicesData} issues={issueData}/>
		</CombinedContainer>
	);
}
