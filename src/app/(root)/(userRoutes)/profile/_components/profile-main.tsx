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
import React, { useEffect, useState } from "react";
import { AssetsSection } from "./user-assets";
import { getUserById, User } from "@/server/userActions";
import { MemberIcon } from "@/app/(root)/teams/_components/member-icon";
import { notFound, useRouter } from "next/navigation";
import { UserData } from "@/app/store/authSlice";

const UserGrid = ({ user: data }: { user: UserData }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data?.userId) {
          const fetchedData: User = await getUserById(data.userId);
          setUser(fetchedData);
        }
      } catch (error) {
        notFound();
      }
    };

    fetchData();
  }, [data]);

  const renderMembers = () => {
    if (user?.teamId?.employees_count === 0) {
      return Array(3)
        .fill(null)
        ?.map((_, index) => <MemberIcon key={index} isPlaceholder={true} />);
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
      <div className="w-full h-full font-gilroyRegular grid grid-cols-3 mt-2">
        {/* First Column */}
        <div className="flex flex-col gap-6">
          {/* First Row */}
          <div className="w-96 h-40 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[50px] p-2">
            <div className="flex justify-start gap-4 items-start w-full px-6">
              <div className="w-[90px] h-[90px] rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={
                    user?.image ??
                    "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-2xl font-gilroySemiBold text-gray-800 dark:text-gray-200">
                  {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`}
                </h1>
                <p className="text-[#7C7C7C] text-base font-gilroyMedium">
                  {user?.designation ?? ""} . {user?.teamId?.title || "Tech"}
                </p>
                <div className="flex gap-2 mt-2">
                  <div className="flex justify-center items-center gap-[6.217px] px-[8.29px] py-[2.072px] rounded-[16.58px] bg-[#ECFDF3]">
                    <span className="text-center text-[#027A48]  text-[12.435px] font-gilroyMedium leading-[18.652px]">
                      Active
                    </span>
                  </div>

                  <div className="flex justify-center items-center gap-[6.217px] px-[8.29px] py-[2.072px] rounded-[16.58px] bg-[#FFE8D6]">
                    <span className="text-center text-[#E89F02]  text-[12.435px] font-gilroyMedium leading-[18.652px]">
                      {user?.employment_type ?? ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="w-96 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[50px] px-2 py-6">
            <div className="flex flex-col justify-start gap-5 items-start w-full px-6">
              <div className="font-gilroySemiBold text-gray-500 text-xl">
                Personal Info.
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Mail className="w-8 h-8 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-base text-gray-500 font-gilroySemiBold">
                    Email
                  </div>
                  <div className="font-gilroySemiBold">{user?.email ?? ""}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Smartphone className="w-8 h-8 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-base text-gray-500 font-gilroySemiBold">
                    Phone
                  </div>
                  <div className="font-gilroySemiBold">{user?.phone ?? ""}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Cake className="w-8 h-8 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-base text-gray-500 font-gilroySemiBold">
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
                  <Link className="w-8 h-8 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-base text-gray-500 font-gilroySemiBold">
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
        <div className="flex flex-col  gap-6">
          {/* First Row */}
          <div className="w-96 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[50px] px-2">
            <div className="flex flex-col gap-4 items-start w-full px-6 py-4">
              <div className="font-gilroySemiBold text-gray-500 text-xl">
                Reporting Manager
              </div>
              <div className="flex justify-start gap-4 items-start w-full">
                <div className="w-[78px] h-[78px] rounded-full overflow-hidden flex-shrink-0">
                  <img
                    // src={user?.reporting_manager?.image}
                    src="https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col relative w-full">
                  <h1 className="text-xl font-gilroySemiBold dark:text-gray-200">
                    {`${user?.reporting_manager?.first_name} ${user?.reporting_manager?.last_name}`}
                  </h1>
                  <div
                    className="absolute text-[#CDCDCD] text-xs top-1 -right-3 cursor-pointer"
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
                        <div className="font-gilroyMedium text-gray-500 text-sm">
                          {user?.teamId?.employees_count} Team Members
                        </div>
                      ) : (
                        <div className="font-gilroyMedium text-gray-500 text-sm">
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
          <div className="w-96 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[50px] px-2 py-6">
            <div className="flex flex-col justify-start gap-5 items-start w-full px-6">
              <div className="font-gilroySemiBold text-gray-500 text-xl">
                Organisation Info.
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Building2 className="w-8 h-8 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-base text-gray-500 font-gilroySemiBold">
                    Company
                  </div>
                  <div className="font-gilroySemiBold">
                    {data?.orgId?.name ?? "-"}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <NotepadText className="w-8 h-8 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-base text-gray-500 font-gilroySemiBold">
                    Org Contact
                  </div>
                  <div className="font-gilroySemiBold">
                    {data?.addressDetails?.phone ?? "-"}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <Mail className="w-8 h-8 text-gray-600" />
                </div>
                <div className="flex flex-col">
                  <div className="text-base text-gray-500 font-gilroySemiBold">
                    Email
                  </div>
                  <div className="font-gilroySemiBold">
                    {data?.orgId?.email ?? "-"}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gray-100 rounded-2xl">
                  <MapPin className="w-8 h-8 text-gray-600" />
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
          <div className="w-96 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[50px] p-6">
            <AssetsSection user={user!} />
          </div>

          {/* Second Row */}
          <div className="w-96 h-36 flex items-center bg-white bg-opacity-80 backdrop-blur-[22.8px] border border-[rgba(195,195,195,0.31)] rounded-[50px] p-6">
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGrid;
