import LoginForm from "./_components/login-form";

export default function Login() {
  return (
    <div className="w-full h-screen justify-between flex flex-col lg:flex-row p-8">
      <div className="w-[50%]  h-full">
        <img
          src="/media/hands.png"
          alt="edify-background"
          width={'100%'}
          style={{height: 720}}
        />
      </div>
      <div className="w-[50%] relative h-full justify-center items-center flex flex-col">
        <div className="pb-8 lg:pb-20">
          <h1 className="text-[1.4rem] font-gilroySemiBold">
            LOGIN TO YOUR ACCOUNT
          </h1>
        </div>
        <div className="w-[85%] md:w-[70%] lg:w-[44%] h-fit">
          <LoginForm />
        </div>
        <div className="flex text-xs lg:text-sm absolute bottom-10 text-[#9E9E9E] left-9 justify-items-start">
          Copyright 2024 Edify by Winuall All rights Reserved
        </div>
      </div>
    </div>
  );
}
