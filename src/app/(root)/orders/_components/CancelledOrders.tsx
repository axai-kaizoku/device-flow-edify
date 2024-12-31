// import React from 'react'

// const CancelledOrders = () => {
//   return (
//     <div>CancelledOrders</div>
//   )
// }

// export default CancelledOrders


import { getPreviousOrders } from '@/server/orderActions';
import React from 'react'
import AllOrdersTable from './AllOrdersTable';

const CancelledOrders = async () => {
    const prevOrders = await getPreviousOrders();
  return (
    <>
        <div className="rounded-[33px] border border-[#C3C3C34F] px-5 py-5 bg-white/80 backdrop-blur-[22.8px]">
            <AllOrdersTable data={prevOrders} />
        </div>
    </>
  )
}

export default CancelledOrders