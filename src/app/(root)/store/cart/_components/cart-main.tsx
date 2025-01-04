'use client'
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { DeviceWithQty, getCart } from "@/server/cartActions";
import { CartItem } from "./cart-item";
import { coupons } from "./utils";
import { CouponsModal } from "./coupons-modal";
import { CouponCard } from "./coupon-card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartMain = ({cart}:{cart:any}) => {
    const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
    const [couponCode, setCouponCode] = useState<string>("");
    const router = useRouter();

    const handleCouponSelect = (code: string) => {
        setSelectedCoupon(code);
        setCouponCode(code);
    };

    const handleApplyCoupon = (code: string) => {
        setCouponCode(code);
      };

      useEffect(() => {
        const fetchData = async ()=>{
          const cartDetail = await getCart();
          if (cartDetail?.items?.length === 0){
            router.push('/store');
          }
        }
        fetchData();
      },[]);


  return (
    <>
      <div className="flex w-full justify-between h-fit gap-10 bg-white px-12 pb-8">
        <div className="flex-grow flex flex-col mt-[14px]">
          <div className="flex items-center gap-7 mb-10">
            <div>
              <MoveLeft className="size-5" />
            </div>

            <div className="flex items-baseline gap-[18px]">
              <div className="font-gilroySemiBold text-[32px] text-[#17183B]">
                Cart
              </div>
              <div className="text-xl text-[#A2A3B1] font-gilroySemiBold">
                {cart?.items?.reduce(
                  (acc: number, item: DeviceWithQty) => acc + item?.quantity!,
                  0
                )}{" "}
                ITEMS
              </div>
            </div>
          </div>

          <div>
            {cart?.items?.length > 0 ? (
              cart?.items?.map((data: DeviceWithQty, i:number) => (
                <>
                  <CartItem key={i} data={data} />
                  {i < cart?.items?.length - 1 && cart?.items?.length > 1 && (
                    <div className="h-[1px] bg-[#D1D1D8] w-full my-2"></div>
                  )}
                </>
              ))
            ) : (
              <div className="text-gray-700 dark:text-gray-300">
                No items in cart :(
              </div>
            )}
          </div>
        </div>

        <div className="border border-[#D1D1D8] h-fit mt-6 p-8">
          <div className="flex flex-col gap-7">
            <div className="text-[#17183B] text-2xl font-gilroySemiBold min-w-80 ">
              Order Summary
            </div>

            <div className="flex flex-col gap-6 text-[#17183B] font-gilroyMedium text-base">
              <div className="flex justify-between items-center">
                <div>Price</div>
                <div>₹{cart?.totalPrice}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Discount</div>
                <div>₹0</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Shipping</div>
                <div className="text-[#3AA39F]">Free</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Coupon Applied</div>
                <div>₹0</div>
              </div>
            </div>

            <div className="h-[1px] bg-[#D1D1D8] w-full"></div>

            <div className="flex flex-col gap-6 text-[#17183B] font-gilroyMedium text-base">
              <div className="flex justify-between items-center">
                <div>TOTAL</div>
                <div className="font-gilroySemiBold">₹{cart?.totalPrice}</div>
              </div>

              <div className="flex justify-between items-center focus:ring-0">
                <div>Estimated Delivery by</div>
                <div className="font-gilroySemiBold">01 Feb, 2023</div>
              </div>

              <div className="flex justify-between items-center w-full bg-white gap-4 p-4 border border-[#D1D1D8] rounded-[2px]">
                <input
                  type="text"
                  className="w-full focus:outline-none"
                  placeholder="Coupon Code"
                  onChange={(e) => setCouponCode(e?.target?.value)}
                  value={couponCode}
                />
                <CouponsModal
                  triggerLabel={
                    <div className="text-base font-gilroyRegular cursor-pointer text-black text-nowrap">
                      View All
                    </div>
                  }
                  content={
                    <div className="flex flex-col gap-4">
                      {coupons.map((coupon, index) => (
                        <CouponCard coupon={coupon} key={index} 
                        selected={selectedCoupon === coupon?.code}
                        onClick={() => handleCouponSelect(coupon?.code)} 
                        />
                      ))}
                    </div>
                  }
                  onApply={handleApplyCoupon}
                    selectedCouponCode={selectedCoupon || ""}
                />
              </div>

              {cart?.items?.length !== 0 && (
                <div className="flex justify-center items-center w-full">
                  <Link
                    href="/store/cart/checkout"
                    className="text-white font-gilroySemiBold text-base rounded-sm bg-black text-center px-10 py-[18px] w-full"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartMain;
