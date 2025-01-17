import { Team } from "@/server/teamActions";
import React from "react";

const TeamHeader = ({ image, title, description, manager }: Team) => {
  return (
    <div className="flex gap-5 pl-3 pt-2 items-center">
      <img
        src={
          image && image.length > 0
            ? image
            : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012942444.png"
        }
        alt="team-image"
        className="size-20 object-cover rounded-full"
      />
      <div>
        <h1 className="text-xl flex gap-3 items-center font-gilroySemiBold text-black">
          {title ?? "_"}
          <span className="py-1 px-2 text-xs bg-green-100 text-green-600 rounded-full">
            Active
          </span>
        </h1>
        <p className="text-[#7C7C7C] text-base font-gilroyMedium">
          {description ?? "-"}
        </p>
        <p className="text-sm font-gilroyMedium text-[#ADADAC]">
          Reporting Manager:{" "}
          <span className="font-gilroySemiBold text-lg text-black">
            {`${manager![0]?.first_name ?? "No Manager"} ${
              manager![0]?.last_name ?? ""
            }`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TeamHeader;
