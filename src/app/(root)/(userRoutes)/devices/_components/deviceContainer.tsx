// "use client";

// import { useState } from "react";
// import Devices from "./devicesPage";
// import Issue from "./issuePage";
// import { getAllDevicesProp } from "@/server/deviceActions";
// import { getAllResponse } from "@/server/issueActions";
// import { Tab } from "@/app/(root)/teams/_components/Tab";

// // Define props interface
// interface DeviceContainerProps {
//   devices: getAllDevicesProp;
//   issues: getAllResponse;
// }

// const DeviceContainer = ({ devices, issues }: DeviceContainerProps) => {
//   const [activeTab, setActiveTab] = useState("devices");

//   // For Rendering Tabs
//   const renderContent = () => {
//     if (activeTab === "devices") {
//       return <Devices devices={devices} />;
//     } else if (activeTab === "issues") {
//       return <Issue issues={issues} />;
//     }
//   };

//   return (
//     <div className="flex flex-col w-full p-10">
//       <div className="flex flex-col flex-auto">
//         <div className="flex justify-between items-center w-full">
//           <div className="flex gap-10">
//             <Tab
//               active={activeTab === "devices"}
//               onClick={() => setActiveTab("devices")}
//               label="Your Devices"
//             />

//             <Tab
//               active={activeTab === "issues"}
//               onClick={() => setActiveTab("issues")}
//               label="Issues"
//             />
//           </div>
//         </div>

//         <div className="mt-6">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default DeviceContainer;

"use client";

import { useQueryState } from "nuqs";

import { Search, Download } from "lucide-react"; // Importing icons from lucide-react

import Spinner from "@/components/Spinner";
import Devices from "./devicesPage";
import Issue from "./issuePage";
import { getAllDevicesProp } from "@/server/deviceActions";
import { Icons } from "@/components/icons";

import { getAllResponse } from "@/server/issueActions";
import { Tab } from "@/app/(root)/teams/_components/Tab";

// Define props interface
interface DeviceContainerProps {
  devices: getAllDevicesProp;
  issues: getAllResponse;
}

function DeviceContainer({ devices, issues }: DeviceContainerProps) {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "devices",
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "devices":
        return <Devices devices={devices} />;
      case "issues":
        return <Issue issues={issues} />;

      default:
        return null;
    }
  };
  const tabs = [
    {
      key: "devices",
      label: "Assets",
      component: <Devices devices={devices} />,
    },
    {
      key: "issues",
      label: "Issues",
      component: <Issue issues={issues} />,
    },
  ];
  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-3xl font-gilroyBold py-2">
          Manage Assets & Issues
        </h1>
        <div className="flex items-center justify-between ">
          <div className="flex items-center w-full -mb-8 gap-12">
            {tabs?.map((tab) => (
              <Tab
                className="after:left-[-60%]  after:w-[220%]"
                key={tab?.key}
                active={activeTab === tab?.key}
                onClick={() => handleTabChange(tab?.key)}
                label={tab?.label}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Search size={20} className="text-[#7F7F7F]" />{" "}
              <input
                className="text-base bg-transparent font-gilroyMedium whitespace-nowrap focus:outline-none"
                placeholder="Search "
              />
            </div>

            <button className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300 group">
              <Icons.sort_icon />
              <span className="text-base font-gilroyMedium whitespace-nowrap">
                Sort By
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>

      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default DeviceContainer;
