import { OrdersProps } from '@/app/(root)/orders/components/orderPage'
import React from 'react'
import NewDeviceTable from './_components/newDeviceTable';

const NewDevicesTab = async ({data}:{data:OrdersProps}) => {
    // console.log(data);
  return (
    <div className="flex flex-col gap-12">
		<NewDeviceTable data={data}/>
	</div>
  )
}

export default NewDevicesTab