"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { DeviceWithQty, updateCartItemQuantity } from "@/server/cartActions";
import { useRouter } from "next/navigation";

export const CartItem = ({ data}: { data: DeviceWithQty}) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(data?.quantity);

  const handleAddToCart = async (device: DeviceWithQty) => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity); // Update local quantity first
    await updateCartItemQuantity(device?._id, newQuantity); // Call API to update quantity
    router.refresh();
  };

  const handleRemoveFromCart = async (device: DeviceWithQty) => {
    const newQuantity: number = quantity > 1 ? quantity - 1 : 0;
    setQuantity(newQuantity); // Update local quantity first
    await updateCartItemQuantity(device?._id, newQuantity); // Call API to update quantity
    // console.log(newQuantity);
    router.refresh();
  };

  const deleteFromCart = async (device: DeviceWithQty) => {
    const newQuantity:any = quantity >= 1 && 0 ;
    setQuantity(newQuantity); // Update local quantity first
    await updateCartItemQuantity(device?._id, newQuantity); // Call API to update quantity
    // console.log(newQuantity);
    router.refresh();
  };

  useEffect(() => {}, []);

  return (
    <>
      {quantity >= 1 && (
        <div className="w-full h-fit bg-white p-6 flex items-start justify-between gap-8">
          <div className="">
            <Image
              src="/media/CartProduct.png"
              alt="mac"
              width={225}
              height={225}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col items-start gap-[22px] w-[70%]">
            <div className="flex justify-between items-center w-full">
              <span className="font-gilroySemiBold text-black text-xl">
                {data?.device_name}
              </span>

              <span className="text-xl font-gilroySemiBold text-gray-900 dark:text-gray-100">
                ₹{quantity * data?.payable}
              </span>
            </div>

            {/* <span className="text-sm text-gray-500 dark:text-gray-400">
              {data.custom_model} {data.brand}
            </span> */}

            <div className="font-gilroySemiBold flex gap-2">
              <span className="text-base text-[#A2A3B1]">Color:</span>
              <span className="text-base text-[#17183B]">Black</span>
            </div>

            <div className="flex items-center gap-7">
              <div className="flex justify-between items-center rounded-[4px] border border-[#A2A3B1] px-4 py-3 gap-10">
                <Minus
                  className="text-xl text-[#17183B] cursor-pointer"
                  onClick={() => {
                    handleRemoveFromCart(data);
                  }}
                />

                <div
                  className="text-xl text-[#17183B] font-gilroySemiBold text-center focus:outline-none"
                >{quantity}</div>

                <Plus
                  className="cursor-pointer text-xl text-[#17183B]"
                  onClick={() => {
                    handleAddToCart(data);
                  }}
                />
              </div>

              <div className="text-base font-gilroySemiBold text-[#E14B4B] cursor-pointer" onClick={()=>{
                deleteFromCart(data);
              }}>Remove</div>
            </div>

          </div>

        </div>
      )}
    </>
  );
};
