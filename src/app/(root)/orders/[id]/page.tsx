import { CombinedContainer } from "@/components/container/container";
import React, { Suspense } from "react";
import DetailsContainer from "./_components/detailsContainer";
import Spinner from "@/components/Spinner";

const OrderDetail = () => {
  return (
    <CombinedContainer title="Order Details">
      <Suspense fallback={<Spinner/>}>
        <DetailsContainer/>
      </Suspense>
    </CombinedContainer>
  );
};

export default OrderDetail;
