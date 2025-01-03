"use client";
import {
  ArrowUpRight,
  Info,
  Mail,
  Package,
  Phone,
  Truck,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const DetailSection = () => {
  return (
    <div className="flex justify-between gap-6 h-full">
      <div className="bg-white rounded-[25px] border border-[rgba(195, 195, 195, 0.31)] flex flex-col py-4 px-6 2xl:py-5 2xl:px-7 flex-[60%] h-fit">
        <div className="flex justify-between items-center">
          <div className="text-[#344054] text-xl 2xl:text-[30px] font-gilroySemiBold">
            Order ID: ED003
          </div>
          <button className="flex items-center gap-2 text-[#667085] 2xl:text-[14px] px-3 py-1 2xl:px-4 2xl:py-2 rounded-[8px] border border-[#D0D5DD] font-gilroySemiBold">
            <img
              src="/media/document-text.svg"
              alt="Document Icon"
              className="2xl:w-5 2xl:h-5 w-4 h-4"
            />
            <div className="font-gilroySemiBold">Invoice</div>
          </button>
        </div>

        <div className="my-[25px] flex justify-between items-center">
          <div>
            <span className="font-gilroyMedium text-[13px] 2xl:text-[14px] text-[#667085]">
              Order date:
            </span>{" "}
            <span className="font-gilroySemiBold text-[15px] 2xl:text-base text-[#1D2939]">
              Feb 16, 2024
            </span>
          </div>
          <div className="flex gap-[10.4px] items-center">
            <div className="2xl:text-[16.118px] text-[14px] font-gilroySemiBold text-[#FF8000] rounded-[16.58px] bg-[#FFFACB] py-1 px-4 text-center">
              In transit
            </div>
            <div className="2xl:text-[16.118px] text-[14px] font-gilroySemiBold text-[#027A48] bg-[#ECFDF3] py-1 px-4 rounded-[16.58px]">
              Paid
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[#D0D5DD] w-full"></div>

        <div className="flex flex-col gap-7 2xl:gap-8 my-7 2xl:my-8">
          <div className="flex justify-between">
            <div className="2xl:gap-6 gap-5 flex items-end">
              <div className="flex justify-center items-center rounded-[17px] border border-[#D0D5DD] bg-white 2xl:py-3 py-2 2xl:size-[78.87px] size-[74.87px] mx-auto">
                <img
                  alt="laptop"
                  src={"/media/mac-2.png"}
                  className="2xl:width-[78.87px] width-[74.87px] 2xl:height-[78.87px] height-[74.87px]"
                />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-black font-gilroySemiBold text-[19px] 2xl:text-[23px] -mb-0.5">
                  Macbook Pro 2023
                </div>
                <div className="font-gilroyMedium text-[#7C7C7C] text-[15px]">
                  12GB . 512GB . Black . Serial Number
                </div>
                <div className="text-[12.435px] font-gilroySemiBold text-[#027A48] bg-[#ECFDF3] py-0.5 px-3 rounded-[16.58px]">
                  Laptop
                </div>
              </div>
            </div>

            <div className="2xl:mt-[11.44px] mt-[10.44px]">
              <div className="text-[#1D2939] text-lg 2xl:text-xl font-gilroySemiBold">
                $1000.00
              </div>
              <div className="text-[#667085] text-[14px] 2xl:text-base font-gilroyMedium text-right">
                Qty: 1
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="2xl:gap-6 gap-5 flex items-end">
              <div className="flex justify-center items-center rounded-[17px] border border-[#D0D5DD] bg-white 2xl:py-3 py-2 2xl:size-[78.87px] size-[74.87px] mx-auto">
                <img
                  alt="laptop"
                  src={"/media/mac-2.png"}
                  className="2xl:width-[78.87px] width-[74.87px] 2xl:height-[78.87px] height-[74.87px]"
                />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-black font-gilroySemiBold text-[19px] 2xl:text-[23px] -mb-0.5">
                  Macbook Pro 2023
                </div>
                <div className="font-gilroyMedium text-[#7C7C7C] text-[15px]">
                  12GB . 512GB . Black . Serial Number
                </div>
                <div className="text-[12.435px] font-gilroySemiBold text-[#027A48] bg-[#ECFDF3] py-0.5 px-3 rounded-[16.58px]">
                  Laptop
                </div>
              </div>
            </div>

            <div className="2xl:mt-[11.44px] mt-[10.44px]">
              <div className="text-[#1D2939] text-lg 2xl:text-xl font-gilroySemiBold">
                $1000.00
              </div>
              <div className="text-[#667085] text-[14px] 2xl:text-base font-gilroyMedium text-right">
                Qty: 1
              </div>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-[#D0D5DD] w-full"></div>

        <div className="2xl:my-[27.11px] my-[23.11px] flex justify-between">
          <div className="flex-1 flex flex-col gap-9 2xl:gap-10">
            <div>
              <div className="2xl:text-xl text-lg text-black font-gilroySemiBold mb-1">
                Payment
              </div>
              <div className="2xl:text-[14px] text-[13px] text-[#667085] font-gilroyMedium">
                <div>Visa **56</div>
                <span></span>
              </div>
            </div>

            <div className="flex flex-col 2xl:gap-3 gap-2">
              <div className="2xl:text-xl text-lg text-black font-gilroySemiBold">
                Need Help
              </div>

              <div className="flex flex-col 2xl:gap-3 gap-2 2xl:text-[17px] text-base text-[#667085]">
                <div className="flex gap-[5px] items-center">
                  <Info className="2xl:size-[17px] size-[16px]" />{" "}
                  <span className="font-gilroySemiBold">Order Issues</span>
                  <ArrowUpRight className="2xl:size-[17px] size-[16px]" />
                </div>

                <div className="flex gap-[5px] items-center">
                  <Package className="2xl:size-[17px] size-[16px]" />
                  <span className="font-gilroySemiBold">Returns</span>
                  <ArrowUpRight className="2xl:size-[17px] size-[16px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col 2xl:gap-3 gap-2">
            <div className="2xl:text-xl text-lg text-black font-gilroySemiBold mb-1">
              Order Summary
            </div>

            <div className="flex flex-col gap-3 text-lg 2xl:text-xl text-[#667085] font-gilroySemiBold">
              <div className="flex justify-between">
                <div>Discount</div>
                <div>$0</div>
              </div>

              <div className="flex justify-between">
                <div>Delivery</div>
                <div>$0</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>$0</div>
              </div>
            </div>

            <div className="flex justify-between items-center 2xl:py-4 py-3 border border-dashed border-t-[1px] border-b-0 border-l-0 border-r-0">
              <div className="font-gilroySemiBold 2xl:text-xl text-lg text-[#667085]">
                Total
              </div>
              <div className="font-gilroyBold 2xl:text-xl text-lg text-black">$2000.00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[26.08px] flex-[40%]">
        <div className="bg-white rounded-[25px] border border-[rgba(195, 195, 195, 0.31)] flex flex-col gap-[11px] 2xl:py-5 2xl:px-6 py-4 px-5">
          <div className="text-black font-gilroySemiBold 2xl:text-xl text-lg">
            Customer Info.
          </div>
          <div className="flex 2xl:gap-3 gap-2 items-center text-[#667085]">
            <UserRound className="2xl:size-[27px] size-[23px]" />
            <div className="font-gilroyMedium 2xl:text-lg text-base">Lalithya Sahu</div>
          </div>

          <div className="flex gap-3 items-center text-[#667085]">
            <Phone className="2xl:size-[27px] size-[23px]" />
            <div className="font-gilroyMedium 2xl:text-lg text-base">(+91) 90099 89097</div>
          </div>

          <div className="flex gap-3 items-center text-[#667085]">
            <Mail className="2xl:size-[27px] size-[23px]" />
            <div className="font-gilroyMedium 2xl:text-lg text-base">
              lalithya@winuall.com
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[25px] border border-[rgba(195, 195, 195, 0.31)] flex flex-col gap-[14px] 2xl:py-5 2xl:px-6 py-4 px-5">
          <div className="text-black font-gilroySemiBold 2xl:text-xl text-lg">
            Shipping Address
          </div>
          <div className="flex 2xl:gap-3 gap-2 items-center text-[#667085]">
            <UserRound className="2xl:size-[27px] size-[23px]" />
            <div className="font-gilroyMedium 2xl:text-lg text-base">Lalithya Sahu</div>
          </div>
          <div className="w-3/4 2xl:text-lg text-base font-gilroyMedium text-[#667085] flex flex-col gap-2">
            <div>
              2nd Floor, SRS Arcade, 15/2 Hosa Rd, Kasavanahalli, Bengaluru,
              Karnataka 560035
            </div>
            <div>(+91) 7470873515</div>
          </div>
        </div>
        <div className="bg-white rounded-[25px] border border-[rgba(195, 195, 195, 0.31)] flex flex-col gap-[14px] 2xl:py-5 2xl:px-6 py-4 px-5">
          <div className="text-black font-gilroySemiBold 2xl:text-xl text-lg">
            Billing Address
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
