import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { StoreDevice } from "@/server/deviceActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RatingStarComp } from "./rating-stars";

export const DeviceSecx = ({ data }: { data: StoreDevice }) => {
  const router = useRouter();

  // const [images, setImages] = useState(data.image ?? []);

  // const rating = 4.5;
  // const reviews = 556;
  const colors = ["#000000", "#BBBBBB"];
  const storages = ["128GB", "256GB", "512GB", "1TB"];

  const icons = [
    {
      key: "screen",
      icon: <Icons.screen_size />,
    },
    {
      key: "processor",
      icon: <Icons.processor />,
    },
    {
      key: "generation",
      icon: <Icons.processor_generation />,
    },
    {
      key: "ram",
      icon: <Icons.camera_main />,
    },
    {
      key: "touch",
      icon: <Icons.camera_front />,
    },
    {
      key: "storage",
      icon: <Icons.battery_capacity />,
    },
  ];

  const config = [
    {
      key: "Screen size",
      value: `6.7"`,
    },
    {
      key: "Processor ",
      value: "Apple A16",
    },
    {
      key: "Generation",
      value: "6",
    },
    {
      key: "Ram",
      value: "12GB",
    },
    {
      key: "Touch (if any)",
      value: "No",
    },
    {
      key: "Storage",
      value: "512",
    },
  ];

  // const modifiedConfig = []
  const modifiedConfig = config.map((item) => {
    // Find a matching icon based on the key
    const matchingIcon = icons.find((icon) =>
      item.key.toLowerCase().includes(icon.key.toLowerCase())
    );

    // Return the object with icon, key, and value
    return {
      icon: matchingIcon ? matchingIcon.icon : <Icons.screen_size />,
      key: item.key,
      value: item.value,
    };
  });

  console.log(modifiedConfig);

  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.image!.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIdx((prevIndex) =>
      prevIndex < data.image!.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <section className="flex flex-col px-8 mt-1 gap-y-6 text-[#17183B]">
      {/* {JSON.stringify(data)} */}
      <div className="flex flex-col md:flex-row justify-between ">
        <div className="w-[48%] flex flex-col">
          <div className="flex gap-x-4 pb-5 text-base 2xl:text-lg">
            <Icons.back_btn
              className="cursor-pointer"
              onClick={() => router.back()}
            />
            <span className="text-[#A2A3B1] cursor-pointer font-gilroyMedium">
              Windows
            </span>
            <span className="font-gilroySemiBold">/</span>
            <span className="font-gilroyMedium">{data?.device_name ?? ""}</span>
          </div>

          <div className="flex gap-2 items-end">
            <span className="font-gilroyBold text-3xl 2xl:text-4xl">
              {String(currentIdx + 1).padStart(2, "0")}
            </span>
            <div className="flex gap-1 text-[#A2A3B1] text-xl 2xl:text-3xl font-gilroySemiBold">
              <span>/</span>
              <span>{String(data?.image?.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="flex justify-center items-center py-4">
            <img
              className="object-contain select-none flex-shrink-0 w-[404px] h-[278px]"
              src={data?.image![currentIdx].url ?? ""}
              alt={data?.device_name ?? "device"}
            />
          </div>

          <div className="flex gap-x-12 py-5 items-center">
            <Icons.arrow_left onClick={handlePrev} className="cursor-pointer" />
            <Icons.arrow_right
              onClick={handleNext}
              className="cursor-pointer"
            />
          </div>

          <div className="flex justify-between px-3 pt-2 pb-5 items-center">
            {(Array.isArray(data.image)
              ? data.image
              : [{ url: data.image }]
            ).map(({ url: src }, i) => (
              <div
                key={src}
                className={cn(
                  "md:size-16 lg:size-[4.5rem] px-[0.4rem] flex justify-center items-center xl:size-20 rounded ring-2 ",
                  currentIdx === i ? "ring-black" : "ring-[#D1D1D8]"
                )}
                onClick={() => setCurrentIdx(i)}
              >
                <img
                  src={src ?? ""}
                  alt={data?.device_name ?? `device-${i + 1}`}
                  className="w-[80px] select-none h-[54px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-[48%] flex flex-col">
          <h2 className="pt-3.5 2xl:pt-1.5 pb-2 text-3xl font-gilroyBold lg:text-[2.3rem] 2xl:text-[2.8rem]">
            {data?.device_name ?? ""}
          </h2>

          <div className="flex items-center py-2 justify-between">
            <div className="font-gilroyBold text-3xl 2xl:text-4xl">
              {`$${data?.payable ?? ""}`}{" "}
              <span className="text-base font-gilroyMedium 2xl:text-lg line-through">{`$${data.purchase_value}`}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="-mt-0.5">
                <RatingStarComp
                  rating={data?.overallRating ?? ""}
                  className="size-4"
                />
              </div>
              <div className="font-gilroyMedium ">
                {data?.overallRating ?? ""} / 5.0{" "}
                <span className="text-[#A2A3B1]">
                  ({data?.overallReviews ?? ""})
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-x-3 py-2">
            <div>Select color:</div>
            <div className="flex items-center gap-x-1.5">
              {colors.map((v) => (
                <div
                  key={v}
                  style={{ backgroundColor: v }}
                  className={cn(
                    "size-4 rounded-full ring ring-[#17183B]",
                    v === "#000000" ? "ring-opacity-15" : "ring-opacity-0"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-x-3 py-3.5 items-center">
            {storages.map((v) => (
              <div
                key={v}
                className={cn(
                  "rounded font-gilroySemiBold text-sm 2xl:text-lg w-28 h-12 flex justify-center items-center border",
                  v === "1TB"
                    ? " border-black text-black"
                    : "border-[#D5D5D5] text-[#6F6F6F]",
                  v === "128GB" ? "text-[#D5D5D5]" : ""
                )}
              >
                {v}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 grid-rows-2 gap-4 py-3">
            {modifiedConfig.map((v) => (
              <div
                key={v.key}
                className="w-44 h-[4.5rem] 2xl:w-48 2xl:h-20 bg-[#F4F4F4] rounded flex-1 flex justify-center items-center"
              >
                <div className="flex gap-2 items-center">
                  <div>{v.icon}</div>
                  <div className="flex flex-col text-sm 2xl:text-base">
                    <span className="text-[#A7A7A7]">{v.key}</span>
                    <span className="text-[#4E4E4E] font-gilroySemiBold">
                      {v.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex py-2 justify-between items-center font-gilroySemiBold">
            <button
              // onClick={() => addItemToCart(data?._id ?? "", 1, "")}
              className="w-[47%] h-12 rounded-sm flex justify-center items-center border border-black"
            >
              Add to Cart
            </button>
            <button className="w-[47%] h-12 bg-black text-white rounded-sm flex justify-center items-center">
              BUY NOW
            </button>
          </div>

          <div className="flex py-2 gap-0.5 items-start">
            <div>
              <Icons.share_telegram />
            </div>
            <div className="font-gilroySemiBold text-base 2xl:text-lg">
              Recommend to employee
            </div>
          </div>

          <div className="font-gilroyMedium text-sm">
            Free 3-5 day shipping • All Product Warranty • Best after sale
            service
          </div>
        </div>
      </div>
    </section>
  );
};
