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
    <div className="flex flex-col my-6">
      <div className="flex justify-between mb-6">
        <h1 className="font-semibold text-2xl text-secondary">
          Office Address ({data?.office_address?.length || 0})
        </h1>
        <CreateAddress>
          <button className="rounded-full text-secondary flex items-center gap-2 px-4 py-2 border border-secondary bg-white hover:bg-gray-100 transition-shadow shadow-sm">
            <MapPin size={18} />
            <h1 className="font-semibold text-sm">Add Address</h1>
          </button>
        </CreateAddress>
      </div>
      <div className="flex flex-wrap gap-6 h-fi">
        {data?.office_address?.map((address) => (
          <div
            key={address?._id}
            className="flex flex-col w-fit rounded-[33px] border border-gray-300 bg-white backdrop-blur-md shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-2">
              {address?.isPrimary ? (
                <Icons.settings_green_location />
              ) : (
                <Icons.settings_orange_location />
              )}
              <div>
                <div className="flex gap-8">
                  <h1 className="text-xl text-primary font-semibold">
                    {address?.isPrimary ? "Primary Office" : "Secondary Office"}
                  </h1>
                  <h1
                    className={`${
                      address?.isPrimary
                        ? "text-success-second bg-success-foreground"
                        : "text-alert bg-alert-foreground"
                    } flex justify-center rounded-full font-semibold items-center px-2`}
                  >
                    {address?.isPrimary ? "Primary" : "Secondary"}
                  </h1>
                </div>
                <h1 className="text-base   w-40 text-secondary font-medium mt-1">
                  {address?.title}
                </h1>
              </div>
            </div>
            <div className="flex justify-between items-center  pt-4 w-full">
              <div className="space-y-2">
                <div>
                  <h1 className="text-secondary text-sm font-semibold mb-0">
                    Address:
                  </h1>
                </div>
                <div className="text-primary text-sm font-semibold max-w-full overflow-hidden">
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
                  <button className="rounded-full text-sm text-secondary flex items-center gap-2 p-2 border border-secondary bg-white hover:border-primary hover:text-primary transition-shadow shadow-sm">
                    <Pencil size={18} />
                  </button>
                </EditAddress>
                <DeleteAddress id={address?._id!}>
                  <button className="rounded-full text-sm text-secondary flex items-center gap-2 p-2 border border-secondary  hover:border-primary hover:text-primary transition-shadow shadow-sm">
                    <Trash2 size={16} />
                  </button>
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
