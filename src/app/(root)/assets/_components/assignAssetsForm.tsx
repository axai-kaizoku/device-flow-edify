"use client";
import { ChevronRight, Monitor } from "lucide-react";
import React, { useState } from "react";
import { SelectInput } from "@/components/dropdown/select-input";
import { fetchUsers, searchUsers, User } from "@/server/userActions";
import { Device, updateDevice } from "@/server/deviceActions";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/buttons/Button";
import { useQueryClient } from "@tanstack/react-query";

const AssignAssetsForm = ({
  closeBtn,
  device,
  onRefresh,
}: {
  closeBtn: (boo: boolean) => void;
  device: Device;
  onRefresh?: () => Promise<void>;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ email: string; _id: string }>();
  const querClient = useQueryClient();
  const handleSubmit = async () => {
    if (user?._id) {
      setLoading(true);
      // @ts-ignore
      const res = await updateDevice(device?._id ?? "error", {
        userId: user._id,
      });
      querClient.invalidateQueries({
        queryKey: ["fetch-assets"],
        exact: false,
        refetchType: "all",
      });
      setLoading(false);
    }
    closeBtn(false);
  };

  return (
    <div className="flex flex-col h-full  w-full justify-between items-start pt-2 px-3 space-y-4 gap-1">
      <div className="w-full h-full space-y-5">
        <h1 className="font-gilroySemiBold text-xl w-full text-center">
          Assign asset
        </h1>

        <div className="h-[1px] bg-[#E7E7E7] w-full"></div>

        <div className="flex w-full justify-start items-center gap-4 py-4 px-5 bg-[#F1F1F1] rounded-md">
          <img src="/media/mac-2.png" alt="Asset-1" className="w-20 h-16" />

          <div>
            <div className="font-gilroySemiBold text-base">
              {device?.device_name ?? ""}
            </div>
            <div className="text-[#7C7C7C] font-gilroyMedium text-xs">
              {device?.ram ?? "N/A"}. {device?.storage ?? "N/A"} .
              {device?.serial_no ?? "N/A"}
            </div>
            <div className="bg-[#ECFDF3] capitalize flex justify-center items-center rounded-2xl px-2 py-0.5 text-xs font-gilroyMedium text-[#027A48] mt-1 max-w-16">
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
        <Button
          type="button"
          className="rounded-lg text-sm  w-full font-gilroySemiBold border border-black"
          onClick={() => {
            closeBtn(false);
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="rounded-lg bg-black text-white text-sm  w-full font-gilroySemiBold border border-black"
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
        </Button>
      </div>
    </div>
  );
};

export default AssignAssetsForm;
