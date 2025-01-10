// "use client";
// import React, { useEffect, useState } from "react";
import { getStoreDevices } from "@/server/storeActions";
import { DeviceWithQty, getCart } from "@/server/cartActions";
import { StoreDeviceCard } from "../_components/store-device-card";
import { AllProductsMain } from "./_components/main";

export default async function AllProducts() {
  // const [data, setData] = useState<StoreDevice[]>([]);
  // const [cart, setCart] = useState<StoreDevice[]>([]);
  // const [loading, setLoading] = useState(false);
  const data = await getStoreDevices();
  const cart = await getCart();

  // useEffect(() => {
  //   const fetch = async () => {
  //     setLoading(true);
  //     const res = await getStoreDevices();
  //     setData(res);
  //     setLoading(false);
  //   };
  //   fetch();
  // }, []);

  // const findItemQuantityById = (itemId: string): number => {
  //   if (cart?.items?.length > 0) {
  //     //@ts-ignore
  //     return cart.items.reduce((acc: number, item: DeviceWithQty) => {
  //       return item._id === itemId ? acc + (item.quantity || 0) : acc;
  //     }, 0);
  //   }
  //   return 0; // Return 0 if there are no items in the cart
  // };

  return (
    <div className="py-6 px-[5.5rem] flex flex-col gap-9 bg-white">
      {/* <AllProductsFilter /> */}
      {/* {!loading ? (
          data?.map((product) => {
            const res = findItemById(product?._id ?? "");
            return (
              <StoreDeviceCard key={product._id} product={product} res={res} />
            );
          })
        ) : (
          <Spinner />
        )} */}
      {/* <div className="grid grid-cols-4 gap-x-10 gap-y-8 w-full">
    
        {data?.map((product) => {
          const res = findItemQuantityById(product?._id ?? "");
          return (
            <StoreDeviceCard
              key={`${product._id}-unique`}
              product={product}
              res={res}
            />
          );
        })}
      </div> */}
      <AllProductsMain cart={cart} data={data} />
      <div className="pointer-events-none h-[5.5rem] w-full" />
    </div>
  );
}
