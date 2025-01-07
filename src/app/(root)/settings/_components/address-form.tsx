"use client";

import { Button } from "@/components/buttons/Button";
import { Icons } from "@/components/icons";
import { createAddress, updateAddress } from "@/server/addressActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner, { spinnerVariants } from "@/components/Spinner";
import { PrimarySelector } from "./primary-selector";
import { FormField } from "./form-field";
import { useAlert } from "@/hooks/useAlert";
import { useToast } from "@/hooks/useToast";

export const AddressForm = ({
  closeBtn,
  isEditForm,
  _id,
  title = "",
  phone = "",
  address = "",
  city = "",
  state = "",
  pinCode = "",
  landmark = "",
  isPrimary = false,
}: {
  closeBtn: (value: boolean) => void;
  isEditForm?: boolean;
  _id?: string;
  title?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  landmark?: string;
  isPrimary?: boolean;
}) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { openToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title,
    phone,
    address,
    city,
    state,
    pinCode,
    landmark,
    isPrimary,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateAddressForm = (formData: {
    title: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  }) => {
    const errors: Record<string, string> = {};

    if (!formData.title) errors.title = "Title is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.pinCode) errors.pinCode = "Pin code is required";

    return errors;
  };

  const handleSubmit = async () => {
    const newErrors = validateAddressForm(formData);
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    setLoading(true);
    if (isEditForm) {
      try {
        await updateAddress(_id!, formData);
        openToast("success", "Address updated successfully !");
        router.refresh();
        closeBtn(false);
      } catch (error) {
        setLoading(false);
        openToast("error", "Failed to update address  !");
      }
    } else {
      try {
        await createAddress(formData);
        showAlert({
          isFailure: false,
          description: "New address added !!",
          title: "Woahh ",
          key: "create-address",
        });
        router.refresh();
        closeBtn(false);
      } catch (error) {
        setLoading(false);
        openToast("error", "Failed to create address  !");
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col h-[80%]">
        <Icons.teamMemberIcon className="size-10 border my-3 bg-black rounded-full" />
        <h3 className="text-3xl font-gilroySemiBold mb-2">
          {isEditForm ? "Edit Address" : "Add New Address"}
        </h3>
        <p className="text-slate-500 mb-10">
          Please provide the address details to be used for delivery or billing
          purposes.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-8"
        >
          {/* Primary/Secondary Selection */}
          <PrimarySelector
            isPrimary={formData?.isPrimary}
            onSelect={(value) =>
              setFormData((prev) => ({ ...prev, isPrimary: value }))
            }
          />

          {/* Form Fields */}
          <FormField
            label="Address Title"
            id="title"
            value={formData?.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            type="text"
            error={errors?.title}
            placeholder="eg: Home, Office"
          />

          <FormField
            label="Phone Number"
            id="phone"
            type="text"
            value={formData?.phone}
            onChange={(e) => {
              if (/^\d{0,10}$/.test(e.target.value))
                setFormData((prev) => ({ ...prev, phone: e.target.value }));
            }}
            maxLength={10}
            error={errors?.phone}
            placeholder="eg: 1234567890"
          />

          <FormField
            label="Address"
            id="address"
            value={formData?.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            type="text"
            error={errors?.address}
            placeholder="eg: 123 Street, City"
          />

          <FormField
            label="City"
            id="city"
            value={formData?.city}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
            type="text"
            error={errors?.city}
            placeholder="eg: New York"
          />

          <FormField
            label="State"
            id="state"
            value={formData?.state}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, state: e.target.value }))
            }
            type="text"
            error={errors?.state}
            placeholder="eg: NY"
          />

          <FormField
            label="Pin Code"
            id="pinCode"
            value={formData?.pinCode}
            maxLength={6}
            onChange={(e) => {
              if (/^\d{0,6}$/.test(e.target.value))
                setFormData((prev) => ({ ...prev, pinCode: e.target.value }));
            }}
            error={errors?.pinCode}
            placeholder="eg: 10001"
          />

          {/* Submit and Cancel Buttons */}
          <div className="flex space-x-3 w-full pt-2 justify-between items-center">
            <Button
              type="button"
              variant="outline"
              className="rounded-full w-1/2"
              onClick={() => closeBtn(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full border w-1/2 bg-primary text-primary-foreground"
            >
              {loading ? (
                <Spinner className={spinnerVariants({ size: "sm" })} />
              ) : (
                <>
                  {isEditForm ? "Edit Address" : "Submit"}
                  <Icons.arrowRight className="size-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
