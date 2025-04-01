import ForgotPassForm from './_components/forgot-pass-form';

export default function ForgotPasswordPage() {
	return (
		<div className="border p-8 w-full h-screen justify-evenly items-center lg:p-16 max-lg:p-2 rounded  flex flex-col lg:flex-row">
			<ForgotPassForm />
		</div>
	);
}
