import { CombinedContainer } from '@/components/container/container';
import { Filter } from 'lucide-react';
import { StoreItem } from './_components/store-item';
import { getStoreDevices } from '@/server/storeActions';
import { CartComponent } from './cart/page';
import { Device } from '@/server/deviceActions';

export default async function Store() {
	const data: any[] = await getStoreDevices();
	return (
		<CombinedContainer title="Store">
			<div className="flex justify-between w-full ">
				<h1 className="text-2xl font-semibold text-gray-800">
					Explore Our Collection
				</h1>
				<div className="flex gap-4 items-center">
					<input
						className="border rounded-lg px-4 py-2 w-[16rem] text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-muted outline-none transition"
						placeholder="Search store .."
					/>
					<Filter className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition" />
					<CartComponent />
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-14">
				{data.map((d: Device, i) => (
					<StoreItem device={d} key={i} />
				))}
			</div>
		</CombinedContainer>
	);
}
