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
        src={
          image ||
          "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
        }
        alt="team-image"
        className="w-24 h-24 object-cover rounded-full"
      />
      <div>
        <h1 className="text-2xl flex gap-6 items-center font-gilroySemiBold text-black">
          {title}
          <span className="py-1 px-3 text-sm bg-green-100 text-green-600 rounded-full">
            Active
          </span>
        </h1>
        <p className="text-[#7C7C7C] text-lg font-gilroyMedium">
          {description}
        </p>
        <p className="text-sm font-gilroyMedium text-[#ADADAC]">
          Reporting Manager:{" "}
          <span className="font-gilroySemiBold text-xl text-black">
            Abhinav Prakash
          </span>
        </p>
      </div>
    </div>
  );
};

export default TeamHeader;
