import LoginForm from './_components/login-form';

export default function Login() {
	return (
		<div className="w-full h-screen justify-between flex flex-col lg:flex-row">
			<div className="w-full relative lg:block hidden bg-gradient-to-b from-white via-[#C0C0C0]  to-gray-950 lg:w-[33%] h-full">
				<img
					src="/assets/hands.png"
					className="absolute inset-0 h-fit w-fit object-contain"
					alt="edify-background"
				/>
				<div className="flex w-full h-full flex-col justify-between items-center">
					<div className="h-[35%] w-full flex justify-center items-center">
						<img
							src="/assets/logo/logo.png"
							className="w-[250px] h-[80px] object-contain"
							alt="logo"
						/>
					</div>
					<div className="h-[15%] w-full" />
					<div className="justify-center items-center h-[50%] w-full flex flex-col gap-4">
						<div className="text-[2.6rem] font-bold text-center tracking-wide leading-tight text-white">
							Partnership for
							<br /> Business Growth
						</div>
						<div className="font-thin text-center text-lg text-[#BDBDBD]">
							Lorem ipsum dolor sit amet, consectetur
							<br /> adipiscing elit, sed do eiusmod tempor incididun.
						</div>
					</div>
				</div>
			</div>
			<div className="w-full relative lg:w-[67%] h-full justify-center items-center flex flex-col">
				<div className="pb-8 lg:pb-20">
					<h1 className="text-[1.4rem] font-semibold">LOGIN TO YOUR ACCOUNT</h1>
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
