import { CombinedContainer } from '@/components/container/container';
import React from 'react';
import dynamic from 'next/dynamic';
import NotFound from '@/app/not-found';
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
				<NotFound/>
			</CombinedContainer>
		);
	}
};

export default OrdersPage;
