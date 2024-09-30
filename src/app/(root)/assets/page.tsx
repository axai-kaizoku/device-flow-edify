// app/assets/page.tsx

import { CombinedContainer } from '@/components/container/container';
import TabDisplay from './TabDisplay';
import { getAllDevices } from '@/server/deviceActions';

export default async function Assets() {
	try {
		const devices = await getAllDevices();

		return (
			<CombinedContainer title="Assets">
				<TabDisplay devices={devices} />
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching devices:', error);
		return (
			<CombinedContainer title="Assets">
				<div className="text-red-500">
					Failed to load devices. Please try again later.
				</div>
			</CombinedContainer>
		);
	}
}
