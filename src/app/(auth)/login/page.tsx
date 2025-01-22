import LoginForm from "./_components/login-form";

export default function Login() {
  return (
    <div className="w-full h-screen justify-around flex flex-col lg:flex-row p-8 max-lg:p-2">
      <div className="w-[46%] h-full max-lg:hidden">
        <img
          src="/media/Loginpage.webp"
          alt="edify-background"
          width={"100%"}
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
              Log in to access your account and manage your assets effortlessly
              with DeviceFlow.
            </p>
          </div>
        </div>
        <div className="w-[76%] max-lg:w-full h-fit max-lg:mt-4">
          <LoginForm />
        </div>
        <div className="flex text-xs lg:text-sm absolute max-lg:w-full bottom-10 text-[#9E9E9E] left-9 max-lg:left-4 max-lg:text-center justify-items-start">
          Copyright 2024 Edify by Winuall All rights Reserved
        </div>
      </div>
    </div>
  );
}
