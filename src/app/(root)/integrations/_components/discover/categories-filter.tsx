import { cn } from "@/lib/utils";
import { AllIntegrationAvailable } from "@/server/integrationActions";
import { useEffect, useState } from "react";

interface CategoriesFilterProps {
  data: AllIntegrationAvailable[];
  onSelect: (category: {
    title: string;
    companies: AllIntegrationAvailable[];
  }) => void;
}

export function CategoriesFilter({ data, onSelect }: CategoriesFilterProps) {
  const integrationsCategory = [
    {
      iconUrl: "/media/discover-filters/all-categories-gray.svg",
      selectedIconUrl: "/media/discover-filters/all-categories.svg",
      title: "All Integrations",
      value: data,
    },
    {
      iconUrl: "/media/discover-filters/all-categories-gray.svg",
      selectedIconUrl: "/media/discover-filters/all-categories.svg",
      title: "Trending",
      value: data?.filter((item) => item?.isTrending),
    },
    {
      iconUrl: "/media/discover-filters/all-categories-gray.svg",
      selectedIconUrl: "/media/discover-filters/all-categories.svg",
      title: "Cloud",
      value: data?.filter((item) => item?.isCloud), // Ensure property is correct
    },
    {
      iconUrl: "/media/discover-filters/all-categories-gray.svg",
      selectedIconUrl: "/media/discover-filters/all-categories.svg",
      title: "CRM",
      value: data?.filter((item) => item?.isCrm),
    },
    {
      iconUrl: "/media/discover-filters/all-categories-gray.svg",
      selectedIconUrl: "/media/discover-filters/all-categories.svg",
      title: "Sales",
      value: data?.filter((item) => item?.isSales),
    },
    {
      iconUrl: "/media/discover-filters/all-categories-gray.svg",
      selectedIconUrl: "/media/discover-filters/all-categories.svg",
      title: "Design",
      value: data?.filter((item) => item?.isDesign),
    },
    {
      iconUrl: "/media/discover-filters/all-categories-gray.svg",
      selectedIconUrl: "/media/discover-filters/all-categories.svg",
      title: "Technology",
      value: data?.filter((item) => item?.isTechnology),
    },
  ];

  const [active, setActive] = useState<string>("");

  // Update default selection when data changes.
  useEffect(() => {
    if (data && data.length) {
      const defaultCategory = integrationsCategory[0];
      setActive(defaultCategory.title);
      onSelect({
        title: defaultCategory?.title,
        companies: defaultCategory?.value,
      });
    }
  }, [data]); // Re-run effect when data changes

  return (
    <section className="rounded-2xl p-4 max-w-[20%] w-full h-fit bg-[#f8f8f8] flex flex-col items-start gap-3">
      <h1 className="relative font-gilroySemiBold p-1.5 ml-3">Categories</h1>
      <div className="w-full flex flex-col items-center gap-3">
        {integrationsCategory?.map((category, index) => (
          <div
            key={index}
            className={cn(
              "w-full flex justify-start hover:bg-[#f0f0f0] gap-3 cursor-pointer p-2 px-4 rounded-xl",
              active === category.title
                ? "bg-black text-white hover:bg-black"
                : "text-[#7f7f7f]"
            )}
            onClick={() => {
              setActive(category?.title);
              onSelect({ title: category?.title, companies: category?.value });
            }}
          >
            <img
              src={
                active === category.title
                  ? category.selectedIconUrl
                  : category.iconUrl
              }
              alt={category.title || "category"}
              loading="lazy"
              width={20}
              height={20}
            />
            <p className="font-gilroyMedium">{category?.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
