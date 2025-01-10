"use client";

import BulkUpload from "@/components/bulk-upload";
import { Button } from "@/components/buttons/Button";
import { fetchTeams } from "@/server/teamActions";
import {
  bulkUploadUsers,
  createUser,
  CreateUserArgs,
  fetchUsers,
  searchUsers,
  updateUser,
  User,
} from "@/server/userActions";
import { notFound, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  bulkUploadKeys,
  designations,
  employments,
  genders,
} from "./helper/utils";
import { SelectDropdown } from "@/components/dropdown/select-dropdown";
import { SelectInput } from "@/components/dropdown/select-input";
import { FormField } from "../../settings/_components/form-field";
import { Icons } from "@/components/icons";
import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { getImageUrl } from "@/server/orgActions";
import { useAlert } from "@/hooks/useAlert";
import { useToast } from "@/hooks/useToast";

interface UserFormProps {
  closeBtn: (state: boolean) => void;
  isEditForm?: boolean;
  userData?: CreateUserArgs | User;
}

export const UserForm = ({ closeBtn, isEditForm, userData }: UserFormProps) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { openToast } = useToast();

  const [next, setNext] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstN: userData ? userData.first_name : "",
    phone: userData ? userData.phone : "",
    email: userData ? userData.email : "",
    image: userData ? userData.image : "",
    designation: userData ? userData.designation : "",
    team: userData?.teamId
      ? // @ts-ignore
        { name: userData.teamId.title, value: userData.teamId._id }
      : { name: "", value: "" },
    reportM: userData?.reporting_manager
      ? {
          // @ts-ignore
          name: userData.reporting_manager.email,
          // @ts-ignore
          value: userData.reporting_manager._id,
        }
      : { name: "", value: "" },
    gender: userData ? userData.gender : "",
    offerLetter: userData ? userData.offerLetter : "",
    employment: userData ? userData.employment_type : "",
    dob: userData ? userData.date_of_birth : "",
    onboarding: userData ? userData.onboarding_date : "",
  });

  const [errors, setErrors] = useState({
    firstN: "",
    phone: "",
    email: "",
    image: "",
    designation: "",
    team: "",
    reportM: "",
    gender: "",
    offerLetter: "",
    employment: "",
    dob: "",
    onboarding: "",
  });

  const validateStepOne = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    const newErrors = {
      firstN: formData.firstN ? "" : "Name is required",
      // image: formData.image ? "" : "Image is required",
      dob: formData.dob ? "" : "Date of birth is required",
      gender: formData.gender ? "" : "Gender is required",
      email: formData.email
        ? emailRegex.test(formData.email)
          ? ""
          : "Invalid email format"
        : "Email is required",
      phone: formData.phone
        ? phoneRegex.test(formData.phone)
          ? ""
          : "Phone number must be 10 digits"
        : "Phone number is required",
    };

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    return !Object.values(newErrors).some((err) => err);
  };

  const validateStepTwo = () => {
    const newErrors = {
      designation: formData.designation ? "" : "Designation is required",
      // team: formData.team.value ? "" : "Team is required",
      reportM: formData.reportM.value ? "" : "Reporting Manager is required",
      employment: formData.employment ? "" : "Employment type is required",
      // offerLetter: formData.offerLetter ? "" : "Offer Letter is required",
      onboarding: formData.onboarding ? "" : "Onboarding date is required",
    };

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    return !Object.values(newErrors).some((err) => err);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    setErrors({});

    // Validation before submitting
    const isStepOneValid = validateStepOne();
    const isStepTwoValid = validateStepTwo();

    if (!isStepOneValid || !isStepTwoValid) {
      return;
    }

    const user = {
      first_name: formData.firstN,
      email: formData.email,
      phone: formData.phone,
      image: formData.image,
      designation: formData.designation,
      teamId: formData.team.value,
      onboarding_date: formData.onboarding,
      reporting_manager: formData.reportM.value,
      employment_type: formData.employment,
      // offerLetter: formData.offerLetter,
      date_of_birth: formData.dob,
      gender: formData.gender,
    };

    try {
      if (isEditForm) {
        setLoading(true);
        try {
          await updateUser(userData?._id!, user);
          setLoading(false);
          openToast("success", "User update success !");
          router.refresh();
          closeBtn(false);
        } catch (error: any) {
          showAlert({
            title: "Can't update user",
            description: error.message,
            isFailure: true,
            key: "update-user-failure",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        try {
          await createUser(user);
          setLoading(false);
          showAlert({
            title: "WOHOOO!! 🎉",
            description: "User created successfully !!",
            isFailure: false,
            key: "create-user-success",
          });
          router.push("/people");
          router.refresh();

          setFormData({
            firstN: "",
            phone: "",
            email: "",
            image: "",
            designation: "",
            team: { name: "", value: "" },
            reportM: { name: "", value: "" },
            gender: "",
            employment: "",
            offerLetter: "",
            dob: "",
            onboarding: "",
          });
          closeBtn(false);
        } catch (error: any) {
          showAlert({
            title: "Can't create user",
            description: "Phone no. or email is used already !!",
            isFailure: true,
            key: "create-user-failure",
          });
        } finally {
          setLoading(false);
        }

        setLoading(false);
      }
    } catch (error) {
      notFound();
    }
  };

  const fileImageRef = useRef<HTMLInputElement | null>(null);
  // Handle file selection

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (file) {
      const isValidSize = file.size <= 1024 * 1024; // 1MB
      const isValidType = ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
  
      if (isValidSize && isValidType) {
        try {
          const res = await getImageUrl({ file });
          console.log("Uploaded image response:", res);
  
          setFormData((prev) => ({
            ...prev,
            image: res.fileUrl, // Ensure `res.url` contains the S3 URL.
          }));
  
          setErrors((prev) => ({
            ...prev,
            image: "",
          }));
        } catch (error) {
          openToast("error","Image upload failed");
          setErrors((prev) => ({
            ...prev,
            image: "Failed to upload the image. Please try again.",
          }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          image: "Only JPG, JPEG, or PNG files under 1MB are allowed.",
        }));
      }
    }
  };
  

  const fileOfferLetterRef = useRef<HTMLInputElement | null>(null);
  const [offerLetter, setOfferLetter] = useState<File | null>(null);

  const handleOfferLetterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidSize = file.size <= 1024 * 1024 * 5; // Max 5MB size
      const isValidType = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ].includes(file.type);

      if (isValidSize && isValidType) {
        try {
          const res = await getImageUrl({ file });
          console.log("Uploaded image response:", res);
          setOfferLetter(res?.fileUrl);
        } catch (error) {
          openToast("error","Image upload failed");
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          offerLetter: "Only PDF files under 5MB are allowed.",
        }));
      }
    }
  };

  const handleRemoveOfferLetter = () => {
    setOfferLetter(null);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  // const fileOfferLetterRef = useRef<HTMLInputElement | null>(null);
  // const handleOfferLetterChange = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0];
  //   const res = await getImageUrl({ file: file! }, "device");
  //   // if (file) {
  //   setFormData((prev) => ({ ...prev, offerLetter: res.data }));
  //   // }
  // };

  return (
    <>
      <div className="flex relative flex-col justify-start items-start pb-1 px-1 space-y-4 gap-1 h-full">
        <div className="flex justify-start items-center gap-4 font-gilroySemiBold">
          <div className="bg-black rounded-full p-1.5 flex justify-center items-center">
            <Icons.user_form_icon className="size-6" />
          </div>
          <span className="font-gilroySemiBold 2xl:text-2xl text-xl">
            {isEditForm ? "Edit Employee " : "Add Employee"}
          </span>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="font-gilroySemiBold text-base text-gray-400">
            {next === 0 ? "Step 0 of 1" : "Step 1 of 1"}
          </div>
          <div className="h-[1px] bg-[#E7E7E7] w-full"></div>
        </div>

        {!isEditForm ? (
          next === 0 ? (
            <div className="w-full flex justify-between items-center pb-2">
              <BulkUpload
                bulkApi={bulkUploadUsers}
                closeBtn={() => closeBtn(false)}
                requiredKeys={bulkUploadKeys}
              />
            </div>
          ) : null
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 h-full"
        >
          {next === 0 ? (
            <>
              {!isEditForm && (
                <>
                  <div className="flex items-center justify-center ">
                    <div className="border-t border-gray-400 w-7"></div>
                    <span className="mx-4  font-gilroySemiBold 2xl:text-lg text-base text-gray-400">
                      OR
                    </span>
                    <div className="border-t border-[#B1B1B1] w-7"></div>
                  </div>
                </>
              )}

              <div className="font-gilroySemiBold 2xl:text-2xl text-xl mb-2">
                Personal Info
              </div>
              <FormField
                label="Name"
                error={errors.firstN}
                id="name"
                value={formData?.firstN ?? ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const nameRegex = /^[A-Za-z\s]*$/; // Allows only alphabets and spaces

                  // Validate input for only alphabets and spaces
                  if (!inputValue || nameRegex.test(inputValue)) {
                    setFormData((prev) => ({ ...prev, firstN: inputValue }));

                    // Optional validation for length or other constraints
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      firstN: inputValue
                        ? inputValue.length >= 2 && inputValue.length <= 35
                          ? ""
                          : "Name must be between 2 and 35 characters"
                        : "Name is required",
                    }));
                  }
                }}
                maxLength={35}
                minLength={2}
                type="text"
                placeholder="John Doe"
              />
              <div className="flex flex-col gap-1.5">
                <label className="font-gilroyMedium text-black text-base">
                  Upload picture
                </label>

                {formData.image ? (
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden group">
                    <img
                      src={formData.image}
                      alt={formData.image}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleRemoveImage}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex cursor-pointer flex-col items-center justify-center bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 p-6 border-[#52ABFF]"
                    onClick={() => fileImageRef.current?.click()}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <Icons.uploadImage className="size-5" />
                      <span className="text-[#0EA5E9]">Click to upload</span>
                      <p className="text-xs text-neutral-400">
                        JPG, JPEG, PNG less than 1MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileImageRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex w-full flex-wrap items-center gap-4 pt-3">
                <div className="flex-1">
                  <FormField
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
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div className="flex-1">
                  <div className="z-20 flex-1">
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
              </div>
              <div className="flex w-full flex-wrap items-center gap-4 py-3">
                <div className="flex-1">
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

                      if (
                        !inputValue ||
                        /^[a-zA-Z0-9@._-]*$/.test(inputValue)
                      ) {
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
                </div>
                <div className="flex-1">
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
              {/* {error && <span className="w-full text-red-400">{error}</span>} */}
              <div className="flex gap-2 mb-3">
                <Button
                  type="button"
                  className="rounded-full text-base w-1/2 font-gilroySemiBold border border-black"
                  onClick={() => closeBtn(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="rounded-full text-base w-1/2  font-gilroySemiBold bg-black text-white "
                  onClick={() => {
                    if (validateStepOne()) {
                      setNext(1);
                    }
                  }}
                >
                  Next
                  <ChevronRight color="white" />
                </Button>
              </div>
            </>
          ) : next === 1 ? (
            <div className="flex flex-col gap-6 relative h-full">
              <div className="w-full flex flex-col gap-6">
                <h1 className="2xl:text-2xl text-xl font-gilroySemiBold">
                  Professional Info
                </h1>
                <div className="z-50">
                  <SelectInput
                    value={formData.reportM.name || ""}
                    optionValue={{ firstV: "first_name", secondV: "email" }}
                    key={"user-form-reporting-manager"}
                    placeholder="Search by name, etc"
                    // @ts-ignore
                    fetchOptions={searchUsers}
                    // @ts-ignore
                    initialOptions={fetchUsers}
                    onSelect={(data: any) => {
                      setFormData((prev) => ({
                        ...prev,
                        reportM: { name: data.email, value: data._id },
                      }));
                    }}
                    label="Reporting Manager"
                    className={cn(
                      errors.reportM ? "border-destructive/80 border" : ""
                    )}
                  />
                  {errors.reportM && (
                    <p className="text-destructive font-gilroyMedium text-xs">
                      {errors.reportM}
                    </p>
                  )}
                </div>

                <div className="flex w-full flex-wrap items-center gap-4 py-2">
                  <div className="flex-1">
                    <FormField
                      label="Onboarding Date"
                      id="onboarding_date"
                      error={errors.onboarding}
                      name="Joining Date"
                      value={formData?.onboarding ?? ""}
                      type="date"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          onboarding: e.target.value,
                        }))
                      }
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="z-20 flex-1">
                      <SelectDropdown
                        options={employments}
                        onSelect={(data) =>
                          setFormData((prev) => ({
                            ...prev,
                            employment: data?.value,
                          }))
                        }
                        label="Employment Type"
                        value={`${formData?.employment ?? ""}`}
                        placeholder="eg: Full time"
                        className={cn(
                          errors.employment
                            ? "border-destructive/80 "
                            : "border-[#5F5F5F]",
                          "rounded-xl border"
                        )}
                      />
                      {errors.employment && (
                        <p className="mt-0.5 font-gilroyMedium text-xs text-destructive">
                          {errors.employment}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-wrap items-center gap-4 ">
                  <div className="flex-1">
                    <div className="z-20 flex-1">
                      <SelectInput
                        value={formData?.team?.name}
                        optionValue={{
                          firstV: "title",
                          secondV: "description",
                        }}
                        key={"user-form-team-field"}
                        placeholder="Search by name, etc"
                        fetchOptions={async (query) => {
                          const data = await fetchTeams();
                          const filtered = data.filter((obj: any) =>
                            obj.title
                              .toLowerCase()
                              .includes(query.toLowerCase())
                          );
                          return filtered;
                        }}
                        initialOptions={fetchTeams}
                        onSelect={(data: any) => {
                          setFormData((prev) => ({
                            ...prev,
                            team: { name: data.title, value: data._id },
                          }));
                        }}
                        label="Team"
                        className={cn(
                          errors.team ? "border-destructive/80 border" : ""
                        )}
                      />

                      {errors.designation && (
                        <p className="mt-0.5 text-xs opacity-0 text-destructive">
                          {errors.designation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="z-20 flex-1">
                      <SelectDropdown
                        options={designations}
                        onSelect={(data) =>
                          setFormData((prev) => ({
                            ...prev,
                            designation: data?.value,
                          }))
                        }
                        label="Role"
                        value={`${formData?.designation ?? ""}`}
                        placeholder="eg: Full Stack Developer"
                        className={cn(
                          errors.designation
                            ? "border-destructive/80 "
                            : "border-[#5F5F5F]",
                          "rounded-xl border"
                        )}
                      />
                      {errors.designation && (
                        <p className="mt-0.5 text-xs text-destructive">
                          {errors.designation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Offer letter */}
                <div className="flex flex-col gap-1.5 ">
                  <label className="font-gilroyMedium text-black text-base">
                    Upload Offer Letter
                  </label>
                  {offerLetter ? (
                    <div className="relative w-24 h-20 bg-[#F5F5F5] rounded-xl p-4">
                      <iframe
                        src={URL.createObjectURL(offerLetter)}
                        width="100%"
                        height="100%"
                        title="Offer Letter Preview"
                        className="object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={handleRemoveOfferLetter}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="flex cursor-pointer flex-col items-center justify-center bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 p-6 border-[#52ABFF]"
                      onClick={() => fileOfferLetterRef?.current?.click()}
                    >
                      <div className="flex flex-col justify-center items-center">
                        <Icons.uploadImage className="size-5" />
                        <span className="text-[#0EA5E9]">Click to upload</span>
                        <p className="text-xs text-neutral-400">
                          PDF/JPEG/PNG/JPG under 5MB
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileOfferLetterRef}
                    style={{ display: "none" }}
                    onChange={handleOfferLetterChange}
                  />
                  {errors.offerLetter && (
                    <p className="text-destructive text-sm">
                      {errors.offerLetter}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 absolute -bottom-4 w-full  mt-4">
                <Button
                  className="rounded-full w-1/2  text-base font-gilroySemiBold border border-black"
                  onClick={() => setNext(0)}
                >
                  Previous
                </Button>
                <Button
                  className="rounded-full w-1/2 text-base font-gilroySemiBold bg-black text-white "
                  type="submit"
                  disabled={loading}
                >
                  {isEditForm ? (
                    loading ? (
                      <Spinner />
                    ) : (
                      <>
                        <span>Save Changes</span>
                        <ChevronRight color="white" className="size-4" />
                      </>
                    )
                  ) : loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <span>Submit</span>
                      <ChevronRight color="white" className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </>
  );
};
