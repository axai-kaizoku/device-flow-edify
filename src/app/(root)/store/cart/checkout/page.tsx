import { CombinedContainer } from '@/components/container/container';
import { getCart, getPaymentMethods } from '@/server/cartActions';
import Link from 'next/link';
import PaymentMethods from './_components/payment-methods';
import { CheckCircle } from 'lucide-react';

export default async function Checkout() {
	try {
		const cart: any = await getCart();
		const payments: any = await getPaymentMethods(cart.totalPrice);

		return (
			<CombinedContainer title="Checkout">
				{/* Page Title */}
				<h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-gray-200">
					Your Shopping Cart
				</h1>
				<p className="text-gray-500 dark:text-gray-400 mt-2">
					Items you&apos;ve added to your cart
				</p>

				{/* Back to Cart Link */}
				<div className="mt-6">
					<Link
						href="/store/cart"
						className="inline-block p-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
						Back to Cart
					</Link>
				</div>

				<div className="flex mt-8 gap-8">
					{/* Cart Items */}
					<div className="w-2/3">
						<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
							Order Summary
						</h2>
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-4">
							{cart.items.map((item, index) => (
								<div
									key={index}
									className="border-b border-gray-200 dark:border-gray-700 py-4">
									<h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
										{item.device_name} - {item.device_type}
									</h3>
									<p className="text-gray-500 dark:text-gray-400">
										Brand: {item.brand} | Serial No: {item.serial_no}
									</p>
									<p className="text-gray-500 dark:text-gray-400">
										Quantity: {item.quantity} | Price: ₹
										{item.payable.toLocaleString()}
									</p>
								</div>
							))}
							<div className="text-lg font-semibold text-right mt-4">
								Total Price: ₹{cart.totalPrice.toLocaleString()}
							</div>
						</div>
					</div>

					{/* Payment Methods & Address */}
					<div className="w-1/3 flex flex-col gap-6">
						{/* Address Details */}
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
							<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								Shipping Address
							</h2>
							<p className="mt-4 text-gray-700 dark:text-gray-300">
								City: {cart.addressDetails.city}
							</p>
							<p className="text-gray-700 dark:text-gray-300">
								Is Primary: {cart.addressDetails.isPrimary ? 'Yes' : 'No'}
							</p>
						</div>
						{/* Payment Methods */}
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
							<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
								Payment Methods
							</h2>
							<PaymentMethods data={payments} price={cart.totalPrice} />
						</div>
					</div>
				</div>

				<div className="flex mt-8 bg-gray-200 h-[80vh] w-full" id="payment">
					ORDER ID
				</div>
			</CombinedContainer>
		);
	} catch (error) {
		return (
			<CombinedContainer title="Checkout">
				<div className="flex flex-col items-center text-center space-y-6 mt-16">
					{/* Success Icon and Message */}
					<CheckCircle className="text-green-500 text-7xl animate-pulse" />
					<h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
						Payment Successful!
					</h1>
					<p className="text-gray-500 dark:text-gray-400">
						Thank you for your purchase. Your order has been successfully
						placed.
					</p>

					{/* Navigation Options */}
					<div className="flex space-x-4 mt-8">
						<Link
							href="/store"
							className="px-6 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105">
							Back to Store
						</Link>
						<Link
							href="/assets/"
							className="px-6 py-3 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-all transform hover:scale-105">
							View Newly Added Devices
						</Link>
					</div>
				</div>
			</CombinedContainer>
		);
	}
}
