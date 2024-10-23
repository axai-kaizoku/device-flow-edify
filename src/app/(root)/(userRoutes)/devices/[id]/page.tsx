import { CombinedContainer } from '@/components/container/container';
import { Device, getDeviceById } from '@/server/deviceActions';

interface DeviceParam {
	params: { id: string };
}

const Page = async ({ params }: DeviceParam) => {
	const { id } = params;
	const data: Device = await getDeviceById(id);

	return (
		<CombinedContainer title="Device Details">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">

				{/* Left section - Image carousel */}
				<div className="lg:col-span-1 flex justify-center items-center">
					<div className="overflow-hidden rounded-lg shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 group">
						<img
							src={data?.image}
							width={450}
							height={450}
							alt="Device Image"
							className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110"
						/>
					</div>
				</div>

				{/* Middle section - device name, price, key features */}
				<div className="lg:col-span-2">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
						<h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{data?.device_name}</h1>
						<p className="text-lg text-gray-600 dark:text-gray-300">{data?.brand} | {data?.custom_model}</p>

						{/* Price and warranty */}
						<div className="flex items-center space-x-4">
							<p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Price: ${data?.purchase_value}</p>
							<p
								className={`font-semibold px-3 py-1 rounded-md ${
									data?.warranty_status ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
								}`}
							>
								{data?.warranty_status ? 'Warranty Active' : 'Warranty Expired'}
							</p>
						</div>

						{/* Key highlights */}
						<div className="space-y-3">
							<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Key Features:</h2>
							<ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
								<li>Processor: {data?.processor}</li>
								<li>RAM: {data?.ram}</li>
								<li>Storage: {data?.storage}</li>
								<li>Operating System: {data?.os}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Detailed specs in cards */}
			<div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Full Specifications</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Device Information</h3>
						<p className="text-gray-700 dark:text-gray-300">Device Name: {data?.device_name}</p>
						<p className="text-gray-700 dark:text-gray-300">Model: {data?.custom_model}</p>
						<p className="text-gray-700 dark:text-gray-300">Brand: {data?.brand}</p>
					</div>
					<div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">System Specs</h3>
						<p className="text-gray-700 dark:text-gray-300">Processor: {data?.processor}</p>
						<p className="text-gray-700 dark:text-gray-300">RAM: {data?.ram}</p>
						<p className="text-gray-700 dark:text-gray-300">Storage: {data?.storage}</p>
					</div>
					<div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Warranty & Purchase</h3>
						<p className="text-gray-700 dark:text-gray-300">Purchase Date: {data?.device_purchase_date}</p>
						<p className="text-gray-700 dark:text-gray-300">Purchase Order: {data?.purchase_order}</p>
					</div>
					<div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Other Details</h3>
						<p className="text-gray-700 dark:text-gray-300">Serial Number: {data?.serial_no}</p>
						<p className="text-gray-700 dark:text-gray-300">Location: {data?.city}</p>
					</div>
				</div>
			</div>
		</CombinedContainer>
	);
};

export default Page;
