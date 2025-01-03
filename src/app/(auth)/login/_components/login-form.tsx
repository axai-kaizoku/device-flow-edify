"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

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
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button type="submit" className="border rounded-[10px] h-[56px] bg-black text-white p-4">
        {loading ? <Spinner size="sm" /> : "Login"}
      </button>

      <div className="flex text-[0.8rem] underline justify-between items-center text-[#616161] dark:text-white">
        <div className="opacity-0"></div>
        <Link href="/login/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  );
}
