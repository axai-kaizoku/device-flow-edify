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
import { ChevronRight } from "lucide-react";
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

    if (!isStepOneValid && !isStepTwoValid) {
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
        } catch (error) {
          showAlert({
            title: "Can't update user",
            description: "Something went wrong !!",
            isFailure: true,
            key: "update-user-failure",
          });
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
        }

        setLoading(false);
      }
    } catch (error) {
      notFound();
    }
  };

  const fileImageRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const res = await getImageUrl({ file: file! }, "user");
    // if (file) {
    setFormData((prev) => ({ ...prev, image: res.data }));
    console.log(formData.image);
    // }
  };

  const fileOfferLetterRef = useRef<HTMLInputElement | null>(null);
  const handleOfferLetterChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const res = await getImageUrl({ file: file! }, "device");
    // if (file) {
    setFormData((prev) => ({ ...prev, offerLetter: res.data }));
    // }
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start pb-1 px-1 space-y-4 gap-1 h-full">
        <div className="flex justify-start items-center gap-4 font-gilroySemiBold">
          <div className="bg-black rounded-full p-1.5 flex justify-center items-center">
            <Icons.user_form_icon />
          </div>
          <span className="font-gilroySemiBold 2xl:text-2xl text-[22px]">
            {isEditForm ? "Edit Employee " : "Add Employee"}
          </span>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="font-gilroySemiBold text-lg text-black">
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

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {next === 0 ? (
            <>
              {!isEditForm && (
                <>
                  <div className="flex items-center justify-center ">
                    <div className="border-t border-[#B1B1B1] w-7"></div>
                    <span className="mx-4 font-gilroySemiBold 2xl:text-lg text-base text-[#5F5F5F]">
                      OR
                    </span>
                    <div className="border-t border-[#B1B1B1] w-7"></div>
                  </div>
                </>
              )}

              <div className="font-gilroySemiBold 2xl:text-2xl text-[22px] mb-2">
                Personal Info
              </div>
              <FormField
                label="Name"
                error={errors.firstN}
                id="name"
                value={formData?.firstN ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, firstN: e.target.value }))
                }
                maxLength={35}
                minLength={2}
                type="text"
                placeholder="John Doe"
              />
              <div className="flex flex-col gap-1.5">
                <label className="font-gilroyMedium text-black text-base">
                  Upload picture
                </label>

                <div
                  className="flex flex-col items-center justify-center bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 p-6 border-[#52ABFF]"
                  onClick={() => fileImageRef?.current?.click()}
                >
                  <div className="flex flex-col justify-center items-center">
                    <Icons.uploadImage className="size-5" />
                    <span className="text-[#0EA5E9]">Click to upload</span>
                    <p className="text-xs text-neutral-400">
                      JPG, JPEG, PNG less than 1MB
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileImageRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="text-destructive text-sm">{errors.image}</p>
                )}
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
                      value={`${
                        formData?.gender ? formData?.gender : "eg: Male"
                      }`}
                      className={cn(
                        errors.gender
                          ? "border-destructive/80 "
                          : "border-[#5F5F5F]",
                        "rounded-xl border"
                      )}
                    />
                    {errors.gender && (
                      <p className="mt-2 text-sm text-destructive">
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
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="rounded-full w-1/2 text-xl font-gilroySemiBold border border-black"
                  onClick={() => closeBtn(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="rounded-full w-1/2 text-xl font-gilroySemiBold bg-black text-white "
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
            <div className="flex flex-col gap-6">
              <div className="w-full flex flex-col gap-6">
                <h1 className="2xl:text-2xl text-[22px] font-gilroySemiBold">
                  Professional Info
                </h1>
                <div className="z-50 pt-3">
                  <SelectInput
                    value={formData.reportM.name || ""}
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
                    <p className="text-destructive text-sm">{errors.reportM}</p>
                  )}
                </div>

                <div className="flex w-full flex-wrap items-center gap-4 py-3">
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
                        value={`${
                          formData?.employment
                            ? formData?.employment
                            : "eg: Full time"
                        }`}
                        className={cn(
                          errors.employment
                            ? "border-destructive/80 "
                            : "border-[#5F5F5F]",
                          "rounded-xl border"
                        )}
                      />
                      {errors.employment && (
                        <p className="mt-2 text-sm text-destructive">
                          {errors.employment}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-wrap items-center gap-4 pb-3">
                  <div className="flex-1">
                    <div className="z-20 flex-1">
                      <SelectInput
                        value={formData?.team?.name}
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
                      {errors.team && (
                        <p className="text-destructive text-sm">
                          {errors.team}
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
                        value={`${
                          formData?.designation
                            ? formData?.designation
                            : "eg: Full Stack Developer"
                        }`}
                        className={cn(
                          errors.designation
                            ? "border-destructive/80 "
                            : "border-[#5F5F5F]",
                          "rounded-xl border"
                        )}
                      />
                      {errors.designation && (
                        <p className="mt-2 text-sm text-destructive">
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
                  <div
                    className="flex flex-col items-center justify-center bg-[#E9F3FF] rounded-2xl border-dashed h-24 w-full border-2 p-6 border-[#52ABFF]"
                    onClick={() => fileOfferLetterRef?.current?.click()}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <Icons.uploadImage className="size-5" />
                      <span className="text-[#0EA5E9]">Click to upload</span>
                      <p className="text-xs text-neutral-400">
                        JPG, JPEG, PNG less than 1MB
                      </p>
                    </div>
                  </div>
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
              <div className="flex gap-2 w-full mt-4">
                <Button
                  className="rounded-full w-1/2  text-xl font-gilroySemiBold border border-black"
                  onClick={() => setNext(0)}
                >
                  Previous
                </Button>
                <Button
                  className="rounded-full w-1/2 text-xl font-gilroySemiBold bg-black text-white "
                  type="submit"
                  disabled={loading}
                >
                  {isEditForm ? (
                    loading ? (
                      <Spinner />
                    ) : (
                      <>
                        <span>Save Changes</span>
                        <ChevronRight color="white" />
                      </>
                    )
                  ) : loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <span>Submit</span>
                      <ChevronRight color="white" />
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