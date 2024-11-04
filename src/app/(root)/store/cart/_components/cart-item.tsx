'use client';

import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { Device } from '@/server/deviceActions';
import { DeviceWithQty, updateCartItemQuantity } from '@/server/mockedCart';
import { useRouter } from 'next/navigation';

export const CartItem = ({ data }: { data: DeviceWithQty }) => {
	const router = useRouter();
	const [quantity, setQuantity] = useState(data.quantity);

	const handleAddToCart = async (device: DeviceWithQty) => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity); // Update local quantity first
		await updateCartItemQuantity(device._id, newQuantity); // Call API to update quantity
		router.refresh();
	};

	const handleRemoveFromCart = async (device: DeviceWithQty) => {
		const newQuantity: number = quantity > 1 ? quantity - 1 : 0; 
		setQuantity(newQuantity); // Update local quantity first
		await updateCartItemQuantity(device._id, newQuantity); // Call API to update quantity
		// console.log(newQuantity);
		router.refresh();
	};

	useEffect(() => {}, []);

	return (
		<>
		{quantity >= 1 && (
		<div className="w-full h-fit rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 shadow-md p-6 flex items-center justify-between gap-6">
			<div className="w-[6rem] h-[6rem]">
				<Image
					src="/media/mac.jpeg"
					alt="mac"
					width={225}
					height={225}
					className="rounded-lg object-cover"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<span className="font-medium text-gray-900 dark:text-gray-100">{data.device_name}</span>
				<span className="text-sm text-gray-500 dark:text-gray-400">
					{data.custom_model} {data.brand}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<Minus
					className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
					onClick={() => {
						handleRemoveFromCart(data);
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
						handleAddToCart(data);
					}}
				/>
			</div>
			<span className="text-right text-gray-900 dark:text-gray-100 font-semibold">
				${quantity * data.purchase_value}
			</span>
		</div>
		)}
		</>
	);
};
