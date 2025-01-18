import { FormField } from "@/app/(root)/settings/_components/form-field";
import React, { useState } from "react";

function SettingPasswords({ setSteps }: any) {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const validateFields = (): boolean => {
    const newErrors = {
      newPassword: formData.newPassword ? "" : "New Password is required",
      confirmPassword: formData.confirmPassword
        ? ""
        : "Confirm Password is required",
    };

    if (formData.newPassword && formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };
  const onSubmit = async () => {
    if (validateFields()) {
      console.log("Form Data:", formData);
      setSteps(5); // Proceed to next step
    } else {
      console.error("Validation failed. Fix errors before proceeding.");
    }
  };
  return (
    <div className="w-full h-screen justify-evenly items-center flex flex-col lg:flex-row p-8">
      <div className="w-[46%]  h-[auto]">
        <img
          src="/media/Onboarding/companyDetails.png"
          alt="edify-background"
          width={"100%"}
        />
      </div>
      <div className="w-[42%] relative h-full justify-center items-center flex flex-col gap-12">
        {/* heading */}
        <div className="font-gilroySemiBold gap-3 flex w-full flex-col items-center  ">
          <h1 className="text-center text-3xl font-gilroyBold text-[#090914]">
            Welcome {"employee_name"}
          </h1>
          <p className="text-center text-base font-gilroyMedium  text-[#52525B]">
            Create your credentials to access your organization
          </p>
        </div>
        {/* password */}
        <div className="flex font-gilroyMedium flex-col w-[60%] gap-9">
          <FormField
            label="New password"
            placeholder="Enter your new password"
            id="newPassword"
            error={errors.newPassword}
            name="newPassword"
            value={formData?.newPassword ?? ""}
            type="password"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }));
            }}
          />
          <FormField
            label="Confirm Password"
            placeholder="Enter your password again"
            id="confirmPassword"
            error={errors.confirmPassword}
            name="email"
            value={formData?.confirmPassword ?? ""}
            type="password"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }));

              // Validate email format on the fly
            }}
          />

          <button
            onClick={onSubmit}
            className="flex items-center  justify-center text-center font-gilroySemiBold text-white rounded-lg bg-black px-44 py-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingPasswords;
