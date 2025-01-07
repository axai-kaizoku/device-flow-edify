import { UserData } from "@/app/store/authSlice";

type TeamHeaderProps = UserData["teamId"];

const TeamHeader = ({ teamData: team }: { teamData: TeamHeaderProps }) => {
  return (
    <div className="flex gap-5 items-center">
      <img
        src={
          team?.image ??
          "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp"
        }
        alt="team-image"
        className="size-20 object-cover rounded-full"
      />
      <div>
        <h1 className="text-xl flex gap-3 items-center font-gilroySemiBold text-black">
          {team?.title ?? "-"}
          <span className="py-1 px-2 text-xs bg-green-100 text-green-600 rounded-full">
            Active
          </span>
        </h1>
        <p className="text-[#7C7C7C] text-base font-gilroyMedium">
          {team?.description ?? "-"}
        </p>
        <p className="text-sm font-gilroyMedium text-[#ADADAC]">
          Reporting Manager: {/* Logic yet to be done */}
          <span className="font-gilroySemiBold text-lg text-black">
            {/* {`${team?.manager[0].first_name ?? "No Manager"} ${
              team?.manager[0].last_name ?? ""
            }`} */}
            Logic yet to be done
          </span>
        </p>
      </div>
    </div>
  );
};

export default TeamHeader;
