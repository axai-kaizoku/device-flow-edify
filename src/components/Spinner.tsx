// import { cn } from "@/lib/utils";
// import { cva, VariantProps } from "class-variance-authority";

// const spinnerVariants = cva({
//   variants: {
//     variant: {
//       default:
//         " border-4 border-gray-300 border-t-4 border-t-black rounded-full animate-spin",
//     },
//     size: {
//       default: "size-7",
//       sm: "size-5",
//       lg: "size-8",
//     },
//   },
//   defaultVariants: {
//     variant: "default",
//     size: "default",
//   },
// });

// interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
// 	className?: string;
// }

// const Spinner = ({}:) => {
//   return (
//     <div className="flex justify-center items-center">
//       <div className={cn(spinnerVariants({ variant, size, className }))}></div>
//     </div>
//   );
// };

// export default Spinner;

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

// Define spinner variants using class-variance-authority
export const spinnerVariants = cva(
  "border-4 border-gray-300 rounded-full animate-spin",
  {
    variants: {
      variant: {
        default: "border-t-4 border-t-black",
        light: "border-t-4 border-t-gray-200",
        primary: "border-t-4 border-t-blue-500",
      },
      size: {
        default: "w-7 h-7",
        sm: "w-5 h-5",
        lg: "w-8 h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define the SpinnerProps interface
interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

const Spinner = ({ variant, size, className }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className={cn(spinnerVariants({ variant, size }), className)}></div>
    </div>
  );
};

export default Spinner;
