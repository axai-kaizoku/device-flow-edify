'use client';
import { Device } from '@/server/deviceActions';
import { addToCart } from '@/server/mockedCart';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const StoreItem = ({ device }: { device: Device }) => {
	const router = useRouter();
	const handleAddToCart = async () => {
		await addToCart(device);
		router.refresh();
	};
	return (
		<div className="w-full h-fit rounded-lg shadow-lg bg-white p-6 flex flex-col items-center justify-between transition-transform transform hover:scale-105 hover:shadow-xl">
			<Link href={`/store/${device._id}`}>
				<Image
					src={device.image ?? '/media/mac.jpeg'}
					alt={device.device_name}
					width={225}
					height={225}
					className="rounded-lg object-cover"
				/>
			</Link>

			<div className="flex flex-col gap-2 text-center mt-4">
				<span className="text-lg font-medium text-gray-800">
					{device.device_name}
				</span>
				<span className="text-sm text-gray-500">
					{device.custom_model} {device.brand}
				</span>
			</div>
			<span className="font-bold text-xl text-slate-900 mt-2">
				${device.purchase_value}
			</span>

			<button
				onClick={handleAddToCart}
				className="p-2 mt-4 w-full text-black dark:text-white bg-muted hover:bg-muted/95 transition">
				Add to Cart
			</button>
		</div>
	);
};
