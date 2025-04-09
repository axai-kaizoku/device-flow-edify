"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allIntegrationsAvailable } from "@/server/integrationActions";
import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { DiscoverSection } from "./_components/discover/discover-section";
import { InstalledSection } from "./_components/installed/installed-section";
import { TotalSpends } from "./_components/total-spends";

export const NewPageIntegrations = () => {
  const [activeTab, setActiveTab] = useQueryState("activeTab", {
    defaultValue: "discover",
  });
  const searchParams = useSearchParams();

  // const [searchTerm, setSearchTerm] = useQueryState("searchQuery");
  // const actualSearchTerm = useDeferredValue(searchTerm);
  // useState(generalOperators);

  const { data, status, error, refetch } = useQuery({
    queryKey: ["all-integrations", activeTab],
    queryFn: async () => {
      if (activeTab === "discover") {
        return allIntegrationsAvailable();
      } else {
        return (await allIntegrationsAvailable()).filter(
          (item) => item?.isConnected
        );
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="w-full h-fit relative  overflow-y-auto hide-scrollbar">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* <div className="flex gap-4 sticky top-0 z-50 items-center justify-between p-3 rounded-[10px] border border-[#0000001A] bg-white">
          <div className="flex gap-2">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-fit font-gilroyMedium flex bg-white border border-[#DEDEDE] rounded-lg">
                <SelectValue placeholder="People" />
              </SelectTrigger>
              <SelectContent className="font-gilroyMedium">
                <SelectItem
                  value="discover"
                  className="w-full py-2.5 rounded-lg"
                >
                  Discover
                </SelectItem>
                <SelectItem
                  value="installed"
                  className="w-full py-2.5 rounded-lg"
                >
                  Installed
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="relative h-full"></div>
          </div>
        </div> */}
        <TabsContent value="discover">
          {searchParams.get("platform") ?? "".length > 1 ? null : (
            <TotalSpends />
          )}
          <DiscoverSection data={data} status={status} />
        </TabsContent>
        <TabsContent value="installed">
          {/* <TotalSpends /> */}
          {searchParams.get("platform") ?? "".length > 1 ? null : (
            <TotalSpends />
          )}

          <InstalledSection data={data?.filter((item) => item?.isConnected)} />
        </TabsContent>
      </Tabs>
    </section>
  );
};
