'use client';

import { createOrderId } from '@/server/cartActions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentMethods({
	data: payments,
	price,
}: {
	data: any;
	price: number;
}) {
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const method = formData.get('payment'); // Get the selected payment method
		const res: any = await createOrderId(price, method as string);
		console.log(res);
		const razorpayOrderId = res.cart.razorpay_order_id;
		const razorpayPrice = res.cart.totalPrice;

		handlePayment(razorpayOrderId, razorpayPrice);
		router.refresh();
	};

	useEffect(() => {
		// Load Razorpay script
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		script.async = true;
		document.body.appendChild(script);
	}, []);

	const handlePayment = (orderId: string, totalPrice: number) => {
		const options = {
			key: 'rzp_test_F05ke1JEbCqXlE', // Use your test/live key here
			amount: totalPrice, // Amount in paise
			currency: 'INR',
			name: 'Edify',
			description: 'Order Payment',
			image:
				'https://media.glassdoor.com/sqll/2268419/winuall-squarelogo-1562701582366.png',
			order_id: orderId, // Razorpay order ID from query parameter
			handler: function (response: any) {
				console.log(response); // Handle payment success response
			},
			prefill: {
				name: 'Gaurav Kumar',
				email: 'gaurav.kumar@example.com',
				contact: '9090909090',
			},
			theme: {
				color: '#F37254',
			},
		};
		//@ts-ignore
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mt-4 space-y-2">
				{Object.keys(payments).map((key) => (
					<div key={key} className="flex items-center gap-2">
						<input
							type="radio"
							name="payment"
							value={payments[key].paymentOption}
							id={key}
						/>
						<label
							htmlFor={key}
							className="text-gray-700 w-full rounded p-2 ring-[0.8px] ring-neutral-200 dark:text-gray-300">
							{payments[key].displayString}
						</label>
					</div>
				))}
			</div>
			<div className="mt-10 text-right">
				<button
					type="submit"
					className="p-4 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors">
					Pay ₹{price}
				</button>
			</div>
		</form>
	);
}
