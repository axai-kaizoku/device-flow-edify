"use client";

import { Button } from "@/components/buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IntegrationType } from "@/server/integrationActions";
import {
  ArrowDataTransferHorizontalIcon,
  CheckmarkCircle04Icon,
  Edit02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { UseMutationResult } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormField } from "../../settings/_components/form-field";
import { BlueTickCircle, BothSideArrows } from "./icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const ConnectIntegration = ({
  children,
  integrationData,
  mutation,
  // open,
  // setOpen,
  onClick,
}: {
  // open?: boolean;
  // setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
  children?: React.ReactNode;
  integrationData?: IntegrationType;
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
  const [open, setOpen] = useState(false);
  const code = useSearchParams().get("code");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const redirectUri = `http://localhost:3000/integrations/${integrationData?._id}`;

  // Generic change handler for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const postGSuiteData = async () => {
      const clientId = sessionStorage.getItem("client_id");
      const clientSecret = sessionStorage.getItem("client_secret");

      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code: code as string,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          access_type: "offline",
          prompt: "consent",
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      console.log(accessToken);
      if (accessToken) {
        const profileRes = await fetch(
          "https://admin.googleapis.com/admin/directory/v1/users?customer=my_customer&maxResults=10&orderBy=email",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const profile = await profileRes.json();
        // console.log(profile);
        // profileData = profile;

        const mappedUsers = profile?.users?.map((user) => {
          const primaryEmail =
            user.emails.find((email) => email?.primary)?.address || "";
          return {
            id: user?.id, // Accepts string
            name: user?.name?.fullName, // Accepts string
            email: primaryEmail, // Accepts string
            lastActivity: user?.lastLoginTime, // Accepts string
            presence: user?.suspended ? "false" : "true", // Accepts string
            online: "", // Leave as empty string for now
          };
        });

        console.log({ mappedUsers });
        sessionStorage.setItem("store", JSON.stringify(mappedUsers));

        try {
          mutation.mutate(
            {
              payload: {
                platform: integrationData?.platform,
                credentials: { ...formData },
                store: mappedUsers,
                newprice: customPrice
                  ? {
                      plan: selectedPlan,
                      price: parseInt(customPrice),
                    }
                  : {
                      plan: selectedPlan,
                      price: parseInt(customPrice),
                    },
              },
            },
            {
              onSuccess: () => {
                setOpen(false);
                setFormData({});
              },
            }
          );
          // setOpen(false);

          // console.log(res);

          // if (res) ;
        } catch (error) {
          console.error(error);
        }

        return;
      }
    };

    if (code) {
      postGSuiteData();
    }
  }, [code]);

  // Validate form fields
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
      console.log("Form Data:", formData);

      const clientId = formData.client_id;
      const clientSecret = formData.client_secret;

      if (!code) {
        const scope =
          "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/admin.directory.user.readonly";
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(
          scope
        )}&access_type=offline&prompt=consent`;

        // Store credentials in sessionStorage (or secure state handling)
        sessionStorage.setItem("client_id", clientId);
        sessionStorage.setItem("client_secret", clientSecret);

        window.location.href = authUrl;
        return;
      }
    }
  };

  // Handle form submission
  const onSubmit = async () => {
    if (validateFields()) {
      // console.log("Form Data:", formData);

      try {
        mutation.mutate(
          {
            payload: {
              platform: integrationData?.platform,
              credentials: formData,
              newprice: customPrice
                ? {
                    plan: selectedPlan,
                    price: parseInt(customPrice),
                  }
                : {
                    plan: selectedPlan,
                    price: parseInt(customPrice),
                  },
            },
          },
          {
            onSuccess: () => {
              setOpen(false);
              setFormData({});
            },
          }
        );

        // console.log(res);
        // setOpen(false);
        // setFormData({});

        // if (res) setOpen(false);
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
      <DialogTrigger onClick={onClick}>{children}</DialogTrigger>
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
        {/* {JSON.stringify(integrationData)} */}

        <DialogTitle className="text-lg font-gilroySemiBold">
          Connect Deviceflow to {integrationData?.platform}
        </DialogTitle>

        <div className="h-[1px] bg-gray-200 mb-3 -mx-6"></div>

        {/* Dynamic Form fields */}
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg text-sm bg-black text-white w-full font-gilroyMedium tracking-wide hover:bg-neutral-900/80"
              disabled={mutation.isPending}
              onClick={() => {
                integrationData?.platform.toLowerCase().includes("suite")
                  ? onGSuitSubmit()
                  : onSubmit();
              }}
            >
              {mutation.isPending ? (
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
