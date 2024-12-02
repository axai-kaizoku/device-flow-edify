import { CombinedContainer } from '@/components/container/container';
import TabDisplay from './TabDisplay';
import { DeviceResponse, getDeviceById } from '@/server/deviceActions';
import { notFound } from 'next/navigation';
import { deletedDevices, filterDevice } from '@/server/filterActions';
import { getPreviousOrders } from '@/server/orderActions';

interface AssetsProps {
	searchParams: {
		page?: string;
	};
}

export default async function Assets() {
	// console.log('page:', page);

	try {
		const devicesResponse: DeviceResponse = await filterDevice();
		const deletedDeviceResponse : DeviceResponse = await deletedDevices();
		const prevOrders = await getPreviousOrders();
		const orderDetails = await Promise.all(
			prevOrders.map(async (order) => {
				const itemDetails = await getDeviceById(order.itemId);
				return { ...order, item: itemDetails };
			}),
		);

		if (!devicesResponse) {
			notFound();
		}

		return (
			<CombinedContainer title="Assets">
				<TabDisplay
					devices={devicesResponse.devices} // Pass the documents array directly
					currentPage={devicesResponse.currentPage}
					totalPages={devicesResponse.totalPages}
					totalDocuments={devicesResponse.totalCount}
					currentDocumentCount={devicesResponse.currentDocumentCount}
					pageSize={devicesResponse.pageSize}
					prevOrders = {orderDetails.reverse()}
					deletedDevices = {deletedDeviceResponse.devices}
				/>
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching devices:', error);
		return (
			<CombinedContainer title="Assets">
				<div className="text-red-500">
					Failed to load devices. Please try again later.
					<br />{' '}
					<a href="/" className="underline text-blue-500">
						Back to home
					</a>
				</div>
			</CombinedContainer>
		);
	}
}
