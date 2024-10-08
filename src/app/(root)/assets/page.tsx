import { CombinedContainer } from '@/components/container/container';
import TabDisplay from './TabDisplay';
import { paginatedDevices, DeviceResponse } from '@/server/deviceActions';
import { notFound } from 'next/navigation';

interface AssetsProps {
	searchParams: {
		page?: string;
	};
}

export default async function Assets({ searchParams }: AssetsProps) {
	const page = searchParams.page ? parseInt(searchParams.page) : 1;
	// console.log('page:', page);

	try {
		const devicesResponse: DeviceResponse = await paginatedDevices(
			page.toString(),
		);
		// console.log('device response:', JSON.stringify(devicesResponse, null, 2));
		// console.log('Response currentPage:', devicesResponse.currentPage);
		// console.log('Devices:', devicesResponse.documents);

		if (!devicesResponse.documents.length) {
			notFound();
		}

		return (
			<CombinedContainer title="Assets">
				<TabDisplay
					devices={devicesResponse.documents} // Pass the documents array directly
					currentPage={devicesResponse.currentPage}
					totalPages={devicesResponse.totalPages}
					totalDocuments={devicesResponse.totalDocuments}
					currentDocumentCount={devicesResponse.currentDocumentCount}
					pageSize={devicesResponse.pageSize}
				/>
			</CombinedContainer>
		);
	} catch (error: any) {
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
