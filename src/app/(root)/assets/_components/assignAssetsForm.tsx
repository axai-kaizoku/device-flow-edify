"use client";
import { ChevronRight, Monitor } from "lucide-react";
import React, { useState } from "react";
import { SelectInput } from "@/components/dropdown/select-input";
import { fetchUsers, searchUsers, User } from "@/server/userActions";
import { Device, updateDevice } from "@/server/deviceActions";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const AssignAssetsForm = ({
  closeBtn,
  device,
}: {
  closeBtn: (boo: boolean) => void;
  device: Device;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ email: string; _id: string }>();

  const handleSubmit = async () => {
    if (user?._id) {
      setLoading(true);
      // @ts-ignore
      const res = await updateDevice(device?._id ?? "error", {
        userId: user._id,
      });
      setLoading(false);
      router.push("/assets?tab=un_assigned_assets");
      router.refresh();
    }
    closeBtn(false);
  };

  return (
    <div className="flex flex-col h-full  w-full justify-between items-start pt-2 px-3 space-y-4 gap-1">
      <div className="w-full h-full space-y-5">
        <div className="flex w-full justify-start items-center gap-4 mt-3 text-2xl font-gilroySemiBold">
          <div className="bg-black rounded-full p-2 flex justify-center items-center">
            <Monitor color="white" className="size-5" />
          </div>
          <span>Assign asset</span>
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="font-gilroySemiBold text-lg text-gray-400">
            Step 1 of 1
          </div>
          <div className="h-[1px] bg-[#E7E7E7] w-full"></div>
        </div>

        <div className="flex w-full justify-start items-center gap-4 py-4 px-5 bg-[#F1F1F1] rounded-[20px]">
          <div className="">
            <img src="/media/mac-2.png" alt="Asset-1" />
          </div>
          <div>
            <div className="font-gilroySemiBold text-xl">
              {device?.device_name ?? "fff"}
            </div>
            <div className="text-[#7C7C7C] font-gilroyRegular text-sm">
              {device?.ram ?? "N/A"}. {device?.storage ?? "N/A"} .{"ff "}
              {device?.serial_no ?? "N/A"}
            </div>
            <div className="bg-[#ECFDF3] flex justify-center items-center rounded-2xl px-2 py-0.5 text-xs font-gilroyMedium text-[#027A48] mt-1 max-w-16">
              <div>{device?.device_type ?? "N/A"}</div>
            </div>
          </div>
        </div>

        <div className="pt-3 w-full">
          <SelectInput
            fetchOptions={searchUsers}
            initialOptions={fetchUsers}
            optionValue={{ firstV: "first_name", secondV: "email" }}
            key={"assign-assets-form"}
            placeholder="Search by name, email, etc."
            // logic yet to be implemented
            onSelect={(data: User) => {
              setUser({ email: data.email!, _id: data._id! });
            }}
            label="Assigning To"
            value={user?.email ?? ""}
          />
        </div>
      </div>

      <div className="flex gap-3 w-full  ">
        <button
          className="flex items-center justify-center gap-2 text-black py-2 px-5 rounded-[68.29px] font-gilroySemiBold text-xl w-full transition duration-300 border border-black text-center"
          onClick={() => {
            closeBtn(false);
          }}
        >
          Cancel
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-black text-white py-2 px-5 rounded-[68.29px] font-gilroySemiBold text-xl w-full transition duration-300"
          onClick={handleSubmit}
          disabled={loading}
        >
          <div className="flex items-center">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span>Assign</span>
                <ChevronRight color="white" />
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default AssignAssetsForm;
