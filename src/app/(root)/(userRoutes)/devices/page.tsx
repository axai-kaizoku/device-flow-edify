import { CombinedContainer } from '@/components/container/container';
import DeviceContainer from './_components/deviceContainer';
import { DeviceResponse, getDevicesByUserId } from '@/server/deviceActions';
import { getIssueByUserId, IssueResponse } from '@/server/issueActions';

export default async function Devices() {
	const devicesData: DeviceResponse = await getDevicesByUserId(); 
	const issueData: IssueResponse = await getIssueByUserId();
	return (
		<CombinedContainer title="Devices">
			<DeviceContainer devices={devicesData} issues={issueData}/>
		</CombinedContainer>
	);
}
