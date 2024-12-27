import { CombinedContainer } from "@/components/container/container";
import DeviceContainer from "./_components/deviceContainer";
import { getAllDevicesProp, getDevicesByUserId } from "@/server/deviceActions";
import { getAllResponse, getIssueByUserId } from "@/server/issueActions";

export default async function Devices() {
  try {
    const devicesData: getAllDevicesProp = await getDevicesByUserId();
    const issueData: getAllResponse = await getIssueByUserId();
    return (
      <div className="flex flex-col w-full pr-14 overflow-y-auto mb-10">
        <DeviceContainer devices={devicesData} issues={issueData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <CombinedContainer title="Devices">
        <div className="text-red-500">
          Failed to load data. Please try again later. <br />{" "}
          <a href="/" className="underline text-blue-500">
            Back to home
          </a>
        </div>
      </CombinedContainer>
    );
  }
}
