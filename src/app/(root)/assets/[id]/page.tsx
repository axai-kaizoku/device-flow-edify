import { CombinedContainer } from "@/components/container/container";
import { Icons } from "@/components/icons";
import { Device, getDeviceById, StoreDevice } from "@/server/deviceActions";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { DeleteAsset } from "./_components/delete-asset";
import { UnassignAsset } from "./_components/unassign-asset";
import ReassignAsset from "./_components/reassign-asset";
import { DeviceGrid } from "./_components/device-grid";
import CreateIssue from "../_components/addDevices/_components/create-issue";

interface DevicePageProps {
  params: { id: string };
}

export default async function SingleDevice({ params }: DevicePageProps) {
  const data: StoreDevice = await getDeviceById(params.id);
  return (
    <CombinedContainer title="Devices">
      <div className="flex justify-between w-full mt-2">
        <div className="text-[#7F7F7F] font-gilroySemiBold pt-[5px] text-base 2xl:text-lg">
          Device ID: <span className="text-black">EDIFY-0033378</span>
        </div>
        <div className="flex gap-5 pr-7">
          <div className="flex gap-2.5">
            {data.userId ? (
              <>
                <UnassignAsset id={params.id ?? ""}>
                  <div className="flex items-center relative py-1.5 gap-1  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                    <Icons.unassign_asset className="text-black size-5" />
                    <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                      Unassign
                    </span>
                  </div>
                </UnassignAsset>
              </>
            ) : (
              <></>
            )}
            {data.userId ? (
              <>
                <ReassignAsset deviceData={data}>
                  <div className="flex items-center relative py-1.5 gap-1  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                    <Icons.reassign_asset className="text-black size-5" />
                    <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                      Reassign
                    </span>
                  </div>
                </ReassignAsset>
              </>
            ) : (
              <>
                <ReassignAsset deviceData={data}>
                  <div className="flex items-center relative py-1.5 gap-1  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                    <Icons.reassign_asset className="text-black size-5" />
                    <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                      Assign
                    </span>
                  </div>
                </ReassignAsset>
              </>
            )}

            <DeleteAsset id={params.id ?? ""}>
              <div className="flex items-center relative py-1.5 gap-1  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                <Icons.delete_asset className="text-black size-5" />
                <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                  Delete
                </span>
              </div>
            </DeleteAsset>

            <CreateIssue device={data}>
              <div className="flex items-center relative py-1.5 gap-1  pl-3 pr-3  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                <AlertTriangle className="text-[#6C6C6C] size-[18px] mb-0.5" />
                <span className="text-[15px]  pr-1 whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                  Add Issue
                </span>
              </div>
            </CreateIssue>
            {/* <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
              <ChevronLeft className="text-[#6C6C6C]" />
            </div>
            <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
              <ChevronRight className="text-[#6C6C6C]" />
            </div> */}
          </div>
        </div>
      </div>

      <DeviceGrid data={data} />
    </CombinedContainer>
  );
}
