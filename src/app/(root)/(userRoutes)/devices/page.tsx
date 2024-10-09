import { CombinedContainer } from '@/components/container/container';
import DeviceContainer from './_components/deviceContainer';
import { DeviceResponse, getDevicesByUserId } from '@/server/deviceActions';
import {
	getAllResponse,
	getIssueByUserId,
	IssueResponse,
	Issues,
} from '@/server/issueActions';

export default async function Devices() {
	try {
		const devicesData: DeviceResponse = await getDevicesByUserId();
		const issueData: IssueResponse = await getIssueByUserId();
		return (
			<CombinedContainer title="Devices">
				<DeviceContainer devices={devicesData} issues={issueData} />
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="Devices">
				<div className="text-red-500">
					Failed to load data. Please try again later.
				</div>
			</CombinedContainer>
		);
	}
}
