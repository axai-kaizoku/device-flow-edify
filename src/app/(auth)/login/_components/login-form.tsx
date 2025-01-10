"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Spinner from "@/components/Spinner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);

      if (response?.status === 200) {
        router.push("/");
        router.refresh();
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-fit w-full flex-col gap-5 sm:gap-6 lg:gap-8 p-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-gilroyMedium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border  p-2 h-[60px] rounded-[8px] border-[#5F5F5F]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-gilroyMedium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="border  p-2 h-[60px] rounded-[8px] border-[#5F5F5F] w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-5 text-sm"
          >
            {showPassword ? (
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.69 11.7C20.57 11.44 17.83 5.25 12 5.25C11.4418 5.24942 10.8851 5.30977 10.34 5.43C10.1604 5.48559 10.0083 5.60656 9.91369 5.76899C9.81908 5.93141 9.78892 6.12343 9.82916 6.30704C9.8694 6.49064 9.97712 6.65244 10.131 6.76041C10.2849 6.86837 10.4736 6.91462 10.66 6.89C11.1007 6.79789 11.5497 6.75098 12 6.75C16.18 6.75 18.58 10.85 19.17 12C18.8103 12.7028 18.3886 13.3721 17.91 14C17.824 14.1107 17.7708 14.2433 17.7564 14.3827C17.7419 14.5221 17.7668 14.6627 17.8282 14.7887C17.8897 14.9147 17.9851 15.0209 18.1039 15.0954C18.2226 15.1699 18.3598 15.2096 18.5 15.21C18.6139 15.2096 18.7262 15.1833 18.8285 15.1331C18.9307 15.0828 19.0201 15.01 19.09 14.92C19.7198 14.1202 20.2566 13.2512 20.69 12.33C20.7338 12.2308 20.7564 12.1235 20.7564 12.015C20.7564 11.9065 20.7338 11.7992 20.69 11.7Z"
                  fill="#000000"
                />
                <path
                  d="M6.52999 5.47003C6.38781 5.33755 6.19976 5.26543 6.00546 5.26885C5.81116 5.27228 5.62578 5.35099 5.48836 5.48841C5.35095 5.62582 5.27224 5.81121 5.26881 6.00551C5.26538 6.19981 5.33751 6.38785 5.46999 6.53003L6.38999 7.45003C5.08727 8.64844 4.03971 10.0973 3.30999 11.71C3.27066 11.8034 3.2504 11.9037 3.2504 12.005C3.2504 12.1064 3.27066 12.2067 3.30999 12.3C3.42999 12.56 6.16999 18.75 12 18.75C13.5593 18.7577 15.0863 18.3056 16.39 17.45L17.47 18.53C17.6106 18.6705 17.8012 18.7494 18 18.7494C18.1987 18.7494 18.3894 18.6705 18.53 18.53C18.6704 18.3894 18.7493 18.1988 18.7493 18C18.7493 17.8013 18.6704 17.6107 18.53 17.47L6.52999 5.47003ZM10.36 11.47L12.57 13.69C12.2603 13.7927 11.9285 13.8097 11.6099 13.7393C11.2913 13.6689 10.9976 13.5137 10.76 13.29C10.518 13.0514 10.3511 12.7472 10.2801 12.4149C10.209 12.0826 10.2368 11.7367 10.36 11.42V11.47ZM12 17.25C7.80999 17.25 5.41999 13.14 4.82999 12C5.48267 10.6863 6.37068 9.50345 7.44999 8.51003L9.23999 10.3C8.85581 10.9209 8.69263 11.6534 8.7769 12.3787C8.86116 13.104 9.18793 13.7795 9.70422 14.2958C10.2205 14.8121 10.8961 15.1389 11.6213 15.2231C12.3466 15.3074 13.0791 15.1442 13.7 14.76L15.31 16.37C14.3052 16.954 13.1622 17.2579 12 17.25Z"
                  fill="#000000"
                />
              </svg>
            ) : (
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 18.75C6.17 18.75 3.43 12.56 3.31 12.3C3.27039 12.2049 3.25 12.103 3.25 12C3.25 11.897 3.27039 11.7951 3.31 11.7C3.43 11.44 6.17 5.25 12 5.25C17.83 5.25 20.57 11.44 20.69 11.7C20.7296 11.7951 20.75 11.897 20.75 12C20.75 12.103 20.7296 12.2049 20.69 12.3C20.57 12.56 17.83 18.75 12 18.75ZM4.83 12C5.42 13.15 7.83 17.25 12 17.25C16.17 17.25 18.58 13.15 19.17 12C18.58 10.85 16.17 6.75 12 6.75C7.83 6.75 5.42 10.85 4.83 12Z"
                  fill="#000000"
                />
                <path
                  d="M12 15.25C11.3572 15.25 10.7289 15.0594 10.1944 14.7023C9.65994 14.3452 9.24338 13.8376 8.99739 13.2437C8.75141 12.6499 8.68705 11.9964 8.81245 11.366C8.93785 10.7355 9.24738 10.1564 9.7019 9.7019C10.1564 9.24738 10.7355 8.93785 11.366 8.81245C11.9964 8.68705 12.6499 8.75141 13.2437 8.99739C13.8376 9.24338 14.3452 9.65994 14.7023 10.1944C15.0594 10.7289 15.25 11.3572 15.25 12C15.2474 12.8611 14.9041 13.6863 14.2952 14.2952C13.6863 14.9041 12.8611 15.2474 12 15.25ZM12 10.25C11.6539 10.25 11.3155 10.3526 11.0278 10.5449C10.74 10.7372 10.5157 11.0105 10.3832 11.3303C10.2508 11.6501 10.2161 12.0019 10.2836 12.3414C10.3512 12.6809 10.5178 12.9927 10.7626 13.2374C11.0073 13.4822 11.3191 13.6489 11.6586 13.7164C11.9981 13.7839 12.3499 13.7492 12.6697 13.6168C12.9895 13.4843 13.2628 13.26 13.4551 12.9722C13.6474 12.6845 13.75 12.3461 13.75 12C13.7474 11.5367 13.5622 11.0931 13.2345 10.7655C12.9069 10.4378 12.4633 10.2526 12 10.25Z"
                  fill="#000000"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        className="border rounded-[10px] h-[56px] bg-black text-white p-4"
      >
        {loading ? <Spinner size="sm" /> : "Login"}
      </button>

      <div className="flex text-[0.8rem] underline justify-between items-center text-[#616161] dark:text-white">
        <div className="opacity-0"></div>
        <Link href="/login/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  );
}
