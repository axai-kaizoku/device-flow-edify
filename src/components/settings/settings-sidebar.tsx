import {
  Building03Icon,
  Location04Icon,
  ShieldUserIcon,
  User03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useState } from "react";
import OrgDetails from "./org-details";
import AdminAccess from "./admin-access";
import AssetLocations from "./asset-locations";
import { useQuery } from "@tanstack/react-query";
import { getCurrentOrg, Org } from "@/server/orgActions";
import UserProfileSettings from "./user-profile-setting";

type SettingsSidebarProps = {
  selectItem: number;
  searchTerm: string;
  onSelect: (index: number) => void;
};

export const sideBarItems = ({ searchTerm }: { searchTerm?: string } = {}) => {
  const { data: OrgData } = useQuery<Org>({
    queryKey: ["get-org"],
    queryFn: () => getCurrentOrg(),
  });
  return [
    // {
    //   icons: User03Icon,
    //   label: "Profile",
    //   component: <UserProfileSettings OrgData={OrgData} />,
    // },
    {
      icons: Building03Icon,
      label: "Organisation",
      component: <OrgDetails OrgData={OrgData} />,
    },

    {
      icons: ShieldUserIcon,
      label: "Admin Access",
      component: <AdminAccess searchTerm={searchTerm} />,
    },
    {
      icons: Location04Icon,
      label: "Asset Locations",
      component: <AssetLocations />,
    },
  ];
};

function SettingsSidebar({
  selectItem,
  onSelect,
  searchTerm,
}: SettingsSidebarProps) {
  return (
    <div className="flex h-full">
      {/* Left */}
      <div className="flex flex-col p-2 gap-3">
        {sideBarItems({ searchTerm }).map((item, index) => (
          <div
            key={index}
            onClick={() => onSelect(index)}
            className={`${
              selectItem === index ? "bg-[#F6F6F6]" : ""
            } flex items-center gap-2 hover:bg-[#F6F6F6] p-2  w-40 rounded-[5px] cursor-pointer`}
          >
            <HugeiconsIcon
              icon={item.icons}
              className="text-[#727272] size-4"
            />
            <h1 className="text-[13px] font-gilroyMedium text-black">
              {item.label}
            </h1>
          </div>
        ))}
      </div>
      <div className="w-[1px] h-full -mt-[6px] bg-gray-200"></div>
      {/* Right */}
      <div className="px-5 pt-4  w-full h-full overflow-y-auto">
        {sideBarItems({ searchTerm }).at(selectItem).component}
      </div>
    </div>
  );
}

export default SettingsSidebar;
