"use client";
import { Icons } from "@/components/icons";
import { Org } from "@/server/orgActions";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { DeleteAddress } from "./delete-address";
import EditAddress from "./edit-address";
import CreateAddress from "./create-address";

function SettingAddress({ data }: { data: Org }) {
  console.log(data);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <h1 className="text-gray-400 font-gilroySemiBold mt-2 text-lg ">
          Office Address ({data?.office_address?.length || 0})
        </h1>

        <CreateAddress totalAddresses={data?.office_address}>
          <div className="flex items-center relative py-1.5 gap-1.5   pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
            <MapPin className=" size-5 -mt-0.5" />
            <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
              Add Address
            </span>
          </div>
        </CreateAddress>
      </div>
      <div className="flex flex-wrap gap-6 h-fit">
        {data?.office_address?.map((address) => (
          <div
            key={address?._id}
            className="flex flex-col relative w-[30%] rounded-[25px] border border-gray-300 bg-white backdrop-blur-md  px-5 pb-5 pt-4 "
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
                    {address?.title}
                  </h1>
                </div>
                <h1
                  className={`${
                    address?.isPrimary
                      ? "text-success-second bg-success-foreground"
                      : "text-[#FF8000] bg-[#FFFDF0]"
                  }  text-sm font-gilroyMedium w-fit px-2  rounded-full`}
                >
                  {address?.isPrimary ? "Primary" : "Secondary"}
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
                  <p className="text-wrap">{address?.address}</p>
                  <p className="text-pretty">
                    {address?.city}, {address?.state} {address?.pinCode}
                  </p>
                  <p className="block">{address?.phone}</p>
                </div>
              </div>

              <div className="flex flex-col absolute top-2 right-5 gap-2 mt-4">
                <EditAddress address={address}>
                  <span className="rounded-full text-sm text-secondary flex items-center p-2  border border-secondary bg-white hover:border-primary hover:text-primary transition-shadow shadow-sm">
                    <Pencil size={15} />
                  </span>
                </EditAddress>
                <DeleteAddress id={address?._id!}>
                  <span className="rounded-full text-sm text-secondary flex justify-center p-2 items-center  border border-secondary  hover:border-primary hover:text-primary transition-shadow shadow-sm">
                    <Trash2 size={15} />
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
