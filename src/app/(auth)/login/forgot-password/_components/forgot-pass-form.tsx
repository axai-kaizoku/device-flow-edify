"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RequestOTP, ResetPass } from "@/server/loginActions";

export default function ForgotPassForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uId, setUID] = useState("");
  const [next, setNext] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNext = async () => {
    setLoading(true);
    setError("");
    try {
      if (!email || !email.includes("@")) {
        setError("Invalid Email");
        return;
      }
      const res = await RequestOTP(email);
      if (res.userId) {
        setUID(res.userId);
        setNext(1);
      } else {
        setError("Invalid Email ID");
      }
    } catch (e) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setError("");
    try {
      if (!otp || otp.length !== 6) {
        setError("OTP must be 6 digits");
        return;
      }
      if (!password || password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      const res = await ResetPass(uId, otp, password);
      if (res.message === "Invalid or Expired otp") {
        setError("Invalid or Expired OTP");
      } else {
        router.push("/login");
        router.refresh();
      }
    } catch (e) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border h-fit shadow-2xl flex flex-col gap-3 p-6 lg:p-10 rounded w-full lg:w-auto">
      <div className="px-4">
        <h1 className="text-start text-xl font-gilroySemiBold">
          Reset Password
        </h1>
      </div>

      <div className="flex flex-col gap-3 lg:gap-4 p-4">
        {next === 0 && (
          <div className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input border py-3 px-8 h-14 w-full lg:w-80 rounded focus:outline-none"
              placeholder="Email"
              disabled={loading}
            />
          </div>
        )}

        {next === 1 && (
          <>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  if (/^\d{0,6}$/.test(e.target.value)) setOtp(e.target.value);
                }}
                maxLength={6}
                className="input border py-3 px-8 h-14 w-full lg:w-80 rounded focus:outline-none"
                placeholder="OTP"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input border py-3 px-8 h-14 w-full lg:w-80 rounded focus:outline-none"
                placeholder="Password"
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input border py-3 px-8 h-14 w-full lg:w-80 rounded focus:outline-none"
                placeholder="Confirm Password"
                disabled={loading}
              />
            </div>
          </>
        )}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {loading ? (
          <button
            className="border rounded bg-gray-500 text-white p-3"
            disabled
          >
            Loading...
          </button>
        ) : next === 0 ? (
          <button
            onClick={handleNext}
            className="border rounded bg-black text-white p-3"
          >
            NEXT
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="border rounded bg-black text-white p-3"
          >
            RESET
          </button>
        )}
      </div>

      {next === 0 && (
        <div className="flex justify-center items-center">
          <Link href="/login" className="border-b">
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}
