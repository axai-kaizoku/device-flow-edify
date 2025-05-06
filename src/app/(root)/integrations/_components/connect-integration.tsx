"use client";

import { Button } from "@/components/buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IntegrationType } from "@/server/integrationActions";
import { getGSuiteAuthUrl } from "@/server/orgActions";
import { UseMutationResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormField } from "../../settings/_components/form-field";
import { BlueTickCircle, BothSideArrows } from "./icons";

export const ConnectIntegration = ({
  loading,
  integrationData,
  mutation,
  gSuiteMutation,
  open,
  setOpen,
}: // onClick,
{
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // onClick?: () => void;
  loading?: boolean;
  integrationData?: IntegrationType;
  gSuiteMutation?: UseMutationResult<
    any,
    Error,
    {
      id: string;
    },
    unknown
  >;
  mutation?: UseMutationResult<
    any,
    Error,
    {
      payload?: {
        platform?: string;
        credentials?: {};
        store?: {}[];
        newprice?: {};
      };
    },
    unknown
  >;
}) => {
  const intId = useSearchParams().get("integrationId");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (intId && !hasTriggered) {
      gSuiteMutation.mutate({ id: intId });
      setHasTriggered(true);
    }
  }, [intId, hasTriggered]);

  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    integrationData?.credentials.forEach((credential) => {
      newErrors[credential] = formData[credential]
        ? ""
        : `${credential} is required`;
    });

    newErrors["pricing"] = customPrice ? "" : "Price is required";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const onGSuitSubmit = async () => {
    if (validateFields()) {
      // Get the current URL
      const currentUrl = window.location.href;

      window.location.href = await getGSuiteAuthUrl({
        bulkUpload: false,
        price: {
          plan: selectedPlan,
          price: parseInt(customPrice),
        },
        redirectUri: currentUrl,
      });
      return;
     
    }
  };

  // Handle form submission
  const onSubmit = async () => {
    if (validateFields()) {

      try {
        mutation.mutate({
          payload: {
            platform: integrationData?.platform,
            credentials: formData,
            newprice: customPrice
              ? {
                  plan: selectedPlan,
                  price: parseInt(customPrice),
                }
              : integrationData?.price?.filter((plan) => {
                  if (plan.plan === selectedPlan) {
                    return plan._id;
                  }
                })[0],
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [selectedPlan, setSelectedPlan] = useState(
    integrationData?.price?.[0]?.plan ?? ""
  );
  const [customPrice, setCustomPrice] = useState(
    integrationData?.price?.[0]?.price ?? ""
  );
  const [isCustom, setIsCustom] = useState(false);

  const handlePlanChange = (plan: string) => {
    setSelectedPlan(plan);

    if (plan === "Custom Plan") {
      setIsCustom(true);
      setCustomPrice(""); // or keep previous customPrice if you want
    } else {
      setIsCustom(false);
      const selected = integrationData.price.find((p) => p.plan === plan);
      setCustomPrice(selected?.price || "");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl bg-white shadow-lg max-w-md p-6 text-center">
        <div className="flex justify-center">
          <div className="flex gap-6 justify-center items-center">
            <img
              src="/media/integrations/edify-logo.png"
              className="size-10 object-cover"
              alt="Edify logo"
            />
            <BothSideArrows />
            <img
              src={integrationData?.companyLogo ?? ""}
              alt="Integration logo"
              className="size-10 object-cover"
            />
          </div>
        </div>

        <DialogTitle className="text-lg font-gilroySemiBold">
          Connect Deviceflow to {integrationData?.platform}
        </DialogTitle>

        <div className="h-[1px] bg-gray-200 mb-3 -mx-6"></div>
        {integrationData?.credentials.length > 0 ? (
          <div className="flex flex-col gap-5">
            {integrationData?.credentials.map((credential) => (
              <FormField
                key={credential}
                label={credential
                  .replace(/_/g, " ")
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
                id={credential}
                error={errors[credential]}
                name={credential}
                value={formData[credential] || ""}
                type="text"
                onChange={handleChange}
                className="placeholder:text-neutral-400 h-10 text-sm placeholder:text-xs rounded-md"
                placeholder={`Enter ${credential.replace(/_/g, " ")}`}
              />
            ))}
          </div>
        ) : (
          <></>
        )}

        <h2 className="text-base/4 text-left font-gilroySemiBold my-1.5">
          Billing
        </h2>

        <div className="flex w-full gap-4 justify-between items-start -mt-0.5">
          <Select onValueChange={handlePlanChange} defaultValue={selectedPlan}>
            <SelectTrigger className="font-gilroyMedium flex justify-between p-2 pl-2  bg-white border border-[#DEDEDE] rounded-md min-w-[12rem] w-1/2">
              <SelectValue
                placeholder={selectedPlan}
                className="flex justify-between p-0"
              />
            </SelectTrigger>
            <SelectContent className="font-gilroyMedium">
              {integrationData?.price?.map((p) => (
                <SelectItem
                  key={p?._id}
                  value={p?.plan}
                  className="w-full py-2.5 rounded-lg"
                >
                  {p?.plan}
                </SelectItem>
              ))}
              <SelectItem
                value="Custom Plan"
                className="w-full py-2.5 rounded-lg"
              >
                Custom Plan
              </SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Input
              value={customPrice}
              readOnly={!isCustom}
              onChange={(e) => {
                const inputValue = e.target.value;
                const zipRegex = /^[0-9]{0,12}$/;

                if (!inputValue || zipRegex.test(inputValue)) {
                  setCustomPrice(inputValue);
                }
              }}
              placeholder="Enter Price"
              className={cn(
                "font-gilroyMedium",
                !isCustom ? "bg-gray-50" : "bg-white",
                errors.pricing ? "border-destructive/80" : "border"
              )}
            />
            <p
              className={cn(
                "mt-0.5 text-xs text-start font-gilroyMedium text-destructive transition-all duration-300",
                {
                  "opacity-100": errors.pricing,
                  "opacity-0": !errors.pricing,
                }
              )}
            >
              {errors.pricing ?? " "}
            </p>
          </div>
        </div>

        <h1 className="text-base font-gilroySemiBold text-start ">
          {integrationData?.platform} would like to
        </h1>
        <div className="flex flex-col gap-1 text-start h-[9vh] overflow-y-auto ">
          {integrationData?.permissions.map((item, index) => (
            <div key={index} className="flex items-center gap-1 py-0.5">
              <BlueTickCircle />
              <p className="text-sm font-gilroyMedium">{item}</p>
            </div>
          ))}
        </div>
        <h1 className="text-sm font-gilroyMedium text-start ">
          We care about your privacy in our Privacy Policy. By clicking Connect,
          you authorize {integrationData?.platform} to access your information.
        </h1>
        <div className="h-[1px] bg-gray-200 my-3 -mx-6"></div>

        <DialogFooter className="flex w-full h-10 -mt-3 -mb-2 items-center justify-between">
          <Button className="rounded-lg text-sm bg-white text-black w-fit font-gilroyMedium tracking-wide border hover:border-black">
            How to use?
          </Button>
          <div className="flex gap-3">
            <Button
              className="rounded-lg text-sm bg-white text-black w-fit font-gilroyMedium tracking-wide border hover:border-black"
              disabled={mutation.isPending || loading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg text-sm bg-black text-white w-full font-gilroyMedium tracking-wide hover:bg-neutral-900/80"
              disabled={mutation.isPending || loading}
              type="button"
              onClick={() => {
                integrationData?.platform.toLowerCase().includes("suite")
                  ? onGSuitSubmit()
                  : onSubmit();
              }}
            >
              {mutation.isPending || loading ? (
                <>
                  Connect <Loader2 className="animate-spin size-4" />
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
