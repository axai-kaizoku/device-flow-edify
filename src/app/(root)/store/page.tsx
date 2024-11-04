import { CombinedContainer } from '@/components/container/container';
import { Filter } from 'lucide-react';
import { StoreItem } from './_components/store-item';
import { getStoreDevices } from '@/server/storeActions';
import { CartComponent } from './cart/page';
import {
	Device,
	DeviceResponse,
	getAllDevicesProp,
} from '@/server/deviceActions';
import { DeviceWithQty, getCart } from '@/server/mockedCart';

export default async function Store() {
	try {
		const data: getAllDevicesProp = await getStoreDevices();
		const cart = await getCart();

		const findItemById = (itemId: string) => {
			return cart.items.find((item: DeviceWithQty) => item._id === itemId);
		};

		return (
			<CombinedContainer title="Store">
				<div className="flex justify-between w-full">
					<h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
						Explore Our Collection
					</h1>
					<div className="flex gap-4 items-center">
						<input
							className="border rounded-lg px-4 py-2 w-[16rem] text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400 placeholder-gray-500 focus:ring-2 focus:ring-muted outline-none transition"
							placeholder="Search store .."
						/>
						<Filter className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-800 dark:hover:text-gray-100 transition" />
						<CartComponent />
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-14">
					{data.map((d: Device) => {
						const result = findItemById(d._id);
						return <StoreItem result={result} device={d} key={d._id} />
					})}
				</div>
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="Store">
				<div className="text-red-500 dark:text-red-400">
					Failed to load data. Please try again later.
				</div>
			</CombinedContainer>
		);
	}
}
