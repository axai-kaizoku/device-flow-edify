"use client";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingButton } from "@/components/buttons/Button";
import { Input } from "@/components/inputs/Input";
import EyeCloseIcon from "@/icons/EyeCloseIcon";
import EyeOpenIcon from "@/icons/EyeOpenIcon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getGSuiteAuthUrlLogin } from "@/server/orgActions";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");

  useEffect(() => {
    if (error) {
     setTimeout(() => {
      toast.error("Invalid credentials. Please try again.");
      router.push('/login')
     }, 1000);
    }
  }, [error]);

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
        // callbackUrl: "https://app.deviceflow.ai"
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
    } finally {
      setLoading(false);
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
      <div className="group relative w-full">
        <label
          htmlFor="email"
          className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm font-gilroyMedium text-foreground"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          className={cn(
            errorMessage
              ? "border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
              : "h-12 placeholder:text-gray-400 pl-4  border border-[#5F5F5F]",
            "focus:ring-[0.5px] ring-black rounded-md font-gilroyMedium"
          )}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="group relative w-full">
        <label
          htmlFor="password"
          className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm font-gilroyMedium text-foreground"
        >
          Password
        </label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          className={cn(
            errorMessage
              ? "border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
              : "h-12 placeholder:text-gray-400 pl-4 border border-[#5F5F5F]",
            "focus:ring-[0.5px] ring-black rounded-md font-gilroyMedium"
          )}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-3 text-sm"
        >
          {showPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
        </button>
      </div>

      {errorMessage && (
        <p className="text-sm text-red-600 font-gilroyMedium">{errorMessage}</p>
      )}

      <LoadingButton variant="primary" loading={loading} className="rounded-md">
        Login
      </LoadingButton>
      <button
        type="button"
        onClick={async () => {
          const response = await signIn("google", {
            redirect: false, // don't auto redirect to /api/auth/signin
             callbackUrl: "https://deviceflow.ai"
          });
          router.push("/");
          router.refresh();
        }}
        className="login-with-google-btn font-gilroySemiBold"
      >
        <img
          src="media/integrations-companies/gsuite-icon.png "
          className="size-4"
        />{" "}
        Login with Google
      </button>

      <div className="flex text-[0.8rem] underline  font-gilroyMedium  justify-between items-center text-[#616161] dark:text-white">
        <div className="opacity-0"></div>
        <Link href="/login/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  );
}
