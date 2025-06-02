import { GetAvatar } from "@/components/get-avatar";
import { Team } from "@/server/teamActions";

const TeamHeader = ({ image, title, description, active_manager }: Team) => {
  return (
    <div className="flex gap-4 pl-3  items-center">
      <GetAvatar name={title} size={64} />
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
            {`${active_manager ?? "No Manager"} `}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TeamHeader;
