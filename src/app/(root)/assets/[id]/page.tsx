import { CombinedContainer } from "@/components/container/container";
import { Icons } from "@/components/icons";
import { Device, getDeviceById } from "@/server/deviceActions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DeleteAsset } from "./_components/delete-asset";
import { UnassignAsset } from "./_components/unassign-asset";
import ReassignAsset from "./_components/reassign-asset";
import { DeviceGrid } from "./_components/device-grid";

interface DevicePageProps {
  params: { id: string };
}

export default async function SingleDevice({ params }: DevicePageProps) {
  const data: Device = await getDeviceById(params.id);

  return (
    <CombinedContainer title="Devices">
      <div className="flex justify-between w-full ">
        <div className="text-[#7F7F7F] font-gilroySemiBold text-base 2xl:text-lg">
          Device ID: EDIFY-0033378
        </div>
        <div className="flex gap-5 mt-2">
          <div className="flex gap-2.5">
            {data.userId ? (
              <>
                <UnassignAsset id={params.id ?? ""}>
                  <div className="border rounded-full h-fit py-2 px-6 border-gray-500">
                    <div className="text-[#6C6C6C] font-gilroyMedium text-md flex items-center gap-2">
                      <Icons.unassign_asset /> Unassign
                    </div>
                  </div>
                </UnassignAsset>
              </>
            ) : (
              <></>
            )}
            {data.userId ? (
              <>
                <ReassignAsset deviceData={data}>
                  <div className="border rounded-full h-fit py-2 px-6 border-gray-500">
                    <p className="text-[#6C6C6C] font-gilroyMedium text-md flex items-center gap-2">
                      <Icons.reassign_asset /> Reassign
                    </p>
                  </div>
                </ReassignAsset>
              </>
            ) : (
              <>
                <ReassignAsset deviceData={data}>
                  <div className="border rounded-full h-fit py-2 px-6 border-gray-500">
                    <p className="text-[#6C6C6C] font-gilroyMedium text-md flex items-center gap-2">
                      <Icons.reassign_asset /> Assign
                    </p>
                  </div>
                </ReassignAsset>
              </>
            )}

            <DeleteAsset id={params.id ?? ""}>
              <div className="border rounded-full h-fit py-2 px-6 border-gray-500">
                <p className="text-[#6C6C6C] font-gilroyMedium text-md flex items-center gap-2">
                  <Icons.delete_asset /> Delete
                </p>
              </div>
            </DeleteAsset>
            <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
              <ChevronLeft className="text-[#6C6C6C]" />
            </div>
            <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
              <ChevronRight className="text-[#6C6C6C]" />
            </div>
          </div>
        </div>
      </div>

      <DeviceGrid data={data} />
    </CombinedContainer>
  );
}
