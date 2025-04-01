"use client";

import {
  bulkUploadKeys,
  designations,
  employments,
  genders,
} from "@/app/(root)/people/_components/helper/utils";
import { FormField } from "@/app/(root)/settings/_components/form-field";
import { Button } from "@/components/buttons/Button";
import { SelectDropdown } from "@/components/dropdown/select-dropdown";
import { SelectInput } from "@/components/dropdown/select-input";
import Spinner from "@/components/Spinner";
import { useAlert } from "@/hooks/useAlert";
import { cn } from "@/lib/utils";
import { fetchTeams } from "@/server/teamActions";
import {
  bulkUploadUsers,
  createUser,
  CreateUserArgs,
  fetchUsers,
  searchUsers,
  User,
} from "@/server/userActions";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { useState } from "react";
import BulkUpload from "./BulkUpload";
import CompanyOnbardingIcon from "@/icons/CompanyOnbardingIcon";

interface UserFormProps {
  closeBtn: (state: boolean) => void;
  isEditForm?: boolean;
  userData?: CreateUserArgs | User;
}

export const Employee = ({ setSteps }: any) => {
  const { showAlert } = useAlert();
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstN: "",
    phone: "",
    email: "",
    image: "",
    designation: "",
    team: { name: "", value: "" },
    reportM: { name: "", value: "" },
    gender: "",
    offerLetter: "",
    employment: "",
    dob: "",
    onboarding: "",
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
      // reportM: formData.reportM.value ? "" : "Reporting Manager is required",
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
      // teamId: formData.team.value,
      onboarding_date: formData.onboarding,
      // reporting_manager: formData.reportM.value,
      employment_type: formData.employment,
      // offerLetter: formData.offerLetter,
      date_of_birth: formData.dob,
      gender: formData.gender,
    };

    if (formData.team.value && formData.team.value.length !== 0) {
      // @ts-ignore
      user.teamId = formData.team.value;
    }

    if (formData.reportM.value && formData.reportM.value.length !== 0) {
      // @ts-ignore
      user.reporting_manager = formData.reportM.value;
    }

    try {
      setLoading(true);
      try {
        await createUser(user);

        const employeeCount = sessionStorage.getItem("employee-count");
        if (employeeCount) {
          const empCountInt = parseInt(employeeCount);
          if (empCountInt >= 0) {
            sessionStorage.setItem("employee-count", `${empCountInt + 1}`);
          }
        }

        setLoading(false);
        setSuccess(true);

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
      } catch (error: any) {
        showAlert({
          title: "Can't create user",
          description: "Phone no. or email is used already !!",
          isFailure: true,
          key: "create-user-failure",
        });
        setNext(0)
      }

      setLoading(false);
    } catch (error) {
      notFound();
    }
  };

  return (
    <>
      <div className="w-full h-screen items-center justify-evenly flex flex-col lg:flex-row p-8">
        {success ? (
          <div className="w-full relative h-full justify-center items-center flex flex-col gap-6">
            <div className="w-full">
              <div className="text-center text-[25px] font-gilroyBold leading-[normal] text-indigo-950">
                Employee Added!!
              </div>
              <div className="text-center text-md mt-2 font-gilroySemiBold leading-[normal] text-zinc-400">
                Employee is added successful
              </div>
            </div>
            <Button
              className="rounded-[9px] font-gilroySemiBold text-[16px]   w-[75%] h-[56px] bg-primary text-primary-foreground"
              type="button"
              onClick={() => {
                setSteps(5);
              }}
            >
              Add Device
            </Button>
            <Button
              type="submit"
              className="rounded-[9px] font-gilroySemiBold text-[16px]  w-[75%] h-[56px]  "
              style={{
                backgroundColor: "#EDEDED",
              }}
              onClick={() => {
                setSuccess(false);
                setNext(0);
              }}
            >
              Create New Employee
            </Button>
          </div>
        ) : (
          <div className="w-full relative h-full justify-center items-center flex flex-col gap-6">
            <div className="w-full">
              <div className="text-center text-[25px] font-gilroyBold leading-[normal] text-indigo-950">
                Add employees
              </div>
              <div className="text-center text-xl font-gilroyMedium leading-[normal] text-zinc-400">
                Add all the employees in organisation
              </div>
            </div>
            {next === 0 && (
              <div className="flex w-[75%] gap-4">
                <BulkUpload
                  bulkApi={bulkUploadUsers}
                  requiredKeys={bulkUploadKeys}
                  setSuccess={(success: boolean) => {
                    setSuccess(success);
                    setLoading(false);
                  }}
                  sampleData={{
                    first_name: "XXXX YYYY",
                    designation: "Engineer",
                    email: "demo@exampledemo.com",
                    phone: "1234567890",
                    employment_type: "Full time",
                    date_of_birth: "09/12/1992",
                    gender: "Male",
                    onboarding_date: "28/01/2020",
                  }}
                />
              </div>
            )}
            {/* {next === 0 && (
              <div className="flex justify-center text-[#5F5F5F] font-gilroySemiBold">
                -OR-
              </div>
            )} */}
            {next === 0 && (
              <CompanyOnbardingIcon/>
            )}
            {/* {next === 0 && (
              <div className="flex flex-col justify-end self-stretch pt-[17px]">
                <div className="flex flex-grow flex-wrap items-center justify-center gap-x-[22px] gap-y-[22px] text-[15px] font-medium leading-[normal] text-indigo-950 [max-height:59px] min-[423.75189208984375px]:flex-nowrap">
                  <div className="flex items-center justify-center gap-x-[15px] rounded-[7.4px] border-x-[0.93px] border-t-[0.93px] border-solid border-x-[dimgray] border-y-[dimgray] bg-white px-8 py-2.5 [border-bottom-width:0.93px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="24"
                      viewBox="0 0 23 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.01214 9.08856C7.39749 9.08856 7.71024 9.40131 7.71024 9.78666C7.71024 10.172 7.39749 10.4848 7.01214 10.4848H6.14371C4.63675 10.4848 3.41182 11.7097 3.41182 13.2157V17.7533C3.41182 19.2603 4.63675 20.4852 6.14371 20.4852H16.5035C18.0095 20.4852 19.2354 19.2603 19.2354 17.7533V13.2073C19.2354 11.706 18.0142 10.4848 16.5137 10.4848H15.636C15.2506 10.4848 14.9379 10.172 14.9379 9.78666C14.9379 9.40131 15.2506 9.08856 15.636 9.08856H16.5137C18.7839 9.08856 20.6315 10.9362 20.6315 13.2073V17.7533C20.6315 20.0301 18.7793 21.8814 16.5035 21.8814H6.14371C3.86791 21.8814 2.01562 20.0301 2.01562 17.7533V13.2157C2.01562 10.9399 3.86791 9.08856 6.14371 9.08856H7.01214ZM11.8175 2.971L14.5317 5.69637C14.8035 5.97002 14.8025 6.41122 14.5298 6.68301C14.2562 6.95481 13.815 6.95481 13.5432 6.68115L12.0208 5.15348L12.0213 15.3686H10.6251L10.6246 5.15348L9.1042 6.68115C8.9683 6.81891 8.78866 6.88686 8.60994 6.88686C8.43216 6.88686 8.25345 6.81891 8.11755 6.68301C7.84483 6.41122 7.84297 5.97002 8.11569 5.69637L10.829 2.971C11.0905 2.70758 11.5559 2.70758 11.8175 2.971Z"
                        fill="#26203B"
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <div>Upload Logo</div>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
            <form
              onSubmit={handleSubmit}
              className="w-[85%] flex flex-col justify-center gap-4"
            >
              {next === 0 ? (
                <>
                  <FormField
                    label="Name"
                    error={errors.firstN}
                    id="name"
                    value={formData?.firstN ?? ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstN: e.target.value,
                      }))
                    }
                    maxLength={35}
                    minLength={2}
                    type="text"
                    placeholder="John Doe"
                  />

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
                      className="rounded-[9px] text-base w-[100%] h-[56px] font-gilroySemiBold bg-black text-white "
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
                <div className="flex flex-col gap-6 relative ">
                  <div className="w-full flex flex-col gap-6">
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
                            reportM: { name: data.first_name, value: data._id },
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
                              errors.team
                                ? "border-destructive/80 border"
                                : "border-[#5F5F5F]"
                            )}
                          />
                          {errors.team && (
                            <p
                              className={cn(
                                "mt-0.5 text-sm text-destructive opacity-0"
                              )}
                            >
                              {"team"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex-1">
                          <FormField
                            label="Designation"
                            id="designation"
                            error={errors.designation}
                            name="designation"
                            value={formData?.designation ?? ""}
                            type="text"
                            onChange={(e) => {
                              const inputValue = e.target.value;

                              setFormData((prev) => ({
                                ...prev,
                                designation: inputValue,
                              }));

                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                designation: inputValue
                                  ? ""
                                  : "Designation is required",
                              }));
                            }}
                            maxLength={50}
                            placeholder="eg. Frontend Developer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2  w-full  mt-4">
                    <Button
                      className="rounded-[9px] w-full h-[56px] text-base font-gilroySemiBold bg-black text-white "
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
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
        )}
      </div>
    </>
  );
};
