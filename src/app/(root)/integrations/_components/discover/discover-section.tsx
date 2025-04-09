import { AllIntegrationAvailable } from "@/server/integrationActions";
import { useEffect, useState } from "react";
import { CategoriesFilter } from "./categories-filter";
import { DiscoverSectionSkeleton } from "./discover-skelton";
import { IntegrationCompaniesSecx } from "./integration-companies-secx";
import { StoreBannerCardBig } from "./store-banner-card-big";

interface DiscoverSectionProps {
  data: AllIntegrationAvailable[] | undefined;
  status?: "error" | "success" | "pending";
}

export const DiscoverSection = ({ data, status }: DiscoverSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    title: string;
    companies: AllIntegrationAvailable[];
  }>({
    title: "All Integrations",
    companies: [],
  });

  // Update the selectedCategory when data becomes available.
  useEffect(() => {
    if (data && data?.length) {
      setSelectedCategory({
        title: "All Integrations",
        companies: data,
      });
    }
  }, [data]);

  // Show a loading indicator until data is available.
  if (status === "pending") {
    return (
      <div>
        <DiscoverSectionSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* <TotalSpends /> */}
      {/* <MappingDialogueOne>hi</MappingDialogueOne> */}
      <section className="flex justify-between">
        <CategoriesFilter data={data} onSelect={setSelectedCategory} />

        <div className="flex flex-col gap-6 py-4 pl-8 ml-5">
          <IntegrationCompaniesSecx
            categoryName={selectedCategory?.title}
            categoryCompanies={selectedCategory?.companies}
          />
          {selectedCategory?.title === "All Integrations" ? (
            <>
              <div className="flex justify-between items-center w-full h-[30vh]">
                <div className="h-full w-full">
                  <StoreBannerCardBig />
                </div>
                {/* <RequestIntegrationCard /> */}
              </div>

              <IntegrationCompaniesSecx
                categoryName="Newly Added"
                categoryCompanies={data?.filter((item) => item?.isNewlyAdded)}
              />

              <IntegrationCompaniesSecx
                categoryName="Popular"
                categoryCompanies={data?.filter((item) => item?.isPopular)}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
};
