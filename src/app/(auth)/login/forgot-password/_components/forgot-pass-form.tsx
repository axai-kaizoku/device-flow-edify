"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RequestOTP, ResetPass } from "@/server/loginActions";

export default function ForgotPassForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uId, setUID] = useState("");
  const [next, setNext] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds for 5 minutes
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval and reset OTP when time expires
    if (timeLeft <= 0) {
      clearInterval(timer);
      setOtp(new Array(4).fill("")); // Reset OTP fields
      setTimeLeft(0); // Avoid negative count
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time left as mm:ss
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleChange = (element: any, index: number) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

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
        setTimeLeft(300);
      } else {
        setError("Invalid Email ID");
      }
    } catch (e) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackspace = (event: any, index: number) => {
    if (event.key === "Backspace" && !otp[index]) {
      // Focus previous input if available
      if (index > 0) {
        const prevSibling = event.target.previousSibling;
        prevSibling.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = ""; // Clear the previous box
        setOtp(newOtp);
      }
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setError("");
    try {
      if (!otp.every((num) => num.length === 1)) {
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
      const res = await ResetPass(uId, otp.join("").toString(), password);
      if (res.message === "Invalid or Expired otp") {
        setError("Invalid or Expired OTP");
      } else {
        setDone(true);
      }
    } catch (e) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const obscuredEmail = email.replace(/(.{4})[^@]*(?=@)/, "$1****");

  return done ? (
    <div className=" h-fit justify-center items-center  flex flex-col gap-3  rounded w-[423px] max-lg:w-full lg:w-auto">
      <div
        className={`font-gilroy flex w-full flex-col items-center gap-y-[17px] px-6 text-center leading-[26px] tracking-[0px] `}
      >
        <div className="w-[425px] text-[31px] font-bold leading-[26px]">
          All done!
        </div>
        <div className="flex w-[425px] items-center justify-center font-medium leading-[26px] text-zinc-600">
          <p className="text-center">
            Your password has been successfully updated. You can now log in with
            your new credentials
          </p>
        </div>
        <div className="flex flex-col justify-end self-stretch pt-4">
          <button
            onClick={() => {
              router.push("/login");
              router.refresh();
            }}
            className="flex flex-wrap items-center justify-center gap-x-[9.3px] gap-y-[9.3px] rounded-[9.3px] bg-black p-[13px] text-center min-[471.4842834472656px]:flex-nowrap"
          >
            <div className="text-left text-[17px] font-gilroySemiBold leading-[29px] tracking-[-0.21px] text-white">
              Back to LogIn
            </div>
            <div className="flex h-[19px] w-[19px] flex-shrink-0 flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M11.0071 3.9082L16.4556 9.35664M16.4556 9.35664L11.0071 14.8051M16.4556 9.35664L2.44531 9.35664"
                  stroke="#F9FAFB"
                  strokeWidth="2.0756"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>{" "}
    </div>
  ) : (
    <div className=" h-fit justify-center items-center  flex flex-col gap-3  rounded w-[423px] max-lg:w-full lg:w-auto">
      <div
        className={`font-gilroySemiBold flex w-full flex-col items-center gap-y-4 leading-[normal] tracking-[0px]`}
      >
        <div className="text-center text-[40px] max-lg:text-4xl font-gilroyBold leading-[normal]">
          Reset Password
        </div>
        <div
          className="text-center font-gilroyMedium max-lg:text-sm leading-[normal]"
          style={{ color: "#4E4D4D" }}
        >
          {next === 1
            ? `Enter the OTP sent to ${obscuredEmail}`
            : " Enter the email ID associated with your account"}
        </div>
        <div className="flex flex-col gap-3 lg:gap-4 p-4 w-full">
          {next === 0 && (
            <div className="flex flex-col gap-1 w-full">
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
                disabled={loading}
              />
            </div>
          )}

          {next === 1 && (
            <>
              <div className="flex justify-center gap-2 space-x-2">
                {otp.map((data, index) => (
                  <input
                    className="w-12 h-12 text-xl text-center border rounded shadow"
                    type="text"
                    name="otp"
                    maxLength={1}
                    style={{
                      borderRadius: 11.5,
                      border: data
                        ? "1.038px solid #000"
                        : "1.038px solid #DDD",
                      width: 67,
                      height: 67,
                      background: "#F6F6F6",
                    }}
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handleBackspace(e, index)}
                  />
                ))}
              </div>
              <p
                className="text-center mb-2"
                style={{
                  color: "#4E4D4D",
                  fontSize: 16,
                  marginTop: 31,
                  marginBottom: 31,
                }}
              >
                {formatTimeLeft()}
              </p>
              <div className="relative flex flex-col gap-1 w-full ">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border  p-2 h-[60px] rounded-[8px] border-[#5F5F5F]"
                  placeholder="Enter your new password"
                  disabled={loading}
                />
                <label
                  htmlFor="password"
                  style={{ backgroundColor: "#fff", fontSize: 18 }}
                  className="absolute text-lg text-black  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-white  scale-100 -translate-y-1/2 top-1/2 top-2 scale-75 -translate-y-4 rtl:translate-x-1/4 rtl:left-auto start-1"
                >
                  New Password
                </label>
              </div>

              <div
                className="relative flex flex-col gap-1 w-full"
                style={{ marginTop: 31 }}
              >
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border  p-2 h-[60px] rounded-[8px] border-[#5F5F5F]"
                  placeholder="Enter your password again"
                  disabled={loading}
                />
                <label
                  htmlFor="password"
                  style={{ backgroundColor: "#fff", fontSize: 18 }}
                  className="absolute text-lg text-black  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   px-2 peer-focus:px-2 peer-focus:text-white  scale-100 -translate-y-1/2 top-1/2 top-2 scale-75 -translate-y-4 rtl:translate-x-1/4 rtl:left-auto start-1"
                >
                  Confirm Password
                </label>
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
              className="flex items-center mt-5 justify-center h-[56px] w-[433px] max-lg:w-full rounded-[9.3px] bg-black px-44 max-lg:px-0 py-[13px]"
            >
              <div className="text-center text-white">Send OTP</div>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex items-center mt-5 justify-center h-[56px] w-full rounded-[9.3px] bg-black px-44 max-lg:px-0 py-[13px]"
            >
              <div className="text-center text-white">Submit</div>
            </button>
          )}
        </div>
      </div>

      {next === 1 && (
        <div
          className={`font-gilroy w-full text-center font-medium leading-[normal] tracking-[0px] `}
        >
          <span style={{ cursor: "pointer" }} onClick={handleNext}>
            <span className="text-center text-neutral-600">
              {"Don’t receive code? "}
            </span>
            Re-send
          </span>
        </div>
      )}

      {next === 0 && (
        <Link href="/login" className="text-center text-neutral-950">
          <button className="flex h-[56px] max-lg:w-full w-[433px] items-center justify-center rounded-[9.3px] bg-zinc-100 ">
            Back to Login
          </button>
        </Link>
      )}
    </div>
  );
}
