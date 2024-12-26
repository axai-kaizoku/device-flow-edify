'use client';

import { createOrderId } from '@/server/cartActions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentMethods({
	// data: payments,
	price,
}: {
	// data: any;
	price: number;
}) {
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		// const formData = new FormData(e.currentTarget);
		// const method = formData.get('payment'); // Get the selected payment method
		const res: any = await createOrderId(price, "card");
		const razorpayOrderId = res?.cart?.razorpay_order_id;
		const razorpayPrice = res?.cart?.totalPrice;

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
				if (response?.razorpay_payment_id){
					router.refresh();
					router.push('/store/cart/checkout/payment-success');
				}
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
		rzp1?.open();
	};

	return (
		<form onSubmit={handleSubmit} className='w-full'>
			{/* <div className="mt-4 space-y-2">
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
			</div> */}
			<>
				<button
					type="submit"
					className="text-white font-gilroySemiBold text-base rounded-sm bg-black text-center px-10 py-[18px] w-full">
					Proceed to Pay
				</button>
			</>
		</form>
	);
}
