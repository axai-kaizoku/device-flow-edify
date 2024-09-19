'use client';
import { CombinedContainer } from '@/components/container/Container';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Cart() {
	return (
		<CombinedContainer title="Cart">
			<h1 className="text-2xl font-semibold tracking-wide text-gray-800">
				Your Shopping Cart
			</h1>
			<p className="text-gray-500 mt-2">Items you&apos;ve added to your cart</p>
			<div className="h-10" />
			<div className="flex sm:flex-row flex-col w-full h-full justify-evenly">
				<div className="flex sm:w-[60%] w-full flex-col gap-6">
					{[...Array(3)].map((_, i) => (
						<CartItem key={i} />
					))}
				</div>
				<div className="w-full flex justify-end items-center sm:w-[30%] h-full">
					<div className="w-full rounded-lg bg-gray-100 h-full p-6">
						<h2 className="text-lg font-semibold mb-4">Order Summary</h2>
						<div className="space-y-2 text-gray-700">
							<div className="flex justify-between">
								<span>Quantity</span>
								<span>3</span>
							</div>
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span>$34,090</span>
							</div>
							<div className="flex justify-between">
								<span>GST</span>
								<span>$900</span>
							</div>
							<div className="border-t mt-4 pt-2 flex justify-between font-semibold">
								<span>Total</span>
								<span>$90,000</span>
							</div>
						</div>
						<Button className="w-full mt-6 text-white bg-muted-foreground hover:bg-muted-foreground/90">
							Proceed to Checkout
						</Button>
					</div>
				</div>
			</div>
		</CombinedContainer>
	);
}

const CartItem = () => {
	const [qty, setQty] = useState(1);
	return (
		<div className="w-full h-fit rounded-lg text-gray-800 bg-white shadow-md p-6 flex items-center justify-between gap-6">
			<div className="w-[6rem] h-[6rem]">
				<Image
					src="/assets/mac.jpeg"
					alt="mac"
					width={225}
					height={225}
					className="rounded-lg object-cover"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<span className="font-medium text-gray-900">Macbook Air</span>
				<span className="text-sm text-gray-500">
					13&apos; Retina display with True Tone technology.
				</span>
			</div>
			<div className="flex items-center gap-2">
				<Minus
					className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800 transition"
					onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
				/>
				<input
					type="text"
					className="bg-gray-100 p-2 w-10 h-8 text-center rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
					value={`${qty}`}
					readOnly
				/>
				<Plus
					className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800 transition"
					onClick={() => setQty(qty + 1)}
				/>
			</div>
			<span className="text-right text-gray-900 font-semibold">$1,500</span>
		</div>
	);
};
