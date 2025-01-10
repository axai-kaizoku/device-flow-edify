"use client";

import { Cart, DeviceWithQty } from "@/server/cartActions";
import { StoreDevicesRes } from "@/server/deviceActions";
import { useMemo } from "react";
import { StoreDeviceCard } from "../../_components/store-device-card";

export const AllProductsMain = ({
  data,
  cart,
}: {
  data: StoreDevicesRes;
  cart?: Cart;
}) => {
  const itemQuantities = useMemo(() => {
    const quantities: Record<string, number> = {};
    if (cart?.items?.length! > 0) {
      cart?.items.forEach((item: DeviceWithQty) => {
        quantities[item?._id!] = item.quantity || 0;
      });
    }
    return quantities;
  }, [cart?.items]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a?._id!.localeCompare(b?._id!)); // Example: Sort by name
  }, [data]);

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
    <>
      <div className="grid grid-cols-4 gap-x-10 gap-y-8 w-full">
        {sortedData?.map((product) => (
          <StoreDeviceCard
            key={`${product._id}-unique`}
            product={product}
            res={itemQuantities[product?._id ?? ""] || 0}
          />
        ))}
      </div>
    </>
  );
};
