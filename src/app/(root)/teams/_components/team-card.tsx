"use client";

import { Icons } from "@/components/icons";
import Link from "next/link";

const MemberIcon = ({
  src,
  isPlaceholder,
}: {
  src?: string;
  isPlaceholder: boolean;
}) => (
  <div
    className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center ${
      isPlaceholder ? "bg-gray-200 text-gray-500" : ""
    }`}
  >
    {isPlaceholder ? (
      <Icons.team_no_memeber_logo className="w-4 h-4" />
    ) : (
      <img
        src={src}
        alt="Member"
        className="rounded-full w-full h-full object-cover"
      />
    )}
  </div>
);

interface TeamCardProps {
  title?: string;
  description?: string;
  image?: string;
  employees_count?: number;
  _id?: string;
  active_manager?: { _id: string; first_name: string; image?: string }[];
  active_employees?: { _id: string; first_name: string; image?: string }[];
  buttons?: React.ReactNode;
}

export const TeamCard = ({
  title,
  description,
  image,
  employees_count,
  _id,
  active_manager,
  active_employees,
  buttons,
}: TeamCardProps) => {
  const defaultImage =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

  const renderMembers = () => {
    const members = active_employees || [];
    const maxMembersToShow = 3;

    // Render up to 3 members, including placeholders for missing ones
    return Array.from({ length: maxMembersToShow }, (_, index) => {
      const member = members[index];
      if (member) {
        // Render a member with an image (or default fallback)
        return (
          <MemberIcon
            key={member?._id || index}
            src={member?.image || defaultImage}
            isPlaceholder={!member?.image}
          />
        );
      } else {
        // Render a placeholder if no member exists for this slot
        return <MemberIcon key={`placeholder-${index}`} isPlaceholder={true} />;
      }
    });
  };

  return (
    <div
      className="border border-[rgba(171,171,171,0.19)] hover:border-[#B3B3B3] bg-[#FCFCFC] backdrop-blur-[14.1px]
 relative rounded-[25px] w-96 2xl:w-[402px] p-5 flex flex-col transition-all"
    >
      <Link
        href={`/teams/${_id}`}
        className="flex flex-col gap-6 cursor-pointer"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={active_manager?.[0]?.image || defaultImage}
              alt="manager-icon"
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="-mt-1 flex-col flex">
              <h1 className="text-lg 2xl:text-xl font-gilroySemiBold">
                {active_manager?.[0]?.first_name || "No Manager"}
              </h1>
              <p className="text-base font-gilroyMedium text-[#7C7C7C] -mt-1">
                Manager
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div>
          <p className="font-gilroySemiBold text-2xl line-clamp-2">{title}</p>
          <p className="text-[#7C7C7C] text-base font-gilroyMedium line-clamp-2">
            {description}
          </p>
        </div>

        {/* Members Section */}
        <div className="flex -mt-3 items-center justify-between">
          <h1 className="text-base 2xl:text-lg font-gilroyMedium text-[#7C7C7C]">
            {employees_count === 0
              ? "No Members Yet"
              : `${employees_count} Active Members`}
          </h1>
          <div className="flex -space-x-5">{renderMembers()}</div>
        </div>
      </Link>

      {/* Buttons Section */}
      {buttons && (
        <div className="absolute flex-col flex gap-2 right-5">{buttons}</div>
      )}
    </div>
  );
};
