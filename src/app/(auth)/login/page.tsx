import Image from 'next/image';
import LoginForm from './_components/login-form';

export default function Login() {
	return (
		<div className="border p-8 w-full h-screen justify-evenly lg:p-16 rounded flex flex-col lg:flex-row">
			<div className="hidden">
				<Image
					src="/assets/logo/background.png"
					width={650}
					height={650}
					alt="edify-background"
					quality={100}
				/>
			</div>
			<LoginForm />
		</div>
	);
}
