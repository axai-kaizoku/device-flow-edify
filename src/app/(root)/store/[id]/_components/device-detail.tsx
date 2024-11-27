'use client';
import { addItemToCart } from '@/server/cartActions';
import { Device } from '@/server/deviceActions';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StoreDeviceMain({ data }: { data: Device }) {
	const router = useRouter();
	return (
		<>
			<div className="flex flex-col lg:flex-row gap-12">
				{/* Device Image Section */}
				<div className="lg:w-1/2 w-full flex justify-center items-center">
					<Image
						src={data.image ?? '/media/mac.jpeg'}
						alt={data.device_name}
						width={400}
						height={400}
						className="rounded-lg shadow-lg object-cover"
					/>
				</div>

				{/* Device Details Section */}
				<div className="lg:w-1/2 w-full flex flex-col gap-6">
					<h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
						{data.device_name}
					</h2>

					{/* Device details */}
					<ul className="space-y-3 text-gray-600 dark:text-gray-400">
						<li>
							<strong>Brand:</strong> {data.brand}
						</li>
						<li>
							<strong>Serial Number:</strong> {data.serial_no}
						</li>
						<li>
							<strong>Device Type:</strong> {data.device_type}
						</li>
						<li>
							<strong>Operating System:</strong> {data.os}
						</li>
						<li>
							<strong>Warranty Status:</strong>{' '}
							<span
								className={
									data.warranty_status
										? 'text-green-600 dark:text-green-400'
										: 'text-red-600 dark:text-red-400'
								}>
								{data.warranty_status ? 'Active' : 'Expired'}
							</span>
						</li>
					</ul>

					{/* Pricing Section */}
					<div className="mt-4">
						<span className="text-gray-500 line-through text-lg mr-2">
							₹{data.purchase_value}
						</span>
						<span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
							₹{data.payable}
						</span>
					</div>

					{/* Action Button */}
					<div className="mt-6">
						<button
							onClick={async () => {
								await addItemToCart(data._id, 1);
								router.refresh();
							}}
							className="flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600">
							<ShoppingCart className="mr-2 w-5 h-5" />
							Add to Cart
						</button>
					</div>
				</div>
			</div>

			{/* Device Creation Date */}
			<div className="mt-12">
				<p className="text-gray-500 dark:text-gray-400">
					Device added on: {new Date(data.createdAt!).toLocaleDateString()}
				</p>
			</div>
		</>
	);
}
