// import { cn } from "@/lib/utils";
// import { AllIntegrationAvailable } from "@/server/integrationActions";
// import { CloudIcon, ComputerProgramming01Icon, PaintBoardIcon, Task01Icon, WaterfallUp01Icon } from "@hugeicons/core-free-icons";
// import { HugeiconsIcon } from "@hugeicons/react";
// import { useEffect, useState } from "react";

// interface CategoriesFilterProps {
//   data: AllIntegrationAvailable[];
//   onSelect: (category: {
//     title: string;
//     companies: AllIntegrationAvailable[];
//   }) => void;
// }

// export function CategoriesFilter({ data, onSelect }: CategoriesFilterProps) {
//   const integrationsCategory = [
//     {
//       iconUrl: "/media/discover-filters/all-categories-gray.svg",
//       selectedIconUrl: "/media/discover-filters/all-categories.svg",
//       title: "All Integrations",
//       value: data,
//     },
//     {
//       iconUrl: <HugeiconsIcon
//       icon={WaterfallUp01Icon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       selectedIconUrl: <HugeiconsIcon
//       icon={WaterfallUp01Icon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       title: "Trending",
//       value: data?.filter((item) => item?.isTrending),
//     },
//     {
//       iconUrl: <HugeiconsIcon
//       icon={UserCircle02Icon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       selectedIconUrl: <HugeiconsIcon
//       icon={UserCircle02Icon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       title: "CRM",
//       value: data?.filter((item) => item?.isCrm),
//     },
//     {
//       iconUrl: <HugeiconsIcon
//       icon={Task01Icon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       selectedIconUrl: <HugeiconsIcon
//       icon={Task01Icon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       title: "Sales",

//       value: data?.filter((item) => item?.isSales), // Ensure property is correct
//     },

//     {
//       iconUrl: <HugeiconsIcon
//       icon={CloudIcon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       selectedIconUrl: <HugeiconsIcon
//       icon={CloudIcon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//     title: "Cloud",

//       value: data?.filter((item) => item?.isCloud),
//     },
//     {
//       iconUrl: <HugeiconsIcon
//       icon={PaintBoardIcon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       selectedIconUrl: <HugeiconsIcon
//       icon={PaintBoardIcon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       title: "Design",
//       value: data?.filter((item) => item?.isDesign),
//     },
//     {
//       iconUrl: <HugeiconsIcon
//       icon={ComputerProgramming01Icon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       selectedIconUrl: <HugeiconsIcon
//       icon={ComputerProgramming01Icon}
//       className={active ? "text-white" : "text-neutral-400"}
//     />,
//       title: "Technology",
//       value: data?.filter((item) => item?.isTechnology),
//     },
//   ];

//   const [active, setActive] = useState<string>("");

//   // Update default selection when data changes.
//   useEffect(() => {
//     if (data && data.length) {
//       const defaultCategory = integrationsCategory[0];
//       setActive(defaultCategory.title);
//       onSelect({
//         title: defaultCategory?.title,
//         companies: defaultCategory?.value,
//       });
//     }
//   }, [data]); // Re-run effect when data changes

//   return (
//     <section className="rounded-md p-4 max-w-[20%] w-full h-fit bg-[#f8f8f8] flex flex-col items-start gap-3">
//       <h1 className="relative font-gilroySemiBold p-1.5 ml-3">Categories</h1>
//       <div className="w-full flex flex-col items-center gap-3">

//         {integrationsCategory?.map((category, index) => (
//           <div
//             key={index}
//             className={cn(
//               "w-full flex justify-start items-center hover:bg-[#f0f0f0] gap-3 cursor-pointer p-2 px-4 rounded-md",
//               active === category.title
//                 ? "bg-black text-white hover:bg-black"
//                 : "text-[#7f7f7f]"
//             )}
//             onClick={() => {
//               setActive(category?.title);
//               onSelect({ title: category?.title, companies: category?.value });
//             }}
//           >
//             <img
//               src={
//                 active === category.title
//                   ? category.selectedIconUrl
//                   : category.iconUrl
//               }
//               alt={category.title || "category"}
//               loading="lazy"
//               width={20}
//               height={20}
//             />
//             <p className="font-gilroyMedium text-xs text-nowrap">
//               {category?.title}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { cn } from "@/lib/utils";
import { AllIntegrationAvailable } from "@/server/integrationActions";
import {
  CloudIcon,
  ComputerProgramming01Icon,
  PaintBoardIcon,
  Task01Icon,
  WaterfallUp01Icon,
  UserCircle02Icon,
  MenuSquareIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState, ReactNode } from "react";

interface CategoriesFilterProps {
  data: AllIntegrationAvailable[];
  onSelect: (category: {
    title: string;
    companies: AllIntegrationAvailable[];
  }) => void;
}

interface IntegrationCategory {
  icon?: ReactNode;
  iconUrl?: string; // Only for first one (image-based)
  selectedIconUrl?: string;
  title: string;
  value: AllIntegrationAvailable[];
}

export function CategoriesFilter({ data, onSelect }: CategoriesFilterProps) {
  const [active, setActive] = useState<string>("");

  const integrationsCategory: IntegrationCategory[] = [
    {
      // iconUrl: "/media/discover-filters/all-categories-gray.svg",
      // selectedIconUrl: "/media/discover-filters/all-categories.svg",
      icon: <HugeiconsIcon icon={MenuSquareIcon} />,
      title: "All Integrations",
      value: data,
    },
    {
      icon: <HugeiconsIcon icon={WaterfallUp01Icon} />,
      title: "Trending",
      value: data?.filter((item) => item?.isTrending),
    },
    {
      icon: <HugeiconsIcon icon={UserCircle02Icon} />,
      title: "CRM",
      value: data?.filter((item) => item?.isCrm),
    },
    {
      icon: <HugeiconsIcon icon={Task01Icon} />,
      title: "Sales",
      value: data?.filter((item) => item?.isSales),
    },
    {
      icon: <HugeiconsIcon icon={CloudIcon} />,
      title: "Cloud",
      value: data?.filter((item) => item?.isCloud),
    },
    {
      icon: <HugeiconsIcon icon={PaintBoardIcon} />,
      title: "Design",
      value: data?.filter((item) => item?.isDesign),
    },
    {
      icon: <HugeiconsIcon icon={ComputerProgramming01Icon} />,
      title: "Technology",
      value: data?.filter((item) => item?.isTechnology),
    },
  ];

  useEffect(() => {
    if (data && data.length) {
      const defaultCategory = integrationsCategory[0];
      setActive(defaultCategory.title);
      onSelect({
        title: defaultCategory.title,
        companies: defaultCategory.value,
      });
    }
  }, [data]);

  return (
    <section className="rounded-md p-4 max-w-[20%] w-full h-fit bg-[#f8f8f8] flex flex-col items-start gap-3">
      <h1 className="relative font-gilroySemiBold p-1.5 ml-3">Categories</h1>
      <div className="w-full flex flex-col items-center gap-3">
        {integrationsCategory.map((category, index) => {
          const isActive = active === category.title;

          return (
            <div
              key={index}
              className={cn(
                "w-full flex justify-start items-center hover:bg-[#f0f0f0] gap-3.5 cursor-pointer pt-1.5 pb-2.5 px-4 rounded-md",
                isActive
                  ? "bg-black text-white hover:bg-black"
                  : "text-[#7f7f7f]"
              )}
              onClick={() => {
                setActive(category.title);
                onSelect({ title: category.title, companies: category.value });
              }}
            >
              {category.iconUrl && category.selectedIconUrl ? (
                <img
                  src={isActive ? category.selectedIconUrl : category.iconUrl}
                  alt={category.title}
                  loading="lazy"
                  width={20}
                  height={20}
                />
              ) : (
                <span
                  className={cn(
                    "size-5 -ml-1",
                    isActive ? "text-white" : "text-neutral-400"
                  )}
                >
                  {category.icon}
                </span>
              )}

              <p className="font-gilroyMedium text-sm text-nowrap mt-1">
                {category.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
