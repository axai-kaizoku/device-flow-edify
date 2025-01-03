import LoginForm from "./_components/login-form";

export default function Login() {
  return (
    <div className="w-full h-screen justify-around flex flex-col lg:flex-row p-8">
      <div className="w-[46%]  h-full">
        <img
          src="/media/Loginpage.svg"
          alt="edify-background"
          width={'100%'}
          style={{height: 720}}
        />
      </div>
      <div className="w-[42%] relative h-full justify-center items-center flex flex-col">
      <div
      className={`font-gilroy flex w-full flex-col gap-y-[17px] text-center `}
    >
      <div className="flex items-center">
        <div className="flex h-full w-full flex-shrink-0 flex-col justify-center overflow-clip pr-[0.31px] pt-[0.51px] text-center" >
          <div className="flex h-[53px] flex-shrink-0 items-center justify-center text-[45px] font-bold leading-[53px] tracking-[-1.72px] text-gray-950" >
            <p className="text-center">
              {"Welcome Again! "}
              <span className="text-[31px] font-gilroySemiBold leading-[53px]">
                👋
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-16 font-gilroyMedium leading-[26px] tracking-[0px] text-zinc-600" >
        <p className="text-center" style={{fontSize: 15}}>
          Log in to access your account and manage your assets effortlessly with DeviceFlow.
        </p>
      </div>
    </div>
        <div className="w-[65%] md:w-[65%] lg:w-[65%] h-fit">
          <LoginForm />
        </div>
        <div className="flex text-xs lg:text-sm absolute bottom-10 text-[#9E9E9E] left-9 justify-items-start">
          Copyright 2024 Edify by Winuall All rights Reserved
        </div>
      </div>
    </div>
  );
}
