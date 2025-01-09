import { CombinedContainer } from "@/components/container/container";
import React, { Suspense } from "react";
import DetailsContainer from "./_components/detailsContainer";
import Spinner from "@/components/Spinner";

const OrderDetail = ({params}:{params:{id:string;}}) => {
  return (
    <CombinedContainer title="Order Details">
      <Suspense fallback={<Spinner/>}>
        <DetailsContainer orderId={params.id}/>
      </Suspense>
    </CombinedContainer>
  );
};

export default OrderDetail;
