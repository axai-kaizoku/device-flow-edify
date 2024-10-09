'use client';

import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { Device } from '@/server/deviceActions';
import { addToCart, removeFromCart } from '@/server/mockedCart';
import { useRouter } from 'next/navigation';

export const CartItem = ({ data }: { data: Device }) => {
	const router = useRouter();
	const [qty, setQty] = useState(1);

	const handleAddToCart = async (device: any) => {
		await addToCart(device);
		router.refresh();
	};

	const handleRemoveFromCart = async (device: Device) => {
		await removeFromCart(device);
		router.refresh();
	};

	useEffect(() => {}, []);
	return (
		<div className="w-full h-fit rounded-lg text-gray-800 bg-white shadow-md p-6 flex items-center justify-between gap-6">
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
				<span className="font-medium text-gray-900">{data.device_name}</span>
				<span className="text-sm text-gray-500">
					{data.custom_model} {data.brand}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<Minus
					className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800 transition"
					onClick={() => {
						setQty(qty > 1 ? qty - 1 : 1);
						handleRemoveFromCart(data);
					}}
				/>
				<input
					type="text"
					className="bg-gray-100 p-2 w-10 h-8 text-center rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
					value={`${qty}`}
					readOnly
				/>
				<Plus
					className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800 transition"
					onClick={() => {
						setQty(qty + 1);
						handleAddToCart(data);
					}}
				/>
			</div>
			<span className="text-right text-gray-900 font-semibold">
				${qty * data.purchase_value}
			</span>
		</div>
	);
};
