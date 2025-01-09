import React from "react";
import DetailSection from "./details-section";
import { getSingleOrder } from "@/server/orderActions";

const DetailsContainer = async ({orderId}:{orderId:string}) => {
  
  const order: any = await getSingleOrder({orderId});
  console.log(order);
  return (
    <>
      <DetailSection order={order}/>
    </>
  );
};

export default DetailsContainer;
