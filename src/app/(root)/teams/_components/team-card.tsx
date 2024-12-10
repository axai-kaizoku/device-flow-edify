"use client";

import Link from "next/link";

const MemberIcon = ({
  src,
  isPlaceholder,
}: {
  src?: string;
  isPlaceholder: boolean;
}) => (
  <div
    className={`size-9 rounded-full border-2 border-white flex items-center justify-center ${
      isPlaceholder ? "bg-gray-200 text-gray-500" : ""
    }`}
  >
    {isPlaceholder ? (
      "+"
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
  buttons?: React.ReactNode; // Allow passing custom buttons as a prop
}

export const TeamCard = ({
  title,
  description,
  image,
  employees_count,
  _id,
  buttons,
}: TeamCardProps) => {
  const renderMembers = () => {
    if (employees_count === 0) {
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
    <div
      className="border border-[rgba(171,171,171,0.19)] hover:border-[#B3B3B3] bg-[#FCFCFC] backdrop-blur-[14.1px]
 relative rounded-[35px]  w-90   p-6 flex flex-col  transition-all "
    >
      <Link
        href={`/teams/${_id}`}
        className="flex flex-col gap-6 cursor-pointer"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={image || "https://picsum.photos/300/300"}
              alt="team-icon"
              className="w-12 h-12 object-cover rounded-full border-2 border-white "
            />
            <div>
              <h1 className=" text-base font-semibold">Aniket Prakash</h1>
              <p className="text-sm font-medium text-[#7C7C7C]">Manager</p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div>
          <p className="font-semibold text-2xl line-clamp-2">{title}</p>
          <p className="text-[#7C7C7C] text-base font-medium line-clamp-2">
            {description}
          </p>
        </div>

        {/* Members Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium text-[#7C7C7C]">
            {employees_count === 0
              ? "No Members Yet"
              : `${employees_count} Active Members`}
          </h1>
          <div className="flex -space-x-5">{renderMembers()}</div>
        </div>
      </Link>

      {/* Buttons Section */}
      {buttons && (
        <div className="absolute  flex-col flex gap-2 right-4">{buttons}</div>
      )}
    </div>
  );
};
