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
  title: string;
  description: string;
  image?: string;
  employees_count: number;
  _id: string;
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
    <div className="relative rounded-[31px] shadow-md w-90 border border-gray-300 p-6 flex flex-col  transition-all ">
      <Link
        href={`/teams/${_id}`}
        className="flex flex-col gap-[10px] cursor-pointer"
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
              <h1 className=" text-base font-normal">Aniket Prakash</h1>
              <p className="text-sm text-gray-600">Manager</p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div>
          <p className="font-normal text-2xl line-clamp-2">{title}</p>
          <p className="text-gray-600 text-base font-normal line-clamp-2">
            {description}
          </p>
        </div>

        {/* Members Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium text-gray-600">
            {employees_count === 0
              ? "No Members Yet"
              : `${employees_count} Active Members`}
          </h1>
          <div className="flex -space-x-5">{renderMembers()}</div>
        </div>
      </Link>

      {/* Buttons Section */}
      {buttons && (
        <div className="absolute flex-col flex gap-2 right-4">{buttons}</div>
      )}
    </div>
  );
};
