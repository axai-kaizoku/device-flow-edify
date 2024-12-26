import { CombinedContainer } from "@/components/container/container";
import { getCart, getPaymentMethods } from "@/server/cartActions";
import Link from "next/link";
import PaymentMethods from "./_components/payment-methods";
import { CheckCircle, ChevronRight, MoveLeft, Plus, Tag } from "lucide-react";
import AddressSection from "./_components/addressSection";
import { Address, getAddress } from "@/server/addressActions";
import Image from "next/image";

export default async function Checkout() {
  try {
    const cart: any = await getCart();
    const payments: any = await getPaymentMethods(cart.totalPrice);
    const allAddresses: Address[] = await getAddress();

    return (
      // <div className="flex w-full justify-between border h-fit gap-10 bg-white px-12">
      //   <h1 className="text-3xl font-gilroySemiBold tracking-wide text-gray-800 dark:text-gray-200">
      //     Your Shopping Cart
      //   </h1>
      //   <p className="text-gray-500 dark:text-gray-400 mt-2">
      //     Items you&apos;ve added to your cart
      //   </p>

      //   {/* Back to Cart Link */}
      //   <div className="mt-6">
      //     <Link
      //       href="/store/cart"
      //       className="inline-block p-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      //     >
      //       Back to Cart
      //     </Link>
      //   </div>

      //   <div className="flex mt-8 gap-8">
      //     {/* Cart Items */}
      //     <div className="w-2/3">
      //       <h2 className="text-xl font-gilroySemiBold text-gray-800 dark:text-gray-200">
      //         Order Summary
      //       </h2>
      //       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-4">
      //         {cart.items.map((item: any, i: any) => (
      //           <div
      //             key={i}
      //             className="border-b border-gray-200 dark:border-gray-700 py-4"
      //           >
      //             <h3 className="text-lg font-gilroyMedium text-gray-700 dark:text-gray-300">
      //               {item.device_name} - {item.device_type}
      //             </h3>
      //             <p className="text-gray-500 dark:text-gray-400">
      //               Brand: {item.brand} | Serial No: {item.serial_no}
      //             </p>
      //             <p className="text-gray-500 dark:text-gray-400">
      //               Quantity: {item.quantity} | Price: ₹
      //               {(item.payable * item.quantity).toLocaleString()}
      //             </p>
      //           </div>
      //         ))}
      //         <div className="text-lg font-gilroySemiBold text-right mt-4">
      //           Total Price: ₹{cart.totalPrice.toLocaleString()}
      //         </div>
      //       </div>
      //     </div>

      //     {/* Payment Methods & Address */}
      //     <div className="w-1/3 flex flex-col gap-6">
      //       {/* Address Details */}
      //       <AddressSection cart={cart} allAddresses={allAddresses} />
      //       {/* Payment Methods */}
      //       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      //         <h2 className="text-xl font-gilroySemiBold text-gray-800 dark:text-gray-200">
      //           Payment Methods
      //         </h2>
      //         <PaymentMethods data={payments} price={cart.totalPrice} />
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <>
      <div className="flex w-full justify-between h-auto gap-10 bg-white px-8 pb-8">
        <div className="flex-grow flex flex-col mt-[14px]">
          <div>
            <MoveLeft className="size-5" />
          </div>

          <div className="flex gap-10 items-center mt-10">
            <div className="font-gilroyBold text-2xl text-[#17183B]">Address</div>
            <div>
              <ChevronRight className="size-6 text-[#A2A3B1]"/>
            </div>
            <div className="text-2xl font-gilroyBold text-[#A2A3B1]">Payment</div>
          </div>

          <AddressSection cart={cart} allAddresses={allAddresses} />

        </div>

        <div className="border border-[#EBEBEB] rounded-[9.531px] h-fit mt-2 py-7 px-7">
          <div className="flex flex-col gap-[22.28px]">
            <div className="text-[#17183B] text-[19px] font-gilroyBold min-w-80">
              Order Summary
            </div>

            <div className="flex flex-col gap-4 text-[#17183B] font-gilroyMedium text-base">
              {cart?.items?.map((item: any, i: any) => (
                <div
                  key={i}
                  className="p-[15.25px] flex gap-[15.25px] rounded-[12.391px] bg-[#F6F6F6]"
                >
                  <div>
                    <Image
                      src="/media/CartProduct.png"
                      alt="mac"
                      width={38}
                      height={38}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="font-gilroySemiBold text-black text-[15.25px]">
                      {item?.device_name}
                    </div>
                    <div>
                      <span className="text-[#7F7F7F] text-xs">
                        {item?.quantity} x
                      </span>{" "}
                      <span className="text-sm text-black font-gilroyBold">
                        ₹{item?.payable}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[7.63px]">
              <div className="font-gilroySemiBold text-[13.344px] text-[#545454]">
                Shipment method
              </div>
              <div className="text-base text-black">Free</div>
            </div>

            <div className="flex flex-col gap-[15.25px]">
              <div className="flex justify-between items-center">
                <div className="font-gilroySemiBold text-[15.25px]">
                  Subtotal
                </div>
                <div className="font-gilroySemiBold">₹{cart?.totalPrice}</div>
              </div>

              <div className="flex flex-col gap-[7.63px]">
                <div className="flex justify-between items-center">
                  <div className="font-gilroyRegular text-[15.25px] text-[#545454]">
                    Estimated Tax
                  </div>
                  <div className="font-gilroySemiBold">₹0</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-gilroyRegular text-[15.25px] text-[#545454]">
                    Estimated shipping & Handling
                  </div>
                  <div className="font-gilroySemiBold">₹0</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="font-gilroySemiBold text-[15.25px]">Total</div>
                <div className="font-gilroySemiBold">₹{cart?.totalPrice}</div>
              </div>
            </div>

            {cart?.items?.length !== 0 && (
              <div className="flex justify-center items-center w-full">
                
                  <PaymentMethods 
                  // data={payments} 
                  price={cart?.totalPrice}
                 />
              </div>
            )}
          </div>
        </div>

      </div>
      
    </>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Checkout">
        <div className="flex flex-col items-center text-center space-y-6 mt-16">
          <p className="text-red-600">Some Error Occurred!</p>
        </div>
      </CombinedContainer>
    );
  }
}
