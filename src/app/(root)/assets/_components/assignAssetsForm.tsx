"use client";
import { Button, LoadingButton } from "@/components/buttons/Button";
import { GetAvatar } from "@/components/get-avatar";
import { AsyncSelect } from "@/components/ui/async-select";
import { Device, updateDevice } from "@/server/deviceActions";
import { fetchUsers, User } from "@/server/userActions";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AssignAssetsForm = ({
  closeBtn,
  device,
}: {
  closeBtn: (boo: boolean) => void;
  device: Device;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState<User>();
  const querClient = useQueryClient();
  const handleSubmit = async () => {
    if (!user?._id) {
      setError("User required");
    }

    if (user?._id) {
      setLoading(true);
      // @ts-ignore
      const res = await updateDevice(device?._id ?? "error", {
        userId: user?._id,
      });
      querClient.invalidateQueries({
        queryKey: ["fetch-assets"],
        exact: false,
        refetchType: "all",
      });

      querClient.invalidateQueries({
        queryKey: ["user-timeline"],
        type: "all",
        refetchType: "all",
        exact: false,
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

        <div className="flex flex-col gap-2 pt-3">
          <AsyncSelect<User>
            fetcher={fetchUsers}
            preload
            fixInputClear={false}
            renderOption={(user) => (
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <div className="font-gilroyMedium">{user?.first_name}</div>
                  <div className="text-xs font-gilroyRegular text-muted-foreground">
                    {user?.email}
                  </div>
                </div>
              </div>
            )}
            filterFn={(user, query) =>
              user?.first_name?.toLowerCase()?.includes(query?.toLowerCase()) ||
              user?.email?.toLowerCase()?.includes(query?.toLowerCase())
            }
            getOptionValue={(user) => user?.email}
            getDisplayValue={() => (
              <div className="flex items-center gap-2 text-left w-full">
                <div className="flex flex-col leading-tight">
                  <div className="font-gilroyMedium">{user?.email ?? ""}</div>
                </div>
              </div>
            )}
            notFound={
              <div className="py-6 text-center font-gilroyMedium text-sm">
                No users found
              </div>
            }
            label="User"
            placeholder="Assign device to"
            value={user?.email || "null"}
            onChange={(selected: User | null) =>
              setUser({
                _id: selected?._id,
                first_name: selected?.first_name,
                email: selected?.email,
                employment_type: selected?.employment_type,
                designation: selected?.designation,
              })
            }
            width="100%"
          />
          {error?.length > 0 && (
            <p className="text-destructive/80 text-xs ml-1 font-gilroyMedium">
              {error}
            </p>
          )}
        </div>
        {/* {JSON.stringify(user)} */}
        {/* {JSON.stringify(device?._id)} */}
        {user?.first_name ? (
          <div className=" w-full bg-[#f5f5f5]  rounded-md p-2.5 flex items-center gap-4 ">
            {user?.image && user?.image?.length > 0 ? (
              <img
                src={user?.image}
                alt={user?.first_name}
                className="size-14 object-cover rounded-full flex-shrink-0"
              />
            ) : (
              <GetAvatar name={user?.first_name ?? ""} size={56} />
            )}
            <div className=" w-full flex flex-col justify-center ">
              <h1 className="text-black font-gilroySemiBold text-base ">
                {user?.first_name ?? ""}
              </h1>
              <h1 className="text-[#7C7C7C] font-gilroyMedium text-sm ">
                {user?.email ?? ""}
              </h1>

              <h1 className="text-[#7C7C7C] flex  items-center text-sm  font-gilroyMedium">
                {user?.employment_type ?? ""}
                <span className="flex text-2xl mx-1 -mt-3"> </span>
                {user?.designation ?? ""}
              </h1>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex gap-2 w-full  ">
        <Button
          variant="outlineTwo"
          className="w-full"
          onClick={() => {
            closeBtn(false);
          }}
        >
          Cancel
        </Button>

        <LoadingButton
          variant="primary"
          className="w-full"
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          loading={loading}
        >
          Assign
        </LoadingButton>
      </div>
    </div>
  );
};

export default AssignAssetsForm;
