import { TeamForm } from "@/app/(root)/teams/_components/team-form";
import Spinner, { spinnerVariants } from "@/components/Spinner";
import { Button } from "@/components/buttons/Button";
import { Icons } from "@/components/icons";
import { Input } from "@/components/inputs/Input";
import { useAlert } from "@/hooks/useAlert";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/server/orgActions";
import { createTeam } from "@/server/teamActions";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const DEPARTMENT_OPTIONS = [
  "Quality Control",
  "Design",
  "Amazon Logistics",
  "HR",
  "Finance",
  "Management",
  "Tech",
  "Others",
];

export const Teams = ({ setSteps }: any) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Local state for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  // Function to handle form submission
  const handleSubmit = async () => {
    // Manual validation
    const newErrors = {
      title: formData.title ? "" : "Team name is required",
      description: formData.description ? "" : "Team Label is required",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;
    try {
      setLoading(true);
      await createTeam(formData.title, formData.description, "");
      setSuccess(true);
    } catch {
      setLoading(false);
    }
  };
  // Handle department selection
  const handleDepartmentSelect = (department: string) => {
    setFormData((prev) => ({ ...prev, description: department }));
  };

  return (
    <div className="w-full h-screen justify-evenly items-center flex flex-col lg:flex-row p-8">
      {!success ? (
        <div className="w-[42%] relative h-full justify-center items-center flex flex-col gap-6">
          <div
            className={`font-gilroySemiBold flex w-full gap-6 flex-col items-center  leading-[normal] tracking-[0px]`}
          >
            <div className="w-full">
              <div className="text-center text-[25px] font-gilroyBold leading-[normal] text-indigo-950">
                Create teams
              </div>
              <div className="text-center text-xl font-gilroyMedium leading-[normal] text-zinc-400">
                Add all the teams in organizations
              </div>
            </div>
            <svg
              width="95"
              height="95"
              viewBox="0 0 95 95"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="47.8759"
                cy="47.5625"
                r="45.9714"
                fill="#ECF0FF"
                stroke="#465FF1"
                stroke-width="2.31302"
              />
              <path
                d="M48.3652 55.0189V51.2432"
                stroke="#465FF1"
                stroke-width="2.31302"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M57.584 38.1323C60.0992 38.1323 62.1232 40.1712 62.1232 42.6864V47.8059C58.4621 49.949 53.6253 51.2438 48.3569 51.2438C43.0885 51.2438 38.2666 49.949 34.6055 47.8059V42.6715C34.6055 40.1563 36.6444 38.1323 39.1595 38.1323H57.584Z"
                stroke="#465FF1"
                stroke-width="2.31302"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M53.574 38.1257V37.581C53.574 35.7654 52.1006 34.292 50.285 34.292H46.4453C44.6296 34.292 43.1562 35.7654 43.1562 37.581V38.1257"
                stroke="#465FF1"
                stroke-width="2.31302"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M34.6426 53.2422L34.9239 56.9762C35.1144 59.4928 37.2113 61.438 39.7339 61.438H56.9961C59.5187 61.438 61.6156 59.4928 61.8061 56.9762L62.0874 53.2422"
                stroke="#465FF1"
                stroke-width="2.31302"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-8 w-[75%]"
          >
            <div className="group relative">
              <label
                htmlFor="team-name"
                className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-base font-gilroyMedium text-foreground"
              >
                Team Name
              </label>
              <Input
                maxLength={20}
                id="team-name"
                className={cn(
                  errors.title
                    ? "border-destructive/80  focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
                    : "h-12"
                )}
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="eg: Alpha, Gamma"
                type="text"
              />
              {errors.title && (
                <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="flex flex-col ">
              <label className="font-gilroyMedium ">Choose Department</label>
              <div className="flex flex-wrap gap-3">
                {DEPARTMENT_OPTIONS.map((preLabel) => (
                  <button
                    key={preLabel}
                    type="button"
                    className={cn(
                      "flex  items-center py-1.5 gap-1  px-5 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300 text-lg",
                      formData.description === preLabel
                        ? "border-white bg-primary text-white"
                        : "hover:border-black hover:text-black"
                    )}
                    onClick={() => handleDepartmentSelect(preLabel)}
                  >
                    {preLabel}
                  </button>
                ))}
              </div>
              {errors.description && (
                <p className="text-destructive text-xs font-gilroyMedium">
                  {errors.description}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="rounded-[9px] font-gilroyMedium  w-full h-[56px] bg-primary text-primary-foreground"
              style={{ fontSize: 16 }}
              disabled={loading}
            >
              {loading ? (
                <Spinner className={spinnerVariants({ size: "sm" })} />
              ) : (
                "Create Team"
              )}
            </Button>
          </form>
        </div>
      ) : (
        <div className="w-[42%] relative h-full justify-center items-center flex flex-col gap-6">
          <div className="w-full">
            <div className="text-center text-[25px] font-gilroyBold leading-[normal] text-indigo-950">
              Team Created!!
            </div>
            <div className="text-center text-md mt-2 font-gilroySemiBold leading-[normal] text-zinc-400">
              Team has been created and is ready to assign employees
            </div>
          </div>
          <Button
            className="rounded-[9px] font-gilroySemiBold text-[16px]   w-[75%] h-[56px] bg-primary text-primary-foreground"
            type="button"
            onClick={() => {
              setSteps(4);
            }}
          >
            Add Employee
          </Button>
          <Button
            type="submit"
            className="rounded-[9px] font-gilroySemiBold text-[16px]  w-[75%] h-[56px]  "
            style={{
              backgroundColor: "#EDEDED",
            }}
            onClick={() => {
              setSuccess(false);
            }}
          >
            Create New Team
          </Button>
        </div>
      )}
      <div className="w-[46%]  h-[auto]">
        <img
          src="/media/Onboarding/teams.png"
          alt="edify-background"
          width={"100%"}
        />
      </div>
    </div>
  );
};
