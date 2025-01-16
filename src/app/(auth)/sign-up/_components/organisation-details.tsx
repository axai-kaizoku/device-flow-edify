import { employments } from "@/app/(root)/people/_components/helper/utils";
import { FormField } from "@/app/(root)/settings/_components/form-field";
import { SelectDropdown } from "@/components/dropdown/select-dropdown";
import { SelectInput } from "@/components/dropdown/select-input";
import { cn } from "@/lib/utils";
import { fetchTeams } from "@/server/teamActions";
import { fetchUsers, searchUsers } from "@/server/userActions";
import React, { useState } from "react";

function OrganisationDetails({ setSteps }: any) {
  const [formData, setFormData] = useState({
    joining_date: "",
    employement_type: "",
    role: "",

    reporting_manager: {
      name: "",
      value: "",
    },
    team: {
      name: "",
      value: "",
    },
  });

  const [errors, setErrors] = useState({
    joining_date: "",
    employement_type: "",
    role: "",

    reporting_manager: "",
    team: "",
  });

  const validateFields = (): boolean => {
    const newErrors = {
      joining_date: formData.joining_date ? "" : "Joining Date is required",
      employement_type: formData.employement_type
        ? ""
        : "Employment Type is required",
      role: formData.role ? "" : "Role is required",
      reporting_manager:
        formData.reporting_manager.name && formData.reporting_manager.value
          ? ""
          : "Reporting Manager is required",
      team: formData.team.name && formData.team.value ? "" : "Team is required",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const onSubmit = async () => {
    if (validateFields()) {
      console.log("Form Data:", formData);
      setSteps(3); // Proceed to next step
    } else {
      console.error("Validation failed. Fix errors before proceeding.");
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
              Hey {"employee_name"}
            </div>
            <div className="text-center text-xl font-gilroyMedium  text-zinc-400">
              Enter your organisation details
            </div>
          </div>

          <div className="flex flex-col w-[75%] gap-6">
            <div className="flex gap-3">
              <div className="w-1/2">
                <FormField
                  placeholder="DD/MM/YYYY"
                  label="Joining Date*"
                  error={errors.joining_date}
                  id="joining_date"
                  name="joining_date"
                  type="date"
                  value={formData?.joining_date}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      joining_date: e.target.value,
                    }))
                  }
                />
              </div>
              <div className=" w-1/2">
                <SelectDropdown
                  options={employments}
                  onSelect={(data) =>
                    setFormData((prev) => ({
                      ...prev,
                      gender: data?.value,
                    }))
                  }
                  label="Employment type*"
                  value={`${formData?.employement_type ?? ""}`}
                  placeholder="eg: Male"
                  className={cn(
                    errors.employement_type
                      ? "border-destructive/80 "
                      : "border-[#5F5F5F]",
                    "rounded-xl border"
                  )}
                />
                {errors.employement_type && (
                  <p className="mt-1 text-xs font-gilroyMedium text-destructive">
                    {errors.employement_type}
                  </p>
                )}
              </div>
            </div>
            <FormField
              label="Role*"
              placeholder="Role"
              id="role"
              error={errors.role}
              name="role"
              value={formData?.role ?? "-"}
              type="text"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  role: e.target.value,
                }));

                // Validate email format on the fly
              }}
            />

            <SelectInput
              value={formData.reporting_manager.name || ""}
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
                  reporting_manager: { name: data.email, value: data._id },
                }));
              }}
              label="Reporting Manager"
              className={cn(
                errors.reporting_manager ? "border-destructive/80 border" : ""
              )}
            />
            {errors.reporting_manager && (
              <p className="text-destructive font-gilroyMedium text-xs">
                {errors.reporting_manager}
              </p>
            )}

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
                return data.filter((obj: any) =>
                  obj.title.toLowerCase().includes(query.toLowerCase())
                );
              }}
              initialOptions={fetchTeams}
              onSelect={(data: any) => {
                setFormData((prev) => ({
                  ...prev,
                  team: { name: data.title, value: data._id },
                }));
              }}
              label="Team"
              className={cn(errors.team ? "border-destructive/80 border" : "")}
            />

            {errors.team && (
              <p className="mt-0.5 text-xs text-destructive">{errors.team}</p>
            )}
          </div>
          <button
            onClick={() => {
              onSubmit();
            }}
            className="flex items-center mt-5 justify-center h-[56px] w-[75%] rounded-[9.3px] bg-black px-44 py-[13px]"
          >
            <div className="text-center text-white">Submit</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrganisationDetails;
