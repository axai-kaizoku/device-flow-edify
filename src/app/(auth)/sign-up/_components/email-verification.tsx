import { FormField } from "@/app/(root)/settings/_components/form-field";
import React, { useEffect, useState } from "react";
import { RequestOTP } from "@/server/loginActions";

function EmailVerification({ setSteps }: any) {
  const [otpSent, setOtpSent] = useState(false); // Tracks if OTP is sent

  const [formData, setFormData] = useState({
    email: "",
  });
  const [uId, setUID] = useState("");
  const [timeLeft, setTimeLeft] = useState(0); // Timer starts only when OTP is sent
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState({
    email: "",
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleChange = (element: any, index: number) => {
    if (isNaN(element.value)) return false;
    const updatedOtp = [
      ...otp.map((d, idx) => (idx === index ? element.value : d)),
    ];
    setOtp(updatedOtp);

    // Focus next input if value is entered
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleBackspace = (event: any, index: number) => {
    if (event.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = ""; // Clear the previous box
        setOtp(newOtp);

        const prevSibling = event.target.previousSibling;
        if (prevSibling) prevSibling.focus();
      }
    }
  };

  const handleNext = async () => {
    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
      return;
    }

    const res = await RequestOTP(formData.email);
    if (res?.userId) {
      setUID(res.userId);
      setTimeLeft(300); // Start the timer (5 minutes)
      setOtp(new Array(6).fill("")); // Clear OTP input
      setOtpSent(true); // Hide Send OTP button and show Verify OTP button
      setErrors((prev) => ({ ...prev, email: "" })); // Clear email error
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid Email ID",
      }));
    }
  };

  const validateFields = (): boolean => {
    const newErrors = {
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
        ? ""
        : "Invalid email format",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async () => {
    if (otp.every((num) => num.length === 1)) {
      // Assuming this verifies OTP (logic can be extended)
      console.log("OTP Verified:", otp.join(""));
      setSteps(4); // Proceed to the next step
    } else {
      console.error("Invalid OTP");
    }
  };

  return (
    <div className="w-full h-screen justify-evenly items-center flex flex-col lg:flex-row p-8">
      <div className="w-[46%] h-[auto]">
        <img
          src="/media/Onboarding/CompanyDetails.png"
          alt="edify-background"
          width={"100%"}
        />
      </div>
      <div className="w-[42%] relative h-full justify-center items-center flex flex-col">
        <div className="font-gilroySemiBold flex w-full gap-6 flex-col items-center">
          <div className="w-full">
            <h1 className="text-center text-3xl font-gilroyBold text-indigo-950">
              Welcome {"employee_name"}
            </h1>
            <p className="text-center text-base font-gilroyMedium text-zinc-400">
              Create your credentials to access your organization
            </p>
          </div>
          <div className="w-[75%]">
            <FormField
              label="Email"
              id="email"
              error={errors.email}
              name="email"
              value={formData?.email ?? ""}
              type="text"
              onChange={(e) => {
                const inputValue = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  email: inputValue,
                }));
              }}
              placeholder="jhondoe@winuall.com"
            />
          </div>

          {!otpSent && (
            <button
              onClick={handleNext}
              className="flex items-center mt-5 justify-center h-[56px] w-[75%] rounded-[9.3px] bg-black px-44 py-[13px]"
            >
              <div className="text-center text-white">Send OTP</div>
            </button>
          )}

          {otpSent && timeLeft > 0 && (
            <>
              <div className="flex justify-center gap-2 space-x-2 mt-5">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    className="w-12 h-12 text-xl text-center border rounded shadow"
                    type="text"
                    name="otp"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handleBackspace(e, index)}
                  />
                ))}
              </div>
              <p className="text-center text-zinc-500 mt-4">
                {formatTimeLeft()}
              </p>
            </>
          )}

          {otp.every((num) => num.length === 1) && (
            <button
              onClick={handleSubmit}
              className="flex items-center mt-5 justify-center h-[56px] w-[75%] rounded-[9.3px] bg-black px-44 py-[13px]"
            >
              <div className="text-center text-white">Submit</div>
            </button>
          )}

          {timeLeft === 0 && (
            <div className="font-gilroy w-full text-center font-medium leading-[normal] tracking-[0px] mt-5">
              <span style={{ cursor: "pointer" }} onClick={handleNext}>
                <span className="text-center text-neutral-600">
                  {"Don’t receive code? "}
                </span>
                Re-send
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
