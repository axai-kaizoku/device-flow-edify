import { CombinedContainer } from '@/components/container/container';
import { Device, getDeviceById } from '@/server/deviceActions';
import { CartComponent } from '../cart/page';
import StoreDeviceMain from './_components/device-detail';

interface TeamPageProps {
	params: { id: string };
}

export default async function DeviceDetail({ params }: TeamPageProps) {
	try {
		const data: Device = await getDeviceById(params.id);

		return (
			<CombinedContainer title={data.device_name}>
				<div className="flex justify-end w-full ">
					<div className="flex gap-4 items-center ">
						<CartComponent />
					</div>
				</div>
				<StoreDeviceMain data={data} />
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="Device">
				<div className="text-red-500">
					Failed to load data. Please try again later.
				</div>
			</CombinedContainer>
		);
	}
}
