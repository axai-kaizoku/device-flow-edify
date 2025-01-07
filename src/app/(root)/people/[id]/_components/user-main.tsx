"use client";
import {
  Building2,
  Cake,
  ChevronRight,
  Link,
  Mail,
  MapPin,
  NotepadText,
  Smartphone,
} from "lucide-react";
import React from "react";
import AssetsSection from "./assets-section";
import { User } from "@/server/userActions";
import { MemberIcon } from "@/app/(root)/teams/_components/member-icon";
import { useRouter } from "next/navigation";
import { UserData } from "@/app/store/authSlice";
import { useSelector } from "react-redux";

const UserGrid = ({ user }: { user: User }) => {
  const router = useRouter();
  const data: UserData = useSelector((state: any) => state.auth.userData);

  const renderMembers = () => {
    if (user?.teamId?.employees_count === 0) {
      return Array(3)
        .fill(null)
        .map((_, index) => <MemberIcon key={index} isPlaceholder={true} />);
    }
    return (
      <>
        <MemberIcon src="https://picsum.photos/300/300" isPlaceholder={false} />
        <MemberIcon src="https://picsum.photos/301/300" isPlaceholder={false} />
        <MemberIcon src="https://picsum.photos/302/300" isPlaceholder={false} />
      </>
    );
  };
  return (
    <>
      <div className="flex flex-wrap gap-6 mt-2 font-gilroyRegular">
        {/* First Column */}
        <div className="flex flex-col gap-6">
          {/* First Row */}
          <div className="w-96 h-40 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[25px] px-6 py-4">
            <div className="flex justify-start gap-4 items-start w-full ">
              <div className="w-[90px] h-[90px] rounded-full t overflow-hidden flex-shrink-0">
                <img
                  src={
                    user?.image ||
                    "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
                  }
                  // Replace with your profile image URL
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-[22px] font-gilroySemiBold text-gray-800 dark:text-gray-200">
                  {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`}
                </h1>
                <p className="text-[#7C7C7C] text-sm font-gilroyMedium whitespace-nowrap">
                  {user?.designation ?? ""} . {user?.teamId?.title ?? "-"}
                </p>
                <div className="flex gap-2 mt-2">
                  <div className="flex justify-center items-center gap-[6.217px] px-[8.29px] py-[2.072px] rounded-[16.58px] bg-[#ECFDF3]">
                    <span className="text-center text-[#027A48] text-[12.435px] font-gilroyMedium leading-[18.652px]">
                      Active
                    </span>
                  </div>

                  <div className="flex justify-center items-center gap-[6.217px] px-[8.29px] py-[2.072px] rounded-[16.58px] bg-[#FFE8D6]">
                    <span className="text-center text-[#E89F02] text-[12.435px] font-gilroyMedium leading-[18.652px]">
                      {user?.employment_type ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="w-96 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[25px] px-6 py-4">
            <div className="flex flex-col justify-start gap-5 items-start w-full ">
              <div className="font-gilroySemiBold text-lg">Personal Info.</div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Mail className="size-6 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500 font-gilroySemiBold">
                    Email
                  </div>
                  <div className="font-gilroySemiBold">{user?.email ?? ""}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Smartphone className="size-6 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500 font-gilroySemiBold">
                    Phone
                  </div>
                  <div className="font-gilroySemiBold">{user?.phone ?? ""}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Cake className="size-6 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500 font-gilroySemiBold">
                    Date of Birth
                  </div>
                  <div className="font-gilroySemiBold">
                    {new Date(
                      user?.date_of_birth as string
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Link className="size-6 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500 font-gilroySemiBold">
                    Joining Date
                  </div>
                  <div className="font-gilroySemiBold">
                    {new Date(
                      user?.onboarding_date as string
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex flex-col gap-6">
          {/* First Row */}
          <div className="w-96 px-6 py-4 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[25px]">
            <div className="flex flex-col gap-2 items-start w-full ">
              <div className="font-gilroySemiBold  text-lg">
                Reporting Manager
              </div>
              <div className="flex justify-start gap-4 items-start w-full">
                <div className="w-[78px] h-[78px] rounded-full overflow-hidden flex-shrink-0">
                  <img
                    // src={user?.reporting_manager?.image}
                    src="https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
                    // Replace with your profile image URL
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col relative w-full">
                  <h1 className="text-lg font-gilroySemiBold dark:text-gray-200">
                    {`${user?.reporting_manager?.first_name} ${user?.reporting_manager?.last_name}`}
                  </h1>
                  <div
                    className="absolute text-[#CDCDCD] text-xs top-4 -right-3 cursor-pointer"
                    onClick={() => {
                      router.push(`/people/${user?.reporting_manager?._id}`);
                    }}
                  >
                    <ChevronRight />
                  </div>

                  <p className="text-gray-500 font-gilroyMedium text-sm">
                    {user?.reporting_manager?.email}
                  </p>
                  <div className="flex gap-2 mt-2 justify-start items-center">
                    <div className="flex justify-start items-center">
                      <div className="flex -space-x-5">{renderMembers()}</div>
                    </div>

                    <div>
                      {user?.teamId?.employees_count ? (
                        <div className="font-gilroyMedium text-gray-500 text-xs">
                          {user?.teamId?.employees_count} Team Members
                        </div>
                      ) : (
                        <div className="font-gilroyMedium text-gray-500 text-xs">
                          5 Team Members
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="w-96 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[25px] px-6 py-4">
            <div className="flex flex-col justify-start gap-5 items-start w-full ">
              <div className="font-gilroySemiBold  text-lg">
                Organisation Info.
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Building2 className="size-6 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500 font-gilroySemiBold">
                    Company
                  </div>
                  <div className="font-gilroySemiBold ">
                    {data?.orgId?.name ?? "-"}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <NotepadText className="size-6 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500 font-gilroySemiBold">
                    Org Contact
                  </div>
                  <div className="font-gilroySemiBold">
                    {data?.addressDetails?.phone ?? "-"}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Mail className="size-6 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500 font-gilroySemiBold">
                    Email
                  </div>
                  <div className="font-gilroySemiBold">
                    {data?.orgId?.email ?? "-"}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <MapPin className="size-6 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-base text-gray-500 font-gilroySemiBold">
                    Address
                  </div>
                  <div className="font-gilroySemiBold">
                    {data?.addressDetails?.city ?? "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col gap-6">
          {/* First Row (Reversed Order) */}
          <div className="w-96 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[25px] p-6">
            <AssetsSection user={user} />
          </div>

          {/* Second Row */}
          <div className="w-96 h-36 relative flex  bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[25px] px-6 py-4 flex-col">
            <h1 className="text-[10px] text-[#B1B1B1] border border-[#B2B2B2] w-fit px-2 py-0.5 rounded-full">
              Store
            </h1>
            <div>
              <div>
                <h1 className="w-52 font-gilroyMedium text-xl">
                  Highest Quality, Refurbished & New Devices
                </h1>
                <div className="flex absolute top-7 right-4 w-fit justify-center font-gilroyMedium items-center bg-black text-white rounded-full text-base gap-1 py-1 px-2">
                  Visit <ChevronRight />
                </div>
              </div>
              <h1 className="text-xs text-[#B1B1B1] font-gilroyRegular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod.
              </h1>
            </div>
            <div>
              <img src="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGrid;
