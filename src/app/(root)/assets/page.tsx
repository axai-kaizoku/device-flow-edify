import { CombinedContainer } from '@/components/container/container';
import TabDisplay from './TabDisplay';
import { paginatedDevices, DeviceResponse } from '@/server/deviceActions';
import { notFound } from 'next/navigation';
import { filterDevice } from '@/server/filterActions';

interface AssetsProps {
	searchParams: {
		page?: string;
	};
}

export default async function Assets() {
	// console.log('page:', page);

	try {
		const devicesResponse: DeviceResponse = await filterDevice();

		if (!devicesResponse) {
			notFound();
		}

		return (
			<CombinedContainer title="Assets">
				<TabDisplay
					devices={devicesResponse.devices} // Pass the documents array directly
					currentPage={devicesResponse.currentPage}
					totalPages={devicesResponse.totalPages}
					totalDocuments={devicesResponse.totalDocuments}
					currentDocumentCount={devicesResponse.currentDocumentCount}
					pageSize={devicesResponse.pageSize}
				/>
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
