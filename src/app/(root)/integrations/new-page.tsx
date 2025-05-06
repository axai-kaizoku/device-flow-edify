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

import GlobalError from "@/app/global-error";

export const NewPageIntegrations = () => {
  const [activeTab, setActiveTab] = useQueryState("activeTab", {
    defaultValue: "discover",
  });
  const searchParams = useSearchParams();

  const { data, status, error, refetch } = useQuery({
    queryKey: ["all-integrations", activeTab],
    queryFn: async () => {
      if (activeTab === "discover") {
        return allIntegrationsAvailable();
      } else {
        return (await allIntegrationsAvailable()).filter((i) => i.isConnected);
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // 2) If a 503 comes back, show maintenance page
  const statusCode = (error as any)?.response?.status;
  if (status === "error" && statusCode === 503) {
    return <GlobalError />;
  }

  // 4) Normal data render
  return (
    <section className="w-full h-fit relative overflow-y-auto hide-scrollbar">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="discover">
          {!(searchParams.get("platform")?.length > 1) && <TotalSpends />}
          <DiscoverSection data={data} status={status} />
        </TabsContent>
        <TabsContent value="installed">
          {!(searchParams.get("platform")?.length > 1) && <TotalSpends />}
          <InstalledSection data={data.filter((i) => i.isConnected)} />
        </TabsContent>
      </Tabs>
    </section>
  );
};
