'use client';
import { Device } from '@/server/deviceActions';
import { addToCart } from '@/server/mockedCart';
import { Heart, ShoppingCart } from 'lucide-react';
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
						src={data.image ?? '/assets/mac.jpeg'}
						alt={data.device_name}
						width={400}
						height={400}
						className="rounded-lg shadow-lg object-cover"
					/>
				</div>

				{/* Device Details Section */}
				<div className="lg:w-1/2 w-full flex flex-col gap-6">
					<h2 className="text-3xl font-semibold text-gray-800">
						{data.device_name}
					</h2>

					{/* Device details */}
					<ul className="space-y-3 text-gray-600">
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
							<strong>Purchase Value:</strong> ${data.purchase_value}
						</li>
						<li>
							<strong>Warranty Status:</strong>{' '}
							<span
								className={
									data.warranty_status ? 'text-green-600' : 'text-red-600'
								}>
								{data.warranty_status ? 'Active' : 'Expired'}
							</span>
						</li>
					</ul>

					{/* Action Buttons */}
					<div className="flex gap-4 mt-6">
						<button
							onClick={async () => {
								await addToCart(data);
								router.refresh();
							}}
							className="flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
							<ShoppingCart className="mr-2 w-5 h-5" />
							Add to Cart
						</button>

						<button className="flex items-center justify-center bg-gray-200 text-gray-700 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300">
							<Heart className="mr-2 w-5 h-5" />
							Favorite
						</button>
					</div>
				</div>
			</div>

			<div className="mt-12">
				<p className="text-gray-500">
					Device added on: {new Date(data.createdAt!).toLocaleDateString()}
				</p>
			</div>
		</>
	);
}
