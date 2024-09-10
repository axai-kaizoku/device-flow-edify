import { FC } from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

type InputFieldProps = {
	id: string;
	label: string;
	type: string;

	register: UseFormRegisterReturn;
	error?: FieldError;
	disabled?: boolean;
	showPassword?: boolean;
	togglePasswordVisibility?: () => void;
};

const InputField: FC<InputFieldProps> = ({
	id,
	label,
	type,
	disabled,

	register,
	error,
	showPassword,
	togglePasswordVisibility,
	...props
}) => {
	return (
		<div className="flex flex-col relative gap-2 items-start">
			<input
				type={type === 'password' && showPassword ? 'text' : type}
				id={id}
				{...register}
				className={`input border ${
					error ? 'border-red-500' : 'border-[#bdbdbd]'
				} py-3 px-8 h-14 w-full lg:w-80 rounded focus:outline-none`}
				{...props}
			/>
			<label
				htmlFor={id}
				className="label transition-all duration-300 ease-in-out">
				{label}
			</label>
			{type === 'password' && (
				<div
					className="absolute text-[#bdbdbd] right-4 top-4 cursor-pointer"
					onClick={togglePasswordVisibility}>
					{showPassword ? <EyeOff /> : <Eye />}
				</div>
			)}
		</div>
	);
};

export default InputField;
