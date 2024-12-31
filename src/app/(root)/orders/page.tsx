import { CombinedContainer } from '@/components/container/container';
import React from 'react';
import dynamic from 'next/dynamic';
const TabDisplay = dynamic(() => import("./OrdersTabDisplay"), { ssr: false });


const OrdersPage = async () => {
	try {
		// const orderDetails = await Promise.all(
		// 	prevOrders.map(async (order) => {
		// 		const itemDetails = await getDeviceById(order.itemId);
		// 		return { ...order, item: itemDetails };
		// 	}),
		// );

		return (
			<CombinedContainer title="Orders">
				<TabDisplay/>
				{/* <Orders data={orderDetails.reverse()} /> */}
			</CombinedContainer>
		);
	} catch (error) {
		return (
			<CombinedContainer title="Orders">
				<div className="text-red-500">
					Failed to load data. Please try again later. <br />{' '}
					<a href="/" className="underline text-blue-500">
						Back to home
					</a>
				</div>
			</CombinedContainer>
		);
	}
};

export default OrdersPage;
