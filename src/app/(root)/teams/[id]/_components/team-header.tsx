import React from "react";

interface TeamHeaderProps {
  image: string;
  title: string;
  description: string;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="flex gap-5 items-center">
      <img
        src={image}
        alt="team-image"
        className="w-24 h-24 object-cover rounded-full"
      />
      <div>
        <h1 className="text-2xl flex gap-6 items-center font-semibold text-black">
          {title}
          <span className="py-1 px-3 text-sm bg-green-100 text-green-600 rounded-full">
            Active
          </span>
        </h1>
        <p className="text-[#7C7C7C] text-lg font-medium">{description}</p>
        <p className="text-sm font-medium text-[#ADADAC]">
          Reporting Manager:{" "}
          <span className="font-semibold text-xl text-black">
            Abhinav Prakash
          </span>
        </p>
      </div>
    </div>
  );
};

export default TeamHeader;
