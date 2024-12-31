"use client";
import { Icons } from "@/components/icons";
import { Org } from "@/server/orgActions";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { DeleteAddress } from "./delete-address";
import EditAddress from "./edit-address";
import CreateAddress from "./create-address";

function SettingAddress({ data }: { data: Org }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-6">
        <h1 className="text-gray-400 font-gilroySemiBold 2xl:text-lg text-base ">
          Office Address ({data?.office_address?.length || 0})
        </h1>
        <CreateAddress>
          <button className="rounded-full text-secondary flex items-center gap-2 px-4 py-2 border border-secondary">
            <MapPin className="2xl:w-5 2xl:h-5 w-4 h-4"
            />
            <h1 className="font-gilroySemiBold 2xl:text-sm text-[12px]">Add Address</h1>
          </button>
        </CreateAddress>
      </div>
      <div className="flex flex-wrap gap-6 h-fit">
        {data?.office_address?.map((address) => (
          <div
            key={address?._id}
            className="flex flex-col w-fit rounded-[33px] border border-gray-300 bg-white backdrop-blur-md shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2">
              {address?.isPrimary ? (
                <Icons.settings_green_location />
              ) : (
                <Icons.settings_orange_location />
              )}
              <div>
                <div className="flex gap-8">
                  <h1 className="2xl:text-2xl text-xl text-primary font-gilroySemiBold">
                    {address?.isPrimary ? "Primary Office" : "Secondary Office"}
                  </h1>
                  <h1
                    className={`${
                      address?.isPrimary
                        ? "text-success-second bg-success-foreground"
                        : "text-[#FF8000] bg-[#FFFDF0]"
                    } flex justify-center rounded-full font-gilroyMedium items-center px-3`}
                  >
                    {address?.isPrimary ? "Primary" : "Secondary"}
                  </h1>
                </div>
                <h1 className="text-base text-[#7C7C7C] font-gilroyMedium mt-1">
                  {address?.title}
                </h1>
              </div>
            </div>
            <div className="flex justify-between items-center  pt-4 w-full">
              <div className="space-y-2">
                <div>
                  <h1 className="text-secondary text-sm font-gilroySemiBold mb-0">
                    Address:
                  </h1>
                </div>
                <div className="text-primary text-sm font-gilroySemiBold max-w-full overflow-hidden">
                  <p className="block">
                    {address?.city}, {address?.landmark},
                  </p>
                  <p className="block">
                    {address?.state}, {address?.pinCode},
                  </p>
                  <p className="block">{address?.phone}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <EditAddress address={address}>
                  <span className="rounded-full text-sm text-secondary flex items-center gap-2 p-2 border border-secondary bg-white hover:border-primary hover:text-primary transition-shadow shadow-sm">
                    <Pencil size={18} />
                  </span>
                </EditAddress>
                <DeleteAddress id={address?._id!}>
                  <span className="rounded-full text-sm text-secondary flex items-center gap-2 p-[0.58rem] border border-secondary  hover:border-primary hover:text-primary transition-shadow shadow-sm">
                    <Trash2 size={16} />
                  </span>
                </DeleteAddress>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingAddress;
