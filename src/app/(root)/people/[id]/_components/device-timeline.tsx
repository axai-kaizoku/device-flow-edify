import { GetAvatar } from "@/components/get-avatar";
import {
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/timeline/timeline";
import Link from "next/link";

const DeviceCard = ({ target, deviceLink }) => (
  <Link href={deviceLink} className="w-fit">
    <div className="border-[#E5E5E5]  hover:border-black border p-2 flex justify-between items-center rounded-md w-[22rem]">
      <div className="flex gap-2">
         {/*{JSON.stringify(target)}*/}
        <GetAvatar name={target?.deviceName || ""} isDeviceAvatar size={40} />
        <div>
          <h1 className="text-sm text-black font-gilroyMedium">
            {target?.deviceName || "-"}
          </h1>

          <h3 className="text-gray-600 text-xs font-gilroyMedium">
            {[
              target?.deviceSerialNumber?.trim(),
              target?.deviceRam?.trim(),
              Array.isArray(target?.deviceStorage) &&
              target.deviceStorage.length > 0
                ? target.deviceStorage.join(" / ")
                : null,
            ]
              .filter(Boolean)
              .join(" | ")}
          </h3>
        </div>
      </div>
    </div>
  </Link>
);

const ActionText = ({
  action,
  deviceLink,
  userLink,
  userName,
  actorLink,
  actorName,
  oldUserLink,
  target,
}) => {
  switch (action) {
    case "assign-device":
      return (
        <div className="flex flex-wrap gap-1">
          <Link href={deviceLink}>
            <span className="text-black"> {target?.deviceName || "-"}</span>
          </Link>{" "}
          assigned to{" "}
          <span className="underline text-black ">
            <Link href={userLink}>{userName || "-"}</Link>
          </span>{" "}
          by{" "}
          <span className="text-black">
            <Link href={actorLink}>{actorName || "-"}</Link>
          </span>
        </div>
      );
    case "re-assign-device":
      return (
        <>
          <span className="text-black">
            <Link href={deviceLink}>{target?.deviceName || "-"}</Link>
          </span>{" "}
          re-assigned to{" "}
          <span className="underline text-black">
            <Link href={userLink}>{userName || "-"}</Link>
          </span>{" "}
          from{" "}
          <span className="underline text-black">
            <Link href={oldUserLink}>{target?.oldAssigneduserName || "-"}</Link>
          </span>{" "}
          by{" "}
          <span className="text-black">
            <Link href={actorLink}>{actorName || "-"}</Link>
          </span>
        </>
      );
    case "un-assign-device":
      return (
        <>
          <span className="text-black">
            <Link href={deviceLink}>{target?.deviceName || "-"}</Link>
          </span>{" "}
          is unassigned from{" "}
          <span className="underline text-black">
            <Link href={userLink}>{userName || "-"}</Link>
          </span>{" "}
          by{" "}
          <span className="text-black">
            <Link href={actorLink}>{actorName || "-"}</Link>
          </span>
        </>
      );
    case "temp-assigned":
      return (
        <>
          <span className="text-black">
            <Link href={deviceLink}>{target?.deviceName || "-"}</Link>
          </span>{" "}
          is temporarily assigned to{" "}
          <span className="text-black">
            <Link href={userLink}>{userName || "-"}</Link>
          </span>{" "}
          by{" "}
          <span className="text-black">
            <Link href={actorLink}>{actorName || "-"}</Link>
          </span>
        </>
      );
    case "device-deleted":
      return (
        <>
          <span className="text-black">
            <Link href={deviceLink}>{target?.deviceName || "-"}</Link>
          </span>{" "}
          is deleted by{" "}
          <span className="text-black pl-[1px]">
            {" "}
            <Link href={actorLink}>{actorName || "-"} </Link>
          </span>
        </>
      );
    case "assigned-device-acknowledged":
      return (
        <>
          <Link href={userLink}>
            <span className="text-black">{userName}</span>
          </Link>{" "}
          acknowledged the assigned device{" "}
          <span className="text-black underline">
            <Link href={deviceLink}>{target?.deviceName || "-"}</Link>
          </span>
        </>
      );
    case "assigned-device-not-acknowledged":
      return (
        <>
          <span className="text-black">
            <Link href={userLink}>
              <span className="text-black">{userName}</span>
            </Link>
          </span>{" "}
          declined the assigned device{" "}
          <span className="text-black underline">
            <Link href={deviceLink}>{target?.deviceName || "-"}</Link>
          </span>
        </>
      );
    case "device-added":
      return (
        <div className="flex gap-1 flex-wrap">
          <span className="text-black">
            <Link href={deviceLink}>{target?.deviceName || "-"}</Link>
          </span>{" "}
          is added by{" "}
          <span className="text-black pl-[1px]">
            {" "}
            <Link href={actorLink}>{actorName || "-"} </Link>
          </span>
        </div>
      );
    case "added-to-shelf":
      return (
        <>
          <Link href={deviceLink}>
            <span className="text-black">
              {target?.deviceName || "-"} ({target?.deviceSerialNumber || "-"})
            </span>
          </Link>{" "}
          is added to shelf by{" "}
          <span className="text-black pl-[1px]">
            {" "}
            <Link href={actorLink}>{actorName || "-"} </Link>
          </span>
        </>
      );
    case "collected":
      return (
        <>
          <Link href={deviceLink}>
            <span className="text-black">
              {target?.deviceName || "-"} ({target?.deviceSerialNumber || "-"})
            </span>
          </Link>{" "}
          is collected by{" "}
          <span className="text-black pl-[1px]">
            {" "}
            {target?.shelfAssetCollectorName || "-"}
          </span>
        </>
      );
    case "device-active":
      return (
        <>
          <Link href={deviceLink}>
            <span className="text-black">{target?.deviceName || "-"}</span>
          </Link>{" "}
          is set as active by{" "}
          <span className="text-black pl-[1px]">
            {" "}
            <Link href={actorLink}>{actorName || "-"} </Link>
          </span>
        </>
      );
    case "device-inactive":
      return (
        <>
          <Link href={deviceLink}>
            <span className="text-black">{target?.deviceName || "-"}</span>
          </Link>{" "}
          is set as inactive by{" "}
          <span className="text-black pl-[1px]">
            <Link href={actorLink}>{actorName || "-"} </Link>
          </span>
        </>
      );

    default:
      return null;
  }
};

const statusMap = {
  "assign-device": "asset-assigned",
  "re-assign-device": "asset-assigned",
  "un-assign-device": "un-assign-device",
  "temp-assigned": "asset-assigned",
  "device-deleted": "device-deleted",
  "assigned-device-acknowledged": "assigned-device-acknowledged",
  "assigned-device-not-acknowledged": "assigned-device-not-acknowledged",
  "device-added": "asset-assigned",
  "added-to-shelf": "added-to-shelf",
  collected: "asset-assigned",
  "device-active": "asset-assigned",
  "device-inactive": "device-inactive",
};

export default function DeviceTimeLine({
  action,
  log,
  deviceLink,
  target,
  userLink,
  userName,
  actorLink,
  actorName,
  time,
  oldUserLink,
}) {
  if (!statusMap[action]) return null;

  return (
    <TimelineItem key={log?._id}>
      <TimelineHeading>
        <div className="text-sm  font-gilroyMedium  text-[#808080]">
          <ActionText
            action={action}
            deviceLink={deviceLink}
            userLink={userLink}
            userName={userName}
            actorLink={actorLink}
            actorName={actorName}
            oldUserLink={oldUserLink}
            target={target}
          />
        </div>
      </TimelineHeading>

      <TimelineDot status={statusMap[action]} />
      <TimelineLine />

      <TimelineContent className="w-full  flex flex-col gap-2 mt-1">
        <DeviceCard
          target={target}
          deviceLink={`/assets/${target?.deviceId}`}
        />
        <div className="text-xs font-gilroyMedium text-[#CCCCCC]">{time}</div>
      </TimelineContent>
    </TimelineItem>
  );
}
