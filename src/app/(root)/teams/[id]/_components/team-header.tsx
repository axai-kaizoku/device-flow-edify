import { Team } from "@/server/teamActions";
import React from "react";

const TeamHeader = ({ image, title, description, manager }: Team) => {
  return (
    <div className="flex gap-4 pl-3  items-center">
      <img
        src={
          image && image.length > 0
            ? image
            : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012942444.png"
        }
        alt="team-image"
        className="size-16 object-cover rounded-full"
      />
      <div className="flex flex-col gap-y-2">
        <h1 className="text-lg flex gap-3 items-center font-gilroySemiBold text-black">
          {title ?? "_"}
          {/* <span className="py-1 px-2 text-xs bg-green-100 text-green-600 rounded-full">
            Active
          </span> */}
        </h1>

        <p className="text-sm font-gilroyMedium text-[#ADADAC]">
          Reporting Manager:{" "}
          <span className="font-gilroySemiBold text-sm text-black">
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
