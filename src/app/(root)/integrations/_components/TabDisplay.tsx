"use client";

import { useAlert } from "@/hooks/useAlert";
import {
  fetchActiveTeams,
  fetchInactiveTeams,
  TeamsResponse,
} from "@/server/teamActions";
import { Search } from "lucide-react"; // Importing icons from lucide-react
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Tab } from "../../teams/_components/Tab";

function TabDisplay({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("discover");

  useEffect(() => {
    const tab = searchParams.get("activeTab") || "discover";
    setActiveTab(tab);
  }, []);

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("activeTab", value);

      return params.toString();
    },
    [searchParams]
  );

  const [teams, setTeams] = useState<TeamsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  const { showAlert } = useAlert();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Split the current pathname into segments.
    const segments = pathname.split("/").filter(Boolean);
    // If there are more than one segment, assume the first segment is the base route.
    const basePath = segments.length > 1 ? `/${segments[0]}` : pathname;
    // Create a new URL with the activeTab query parameter.
    router.push(basePath + "?" + createQueryString(tab));
  };

  const handleSearchAndFilter = async () => {
    // Combine search term and filters
    const query = {
      searchQuery: searchTerm || "",
    };

    try {
      setLoading(true);
      let res: TeamsResponse;
      // if (activeTab === "inactive_teams") {
      //   res = await fetchInactiveTeams(query);
      // } else {
      //   res = await fetchActiveTeams(query);
      // }
      // setTeams(res);
      return;
    } catch (error) {
      console.error("Error fetching teams:", error);
      showAlert({
        title: "Something went wrong !!",
        description: "Failed to fetch data. Please try again.",
        isFailure: true,
        key: "fetch-error-team",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm]);

  useEffect(() => {
    const fetchTabData = async () => {
      try {
        setLoading(true);
        let response;
        switch (activeTab) {
          case "active_teams":
            response = await fetchActiveTeams();
            break;
          case "inactive_teams":
            response = await fetchInactiveTeams();
            break;

          default:
            response = [];
        }
        setTeams(response); // Update state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tab data:", error);
        showAlert({
          title: "Something went wrong !!",
          description: "Failed to fetch data. Please try again.",
          isFailure: true,
          key: "fetch-error-device-tab",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTabData();
  }, [activeTab]);

  const refreshData = async () => {
    try {
      setLoading(true);
      const query = {
        searchQuery: searchTerm || "",
      };
      let res: TeamsResponse | null = null;

      if (activeTab === "active_teams") {
        res = await fetchActiveTeams(query);
      } else if (activeTab === "inactive_teams") {
        res = await fetchInactiveTeams(query);
      }

      // Update the state with fresh data
      setTeams(res);
    } catch (error) {
      console.error("Error refreshing data:", error);
      showAlert({
        title: "Something went wrong !!",
        description: "Failed to refresh data. Please try again.",
        isFailure: true,
        key: "refresh-error-team",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col pt-[14px] w-full">
        <h1 className="text-gray-400 font-gilroyMedium 2xl:text-lg text-base">
          Integrations{" "}
        </h1>
        <h2 className="2xl:text-3xl text-2xl font-gilroyBold pt-[10px]">
          Manage Subscriptions{" "}
        </h2>
        <div className="flex items-center justify-between -mt-2">
          <div className="flex items-center w-full -mb-9 -mt-1 gap-12">
            <Tab
              active={activeTab === "discover"}
              onClick={() => {
                handleTabChange("discover");
                router.push("/integrations");
              }}
              label="Discover"
            />

            <Tab
              className="after:left-[-20%]  after:w-[140%]"
              active={activeTab === "installed"}
              onClick={() => {
                handleTabChange("installed");
                router.push(`/integrations?activeTab=installed`);
              }}
              label="Installed"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex  items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
              <Search size={20} className="text-[#7F7F7F]" />{" "}
              <input
                className="bg-transparent text-base  font-gilroyMedium whitespace-nowrap focus:outline-none"
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
              />
            </div>
            {/* <ConnectIntegration>
              <div className="flex group items-center py-1.5 gap-1  pl-3 pr-3 text-[#7F7F7F] hover:bg-black hover:text-white border border-gray-400 rounded-full  hover:border-black transition-all duration-300">
                <Plus className="text-[#7F7F7F] group-hover:text-white size-5" />
                <span className="text-nowrap font-gilroySemiBold text-sm">
                  New Integration
                </span>
              </div>
            </ConnectIntegration> */}
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>

      <div className="mt-6 p-6 bg-white overflow-y-auto rounded-3xl w-full">
        {children}{" "}
      </div>
    </>
  );
}

export default TabDisplay;
