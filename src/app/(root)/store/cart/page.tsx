import { CombinedContainer } from '@/components/container/container';
import { CartItem } from './_components/cart-item';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '@/server/mockedCart';

export default async function Cart() {
	const cart = await getCart();

	const { subtotal, gst, total } = cart.reduce(
		(acc, item) => {
			const itemTotal = item.purchase_value * item.qty!; // Multiply by qty
			acc.subtotal += itemTotal;
			acc.gst += itemTotal * 0.05;
			acc.total += itemTotal * 1.05;
			return acc;
		},
		{ subtotal: 0, gst: 0, total: 0 },
	);

	return (
		<CombinedContainer title="Cart">
			<h1 className="text-2xl font-semibold tracking-wide text-gray-800">
				Your Shopping Cart
			</h1>
			<p className="text-gray-500 mt-2">Items you&apos;ve added to your cart</p>
			<div className="h-10" />
			<div className="flex sm:flex-row flex-col w-full h-full justify-evenly">
				<div className="flex sm:w-[60%] w-full flex-col gap-6">
					{cart.length > 0 ? (
						cart.map((data, i) => <CartItem key={i} data={data} />)
					) : (
						<div>No items in cart :(</div>
					)}
				</div>
				<div className="w-full flex justify-end items-center sm:w-[30%] h-full">
					<div className="w-full rounded-lg bg-gray-100 h-full p-6">
						<h2 className="text-lg font-semibold mb-4">Order Summary</h2>
						<div className="space-y-2 text-gray-700">
							<div className="flex justify-between">
								<span>Quantity</span>
								<span>
									{cart.reduce((acc, item) => acc + item.qty!, 0)}
								</span>{' '}
								{/* Total quantity */}
								{/* <span>{cart.length}</span> */}
							</div>
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span>${subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>GST</span>
								<span>${gst.toFixed(2)}</span>
							</div>
							<div className="border-t mt-4 pt-2 flex justify-between font-semibold">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>
						</div>
						<button className="p-2 rounded-md w-full mt-6 text-white bg-muted-foreground hover:bg-muted-foreground/90">
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
		</CombinedContainer>
	);
}

export const CartComponent = async () => {
	const cart = await getCart();
	const totalQty = cart.reduce((acc, item) => acc + item.qty!, 0);
	return (
		<Link href="/store/cart" className="relative p-2 rounded-full">
			<div className="w-4 h-4 absolute top-1 right-0 rounded-full bg-slate-600 text-white flex justify-center items-center text-xs">
				{totalQty}
			</div>
			<ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition" />
		</Link>
	);
};
