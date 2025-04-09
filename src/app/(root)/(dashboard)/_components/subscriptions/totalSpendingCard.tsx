"use client";
import { UserData } from "@/app/store/authSlice";
import { useSelector } from "react-redux";

export default function TotalSpendingCard() {
  const user: UserData = useSelector((state: any) => state.auth.userData);

  return (
    <div className="flex flex-col">
      <div
        className="w-[562px] bg-white h-[362px] rounded-[10px] border border-black/10 flex flex-col justify-start px-[10px] pl-[30px] py-[20px]"
        style={{
          background:
            "linear-gradient(147deg, rgb(13, 155, 0) -47.83%, rgba(13, 155, 0, 0.34) -27.9%, hsl(0deg 0% 100%) 36.95%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 4,
          }}
        >
          <h1 className="font-gilroyBold text-[50px] font-bold tracking-[3px] text-black">
            $1424
            <span className="text-[#D1D1D1] font-gilroyBold text-[30px] font-bold tracking-[1.8px]">
              .87
            </span>
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M10.339 19.0354C15.0974 19.0354 18.9548 15.178 18.9548 10.4196C18.9548 5.66119 15.0974 1.80375 10.339 1.80375C5.58059 1.80375 1.72314 5.66119 1.72314 10.4196C1.72314 15.178 5.58059 19.0354 10.339 19.0354Z"
              fill="#E4FFE1"
            />
            <path
              d="M8.18506 11.712C8.60855 12.1477 9.73574 13.8659 10.339 13.8659L8.18506 11.712ZM12.493 11.712C12.0695 12.1477 10.9423 13.8659 10.339 13.8659L12.493 11.712ZM10.339 13.8659V6.97325V13.8659Z"
              fill="#027A48"
            />
            <path
              d="M8.18506 11.712C8.60855 12.1477 9.73574 13.8659 10.339 13.8659M10.339 13.8659C10.9423 13.8659 12.0695 12.1477 12.493 11.712M10.339 13.8659V6.97325"
              stroke="#027A48"
              stroke-width="1.29238"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="text-[#027A48] font-gilroy text-[14.769px] font-medium leading-none">
            25%
          </span>
        </div>
        <span className="text-[#7F7F7F] font-gilroy text-[11.769px]">
          {" "}
          <span className="text-[#027A48] font-gilroy text-[11.769px] font-medium leading-none">
            25%
          </span>{" "}
          increment compared to last month
        </span>
        <div className="flex gap-4 items-center mt-10">
          <span className="text-[#11263C] text-center font-gilroyBold text-[35px] leading-[46px]">
            564
          </span>
          <span className="text-black font-gilroy-regular text-[18px] font-medium leading-[22px]">
            Seats
          </span>
        </div>
        <div className="flex gap-0 items-center mt-5">
          <div
            style={{
              width: 221,
              height: 10,
              borderRadius: 100,
              background: "#7086FD",
            }}
          />
          <div
            style={{
              width: 108,
              height: 10,
              borderRadius: 100,
              background: "#FFAE4C",
            }}
          />
          <div
            style={{
              width: 78,
              height: 10,
              borderRadius: 100,
              background: "#6FD195",
            }}
          />
          <div
            style={{
              width: 79,
              height: 10,
              borderRadius: 100,
              background: "#FF928A",
            }}
          />
        </div>
        <div className="flex gap-0 items-center justify-around mt-4">
          <div className="flex gap-4 items-start">
            <div
              style={{
                width: 30,
                height: 5,
                borderRadius: 100,
                background: "#7086FD",
                marginTop: 10,
              }}
            />
            <div className="flex gap-2 flex-col">
              <span className="text-black font-gilroy text-[14px] font-medium leading-[22px]">
                Tech
              </span>
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                279 Seats
              </span>
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                $23/Month
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div
              style={{
                width: 30,
                height: 5,
                borderRadius: 100,
                background: "#FFAE4C",
                marginTop: 10,
              }}
            />
            <div className="flex gap-2 flex-col">
              <span className="text-black font-gilroy text-[14px] font-medium leading-[22px]">
                Design
              </span>
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                279 Seats
              </span>
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                $23/Month
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div
              style={{
                width: 30,
                height: 5,
                borderRadius: 100,
                background: "#6FD195",
                marginTop: 10,
              }}
            />
            <div className="flex gap-2 flex-col">
              <span className="text-black font-gilroy text-[14px] font-medium leading-[22px]">
                Sales
              </span>
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                279 Seats
              </span>
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                $23/Month
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div
              style={{
                width: 30,
                height: 5,
                borderRadius: 100,
                background: "#FF928A",
                marginTop: 10,
              }}
            />
            <div className="flex gap-2 flex-col">
              <span className="text-black font-gilroy text-[14px] font-medium leading-[22px]">
                Others
              </span>
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                279 Seats
              </span>
              <span className="text-black font-gilroySemiBold text-[14px] font-medium leading-[22px]">
                $23/Month
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
