import { Icons } from "@/components/icons";
import { StoreDevice } from "@/server/deviceActions";
import { BusFront, MonitorCheck } from "lucide-react";

export const PerfectForSecx = ({ data }: { data: StoreDevice }) => {
  const icons = [
    {
      key: "dev",
      icon: <Icons.both_arrows />,
    },
    {
      key: "finance",
      icon: <MonitorCheck />,
    },
    {
      key: "operations",
      icon: <BusFront />,
    },
  ];

  const modifiedPerfectFor = data.perfectFor!.map((item) => {
    // Find a matching icon based on the title
    const matchingIcon = icons.find((icon) =>
      item.title.toLowerCase().includes(icon.key.toLowerCase())
    );

    // Return the object with icon and title
    return {
      icon: matchingIcon ? matchingIcon.icon : <Icons.both_arrows />,
      title: item.title,
    };
  });

  console.log(modifiedPerfectFor);

  // const perfectFor = [
  //   {
  //     icon: <Icons.both_arrows />,
  //     title: "Development Team",
  //   },
  //   {
  //     icon: <Icons.both_arrows />,
  //     title: "Development Team",
  //   },
  //   {
  //     icon: <Icons.both_arrows />,
  //     title: "Development Team",
  //   },
  //   {
  //     icon: <Icons.both_arrows />,
  //     title: "Development Team",
  //   },
  // ];
  return (
    <section className="px-32 pt-16 pb-10">
      <h2 className="text-2xl 2xl:text-3xl font-gilroySemiBold">Perfect for</h2>
      <div className="flex py-4 items-center gap-5">
        {modifiedPerfectFor.map((v) => (
          <div
            key={v.title}
            className="w-64 bg-[#F4F4F4] h-20 rounded-lg flex justify-center items-center gap-4"
          >
            <div>{v?.icon ?? ""}</div>{" "}
            <span className="font-gilroySemiBold text-black">
              {v?.title ?? ""}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
