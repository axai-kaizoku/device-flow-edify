"use client";
import { useQuery } from "@tanstack/react-query";
import { DiscoverSection } from "../_components/discover/discover-section";
import { allIntegrationsAvailable } from "@/server/integrationActions";
import { TotalSpends } from "../_components/total-spends";

export default function DiscoverPage() {
  const { data, status } = useQuery({
    queryKey: ["all-integrations", "discover"],
    queryFn: async () => {
      return allIntegrationsAvailable();
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return (
    <section className="w-full h-fit relative p-5 rounded-2xl border overflow-y-auto hide-scrollbar">
      <TotalSpends />
      <DiscoverSection data={data} status={status} />
    </section>
  );
}
