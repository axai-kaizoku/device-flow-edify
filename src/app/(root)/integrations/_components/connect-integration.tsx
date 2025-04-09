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

export const ConnectIntegration = ({
  children,
  integrationData,
  mutation,
}: {
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
        newprice?: number;
      };
    },
    unknown
  >;
}) => {
  const [open, setOpen] = useState(false);
  const code = useSearchParams().get("code");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [newPrice, setNewPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
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
          const res = mutation.mutate({
            payload: {
              platform: integrationData?.platform,
              credentials: { ...formData },
              store: mappedUsers,
              newprice: newPrice ? parseInt(newPrice) : integrationData.price,
            },
          });
          setOpen(false);

          // console.log(res);
          setFormData({});

          // if (res) setOpen(false);
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
        const res = mutation.mutate({
          payload: {
            platform: integrationData?.platform,
            credentials: formData,
            newprice: newPrice ? parseInt(newPrice) : integrationData.price,
          },
        });

        console.log(res);
        setFormData({});

        if (res) setOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const descriptionDetails = [
    "Access basic company information and details.",
    "Access and edit bug reports and create new issues.",
    "Change issue status and assignee and issues.",
    "Open and resolve Slack conversations.",
    "Add or remove users and user roles.",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="rounded-2xl bg-white shadow-lg max-w-lg p-6 text-center">
        {/* Header with logos and arrows */}
        <div className="flex justify-center">
          <div className="flex gap-6 justify-center items-center">
            <img
              src="/media/integrations/edify-logo.png"
              className="size-10"
              alt="Edify logo"
            />
            <BothSideArrows />
            <img
              src={integrationData?.companyLogo ?? ""}
              alt="Integration logo"
              className="size-10"
            />
          </div>
        </div>

        {/* Title and description */}
        <DialogTitle className="text-lg font-gilroySemiBold">
          Connect Deviceflow to {integrationData?.platform}
        </DialogTitle>
        <DialogDescription className="p-1 text-sm text-gray-600">
          Manage your integration with {integrationData?.platform}.
        </DialogDescription>
        <div className="h-[1px] bg-gray-200 mb-3"></div>

        {/* Dynamic Form fields */}
        <div className="flex flex-col gap-6">
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
              className="placeholder:text-neutral-400 h-10 text-sm placeholder:text-xs"
              placeholder={`Enter ${credential.replace(/_/g, " ")}`}
            />
          ))}
        </div>

        <h2 className="text-base/4 text-left font-gilroySemiBold my-1.5">
          Billing
        </h2>

        <div className="flex w-full gap-4 justify-between items-center -mt-2">
          {isEditing ? (
            <FormField
              key={"price"}
              label={"Price"}
              id={"price"}
              name={"price"}
              value={integrationData.price.toString()}
              type="text"
              readOnly
              defaultValue={integrationData.price.toString()}
              onChange={handleChange}
              className="placeholder:text-gray-300 h-10"
              placeholder={`Enter price`}
            />
          ) : (
            <>
              <div
                id={"price-field"}
                className="h-10 w-full rounded-[10px] border border-[#5F5F5F] bg-background px-3 py-2 text-base  focus-visible:outline-none  focus-visible:border-primary flex items-center gap-0.5 md:text-base font-gilroyRegular"
              >
                <span className="font-gilroySemiBold text-base text-[#2E8016]">
                  {`₹${integrationData?.price ?? ""}`}
                </span>
                <span className="font-gilroyRegular text-xs mt-1">
                  /month/user
                </span>
              </div>
            </>
          )}
          <HugeiconsIcon
            icon={ArrowDataTransferHorizontalIcon}
            className="text-gray-900 size-14"
          />
          {isEditing ? (
            <FormField
              key={"new_price"}
              label={"New Price"}
              id={"new_price"}
              // error={errors[credential]}
              name={"new_price"}
              value={newPrice}
              type="text"
              onChange={(e) => {
                const inputValue = e.target.value;
                const zipRegex = /^[0-9]{0,9}$/;
                if (!inputValue || zipRegex.test(inputValue)) {
                  setNewPrice(inputValue);
                }
              }}
              className="placeholder:text-gray-300 h-10"
              placeholder={`Enter price`}
            />
          ) : (
            <>
              <div
                id={"price-field"}
                className="h-10 w-full rounded-[10px] border border-[#5F5F5F] bg-background px-3 py-2 text-base  focus-visible:outline-none  focus-visible:border-primary flex items-center gap-0.5 md:text-base font-gilroyRegular"
              >
                <span className="font-gilroySemiBold text-base text-[#2E8016]">
                  {`₹${newPrice ? newPrice : integrationData?.price}`}
                </span>
                <span className="font-gilroyRegular text-xs mt-1">
                  /month/user
                </span>
              </div>
            </>
          )}
          {isEditing ? (
            <div
              onClick={() => setIsEditing((prev) => !prev)}
              className="text-green-500 font-gilroyMedium text-sm cursor-pointer select-none flex items-center gap-2"
            >
              Save
              <HugeiconsIcon
                icon={CheckmarkCircle04Icon}
                className="text-green-500 size-4"
              />
            </div>
          ) : (
            <div
              onClick={() => setIsEditing((prev) => !prev)}
              className="text-[#007AFF] font-gilroyMedium text-sm cursor-pointer select-none flex items-center gap-2"
            >
              Edit
              <HugeiconsIcon
                icon={Edit02Icon}
                className="text-[#007AFF] size-4"
              />
            </div>
          )}
        </div>

        {/* Permissions list */}
        <h1 className="text-base font-gilroySemiBold text-start ">
          {integrationData?.platform} would like to
        </h1>
        <div className="flex flex-col gap-1 text-start overflow-y-auto ">
          {descriptionDetails.map((item, index) => (
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
        <div className="h-[1px] bg-gray-200 my-3"></div>

        {/* Footer Buttons */}
        <DialogFooter className="flex w-full items-center justify-between">
          <Button className="rounded-lg border border-[#D0D5DD] px-6 bg-[#FFF]">
            How to use?
          </Button>
          <div className="flex gap-3">
            <Button
              className="rounded-lg font-gilroyMedium border px-6 border-[#D0D5DD] bg-[#FFF]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-black border font-gilroySemiBold px-10 border-[#B4B4B4] text-white"
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
