// "use client";

// import { OrdersProps } from "../orders/components/orderPage";
// import { Device } from "@/server/deviceActions";
// import { useQueryState } from "nuqs";
// import UserMain from "./_components/user-main";
// import { User, UserResponse } from "@/server/userActions";
// import DeletedUser from "./_components/deleted-user";
// import { Tab } from "../assets/_components/Tab";

// interface TabDisplayProps {
//   users: User[];
//   currentPage: number;
//   totalPages: number;
//   totalDocuments: number;
//   currentDocumentCount: number;
//   pageSize: number;
//   userRole: number;
//   deletedUserResponse: UserResponse;
// }

// function TabDisplay({
//   users,
//   currentPage,
//   totalPages,
//   totalDocuments,
//   currentDocumentCount,
//   pageSize,
//   userRole,
//   deletedUserResponse,
// }: TabDisplayProps) {
//   const [activeTab, setActiveTab] = useQueryState("tab", {
//     defaultValue: "active",
//   });

//   const renderContent = () => {
//     switch (activeTab) {
//       case "active":
//         return <UserMain data={users} userRole={userRole} />;
//       case "deleted":
//         return <DeletedUser data={deletedUserResponse?.users} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center w-full gap-6">
//         <Tab
//           active={activeTab === "active"}
//           onClick={() => setActiveTab("active")}
//           iconType="OutlinedAdmissions"
//           label="Active Users"
//         />

//         <Tab
//           active={activeTab === "deleted"}
//           onClick={() => setActiveTab("deleted")}
//           iconType="OutlinedAdmissions"
//           label="Deleted Users"
//         />
//       </div>

//       <div className="mt-4">{renderContent()}</div>
//     </>
//   );
// }

// export default TabDisplay;

"use client";

import { useQueryState } from "nuqs";

import { Search, Download } from "lucide-react"; // Importing icons from lucide-react

import Spinner from "@/components/Spinner";

import { Icons } from "@/components/icons";
import UserMain from "./_components/user-main";
import { User, UserResponse } from "@/server/userActions";
import DeletedUser from "./_components/deleted-user";
import { Suspense } from "react";
import { Tab } from "../teams/_components/Tab";

interface TabDisplayProps {
  users: User[];
  userRole: number;
  deletedUserResponse: UserResponse;
}

function TabDisplay() {
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "people",
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "people":
        return <Suspense fallback={<Spinner/>}><UserMain /></Suspense>;
      case "deleted_people":
        return <Suspense fallback={<Spinner/>}><DeletedUser /></Suspense>;

      default:
        return null;
    }
  };
  const tabs = [
    {
      key: "people",
      label: "Active People",
      component: <UserMain />,
    },
    {
      key: "deleted_people",
      label: "Inactive People",
      component: <DeletedUser />,
    },
  ];
  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-[#7F7F7F] font-gilroySemiBold text-lg">People</h1>
        <h1 className="text-3xl font-gilroyBold py-2">Manage People</h1>
        <div className="flex items-center justify-between ">
          <div className="flex items-center w-full -mb-8 gap-12">
            {tabs?.map((tab) => (
              <Tab
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

            <button className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Icons.tab_filter />
              <span className="text-base font-gilroyMedium">Filters</span>
            </button>
            <button className="flex items-center gap-1 p-2 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Download size={20} className="text-[#7F7F7F]" />{" "}
              <span className="text-sm font-gilroyMedium">Download</span>
            </button>
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>

      <div className="mt-4">{renderContent()}</div>
    </>
  );
}

export default TabDisplay;
