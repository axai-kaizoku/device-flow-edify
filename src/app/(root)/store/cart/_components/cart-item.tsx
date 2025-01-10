"use client";

import { useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import {
  DeviceWithQty,
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/server/cartActions";
import { useRouter } from "next/navigation";

export const CartItem = ({ data }: { data: DeviceWithQty }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(data?.quantity);

  const handleAddToCart = async (device: DeviceWithQty) => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); // Update local quantity first
    await updateCartItemQuantity(device?._id!, newQuantity); // Call API to update quantity
    router.refresh();
  };

  const handleRemoveFromCart = async (device: DeviceWithQty) => {
    const newQuantity: number = quantity > 1 ? quantity - 1 : 0;
    setQuantity(newQuantity); // Update local quantity first
    await updateCartItemQuantity(device?._id!, newQuantity); // Call API to update quantity
    // console.log(newQuantity);
    router.refresh();
  };

  const deleteFromCart = async (device: DeviceWithQty) => {
    // const newQuantity: any = quantity >= 1 && 0;
    setQuantity(0); // Update local quantity first
    await removeItemFromCart(device?._id ?? ""); // Call API to update quantity
    router.refresh();
  };

  return (
    <>
      {quantity >= 1 && (
        <div className="w-full h-fit bg-white px-6 pb-6 flex justify-between items-center">
          <img
            src="/media/CartProduct.png"
            alt="cart-item"
            className="size-32 rounded-lg object-contain cursor-pointer"
            onClick={() => router.push(`/store/${data._id}`)}
          />

          <div className="w-full h-full flex justify-between ml-5">
            <div className="flex flex-col gap-1">
              <span
                className="font-gilroySemiBold text-black text-xl cursor-pointer"
                onClick={() => router.push(`/store/${data._id}`)}
              >
                {data?.device_name ?? ""}
              </span>
              <div className="flex gap-2 items-center -mt-0.5 font-gilroyMedium">
                <span className="text-sm text-[#A2A3B1]">Model:</span>
                <span className="text-base text-[#17183B]">
                  {data?.custom_model ?? ""}
                  i5 5th gen
                </span>
              </div>
              <span className="text-xs text-green-600 font-gilroyMedium">
                Free Shipping
              </span>
            </div>

            <div className="flex flex-col gap-7 items-end">
              <div className="flex items-center gap-2">
                <span className="font-gilroyMedium text-sm line-through">
                  ₹{data?.purchase_value ?? ""}
                </span>
                <span className="text-xl font-gilroySemiBold text-gray-900 dark:text-gray-100">
                  ₹{quantity * data?.payable!}
                </span>
              </div>

              <div className="flex justify-between w-full -mt-3">
                <div className="flex items-center gap-7">
                  <div
                    className="text-base font-gilroySemiBold text-[#E14B4B] cursor-pointer"
                    onClick={() => {
                      deleteFromCart(data);
                    }}
                  >
                    <Trash className="text-black size-[1.3rem]" />
                  </div>
                  <div className="flex justify-between items-center rounded-md ring-1 ring-[#A2A3B1] px-2 h-8 w-28">
                    <Minus
                      className="size-4 text-[#17183B] cursor-pointer"
                      onClick={() => {
                        handleRemoveFromCart(data);
                      }}
                    />

                    <div className="text-base text-[#17183B] font-gilroySemiBold text-center focus:outline-none">
                      {quantity}
                    </div>

                    <Plus
                      className="cursor-pointer size-4 text-[#17183B]"
                      onClick={() => {
                        handleAddToCart(data);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
