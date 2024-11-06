import { CombinedContainer } from '@/components/container/container'
import React from 'react'
import Orders from './components/orderPage'
import { getPreviousOrders } from '@/server/orderActions'
import { getDeviceById } from '@/server/deviceActions'

const OrdersPage = async () => {
    try {
        const prevOrders = await getPreviousOrders(); 
        const orderDetails = await Promise.all(
            prevOrders.map(async (order)=>{
                const itemDetails = await getDeviceById(order.itemId);
                return {...order, item:itemDetails}
            })
        );

        return (
            <CombinedContainer title="Orders">
                <Orders data={orderDetails.reverse()}/>
                {/* <div>Hello</div> */}
            </CombinedContainer>
        )
    } catch (error) {
        return (
            <CombinedContainer title="Orders">
                <div className="text-red-500">
					Failed to load data. Please try again later.
				</div>
            </CombinedContainer>
        )
    }
}

export default OrdersPage