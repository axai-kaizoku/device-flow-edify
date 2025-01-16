import React, { useRef, useState } from "react";
import { FormField } from "@/app/(root)/settings/_components/form-field";
import Spinner from "@/components/Spinner";
import { Icons } from "@/components/icons";
import { SelectDropdown } from "@/components/dropdown/select-dropdown";
import { genders } from "@/app/(root)/people/_components/helper/utils";
import { cn } from "@/lib/utils";

function PersonalDetails({ setSteps }: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    profile: "",
    name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    profile: "",
    name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
  });

  // Utility for Validation
  const validateFields = (): boolean => {
    const newErrors = {
      profile: formData.profile ? "" : "Profile image is required",
      name: formData.name ? "" : "Name is required",
      dob: formData.dob ? "" : "Date of birth is required",
      gender: formData.gender ? "" : "Gender is required",
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
        ? ""
        : "Invalid email format",
      phone: /^[0-9]{10}$/.test(formData.phone)
        ? ""
        : "Phone number must be 10 digits",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const onSubmit = async () => {
    if (validateFields()) {
      console.log("Form Data:", formData);
      setSteps(2); // Proceed to next step
    } else {
      console.error("Validation failed. Fix errors before proceeding.");
    }
  };

  const handleUploadLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profile: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full h-screen justify-evenly items-center flex flex-col lg:flex-row p-8">
      <div className="w-[46%]  h-[auto]">
        <img
          src="/media/Onboarding/CompanyDetails.png"
          alt="edify-background"
          width={"100%"}
        />
      </div>
      <div className="w-[42%] relative h-full justify-center items-center flex flex-col">
        <div
          className={`font-gilroySemiBold flex w-full gap-6 flex-col items-center  leading-[normal] tracking-[0px]`}
        >
          <div className="w-full">
            <div className="text-center text-[25px] font-gilroyBold leading-[normal] text-indigo-950">
              Personal Details
            </div>
            <div className="text-center text-xl font-gilroyMedium  text-zinc-400">
              Enter your details to register in your organization
            </div>
          </div>
          {formData?.profile ? (
            <div>
              <img
                src={formData?.profile}
                alt="Company Logo"
                className="size-28 rounded-full border object-cover"
              />
            </div>
          ) : (
            <Icons.personal_detail_sign_up />
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-2.5 border border-dimgray rounded-lg bg-white"
          >
            {formData.profile ? "Edit Image" : "Upload Image"}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUploadLogo}
          />
          <div className="flex flex-col w-[75%] gap-6">
            <FormField
              label="Name*"
              placeholder="Name"
              id="name"
              error={errors.name}
              name="email"
              value={formData?.name ?? ""}
              type="text"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));

                // Validate email format on the fly
              }}
            />
            <div className="flex gap-3">
              <div className="w-1/2">
                <FormField
                  placeholder="DD/MM/YYYY"
                  label="DOB"
                  error={errors.dob}
                  id="dob"
                  name="dob"
                  value={
                    formData?.dob
                      ? new Date(formData.dob).toISOString().split("T")[0]
                      : ""
                  }
                  type="date"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="z-20 w-1/2">
                <SelectDropdown
                  options={genders}
                  onSelect={(data) =>
                    setFormData((prev) => ({
                      ...prev,
                      gender: data?.value,
                    }))
                  }
                  label="Gender"
                  value={`${formData?.gender ?? ""}`}
                  placeholder="eg: Male"
                  className={cn(
                    errors.gender
                      ? "border-destructive/80 "
                      : "border-[#5F5F5F]",
                    "rounded-xl border"
                  )}
                />
                {errors.gender && (
                  <p className="mt-1 text-xs font-gilroyMedium text-destructive">
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <FormField
                label="Email"
                id="email"
                error={errors.email}
                name="email"
                value={formData?.email ?? ""}
                type="text"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                  if (!inputValue || /^[a-zA-Z0-9@._-]*$/.test(inputValue)) {
                    setFormData((prev) => ({
                      ...prev,
                      email: inputValue,
                    }));

                    // Validate email format on the fly
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      email: inputValue
                        ? emailRegex.test(inputValue)
                          ? ""
                          : "Invalid email format"
                        : "Email is required",
                    }));
                  }
                }}
                maxLength={50}
                placeholder="jhondoe@winuall.com"
              />
              <FormField
                label="Phone"
                id="phone"
                name="phone"
                error={errors.phone}
                value={formData?.phone ?? ""}
                type="tel"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const phoneRegex = /^[0-9]{0,10}$/;

                  // Allow only numbers (or empty string) and prevent invalid input
                  if (!inputValue || phoneRegex.test(inputValue)) {
                    setFormData((prev) => ({
                      ...prev,
                      phone: inputValue,
                    }));

                    // Validate phone number format on the fly
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      phone: inputValue
                        ? /^[0-9]{10}$/.test(inputValue)
                          ? ""
                          : "Phone number must be 10 digits"
                        : "Phone number is required",
                    }));
                  }
                }}
                maxLength={10}
                placeholder="eg: 9876543210"
              />
            </div>
          </div>
          <button
            onClick={() => {
              onSubmit();
            }}
            className="flex items-center mt-5 justify-center h-[56px] w-[75%] rounded-[9.3px] bg-black px-44 py-[13px]"
          >
            <div className="text-center text-white">Next</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
