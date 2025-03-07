"use client";
import { useIsMobile } from "@/app/(root)/_landing-page/_components/IsMobileView";
import LoginForm from "./_components/login-form";
import { useRouter } from "next/navigation";

export default function Login() {
  const isMobile = useIsMobile();
  const router = useRouter();
  return (
    <>
      {isMobile ? (
        <div className="px-6 mx-auto w-full flex justify-center items-center h-screen">
          <div className="mx-auto text-center h-fit">
            <div className="flex justify-center">
              <img
                src="/media/landingPage/mobile-login.webp"
                alt="illustration"
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col text-center gap-1">
              <p className="text-xs font-gilroySemiBold">WE’R STILL</p>
              <p className="text-4xl font-gilroyBold text-[#4B8BFF]">
                COOKING OUR APP
              </p>
            </div>

            <div className="text-center flex flex-col text-[#A6A6A6] text-sm font-gilroyMedium -leading-6">
              <span>We’re live on desktop – discover</span>
              <span>seamless browsing!</span>
            </div>

            <div className="w-full flex justify-center">
              <div className="mt-7 text-xs font-gilroyMedium px-4 py-2 rounded-[6.826px] bg-[#1D1F20] text-white w-fit cursor-pointer" onClick={()=> router.push('/')}>
                Go to Home
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen justify-around flex flex-col lg:flex-row p-8 max-lg:p-2">
          <div className="w-[46%] h-full max-lg:hidden">
            <img
              src="/media/Loginpage.webp"
              alt="edify-background"
              width={"100%"}
              className="object-contain"
              style={{ height: 720 }}
            />
          </div>
          <div className="w-[42%] relative h-full justify-center items-center flex flex-col max-lg:w-full">
            <div
              className={`font-gilroy flex w-full flex-col gap-y-[17px] text-center `}
            >
              <div className="flex items-center">
                <div className="flex h-full w-full flex-shrink-0 flex-col justify-center overflow-clip pr-[0.31px] pt-[0.51px] text-center">
                  <div className="flex h-[53px] max-lg:h-fit max-lg:text-4xl flex-shrink-0 items-center justify-center text-[45px] font-bold leading-[53px] tracking-[-1.72px] text-gray-950">
                    <p className="text-center font-gilroyBold">
                      {"Welcome Again! "}
                      <span className="text-[31px] font-gilroySemiBold leading-[53px]">
                        👋
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center px-16 max-lg:px-0 font-gilroyMedium leading-[26px] tracking-[0px] text-zinc-600">
                <p className="text-center text-sm">
                  Log in to access your account and manage your assets
                  effortlessly with DeviceFlow.
                </p>
              </div>
            </div>
            <div className="w-[76%] max-lg:w-full h-fit max-lg:mt-4">
              <LoginForm />
            </div>
            <div className="flex text-xs lg:text-sm absolute max-lg:w-full bottom-10 text-[#9E9E9E] left-9 max-lg:left-4 max-lg:text-center justify-items-start">
              Copyright 2024 Edify All rights Reserved
            </div>
          </div>
        </div>
      )}
    </>
  );
}
