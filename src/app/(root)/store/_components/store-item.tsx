'use client';
import {
	addItemToCart,
	DeviceWithQty,
	updateCartItemQuantity,
} from '@/server/cartActions';
import { Device } from '@/server/deviceActions';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface StoreItemProps {
	result: DeviceWithQty;
	device: Device;
}

export const StoreItem = ({ result, device }: StoreItemProps) => {
	const router = useRouter();
	const [quantity, setQuantity] = useState<number>(result?.quantity);

	const handleAddToCart = async () => {
		await addItemToCart(device._id, 1, device?.addressId);
		setQuantity(1);
		router.refresh();
	};

	const handleIncrease = async (device: DeviceWithQty) => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity); // Update local quantity first
		await updateCartItemQuantity(device._id, newQuantity); // Call API to update quantity
		router.refresh();
	};

	const handleDecrease = async (device: DeviceWithQty) => {
		const newQuantity: number = quantity > 1 ? quantity - 1 : 0;
		setQuantity(newQuantity); // Update local quantity first
		await updateCartItemQuantity(device._id, newQuantity); // Call API to update quantity
		// console.log(newQuantity);
		router.refresh();
	};

	return (
		<div className="w-full h-fit rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 flex flex-col items-center justify-between transition-transform transform hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-700">
			<Link href={`/store/${device._id}`}>
				<Image
					src={device.image ?? '/media/mac.jpeg'}
					alt={device.device_name}
					width={225}
					height={225}
					className="rounded-lg object-contain h-40"
				/>
			</Link>

			<div className="flex flex-col gap-2 text-center mt-4">
				<span className="text-lg font-medium text-gray-800 dark:text-gray-100">
					{device.device_name}
				</span>
				<span className="text-sm text-gray-500 dark:text-gray-400">
					{device.custom_model} {device.brand}
				</span>
			</div>
			<div className="flex gap-2 w-full  justify-between">
				<span className="font-bold text-xl text-slate-900 dark:text-slate-100">
					₹{device.payable}
				</span>
				<sub className=" text-base text-slate-700 dark:text-slate-300">
					<del>₹{device.purchase_value}</del>
				</sub>
			</div>

			{quantity > 0 ? (
				<div className="flex items-center justify-between mt-4 w-full">
					<Minus
						className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
						onClick={() => {
							handleDecrease(device);
						}}
					/>
					<input
						type="text"
						className="bg-gray-100 dark:bg-gray-700 p-2 w-10 h-8 text-center rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
						value={`${quantity}`}
						readOnly
					/>
					<Plus
						className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
						onClick={() => {
							handleIncrease(device);
						}}
					/>
				</div>
			) : (
				<button
					onClick={handleAddToCart}
					className="p-2 mt-4 w-full text-black dark:text-white bg-muted hover:bg-muted/95 transition dark:bg-blue-500 dark:hover:bg-blue-600">
					Add to Cart
				</button>
			)}
		</div>
	);
};
