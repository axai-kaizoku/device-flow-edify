"use client";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { addItemToCart } from "@/server/cartActions";
import { Device } from "@/server/deviceActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StoreDeviceMain({ data }: { data: Device }) {
  const router = useRouter();

  return (
    <>
      {/* <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 w-full flex justify-center items-center">
          <Image
            src={data.image ?? "/media/mac.jpeg"}
            alt={data.device_name}
            width={400}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          <h2 className="text-3xl font-gilroySemiBold text-gray-800 dark:text-gray-200">
            {data.device_name}
          </h2>

          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li>
              <strong>Brand:</strong> {data.brand}
            </li>
            <li>
              <strong>Serial Number:</strong> {data.serial_no}
            </li>
            <li>
              <strong>Device Type:</strong> {data.device_type}
            </li>
            <li>
              <strong>Operating System:</strong> {data.os}
            </li>
            <li>
              <strong>Warranty Status:</strong>{" "}
              <span
                className={
                  data.warranty_status
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {data.warranty_status ? "Active" : "Expired"}
              </span>
            </li>
          </ul>

          <div className="mt-4">
            <span className="text-gray-500 line-through text-lg mr-2">
              ₹{data.purchase_value}
            </span>
            <span className="text-xl font-gilroySemiBold text-blue-600 dark:text-blue-400">
              ₹{data.payable}
            </span>
          </div>

          <div className="mt-6">
            <button
              onClick={async () => {
                await addItemToCart(data._id, 1);
                router.refresh();
              }}
              className="flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <ShoppingCart className="mr-2 w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div> */}

      {/* <div className="mt-12">
        <p className="text-gray-500 dark:text-gray-400">
          Device added on: {new Date(data.createdAt!).toLocaleDateString()}
        </p>
      </div> */}

      <div className="flex flex-col bg-[#fff] font-gilroyRegular">
        <DeviceSecx data={data} />
        <PerfectForSecx />
        <DeviceDetailedSecx />
        <DeviceReviewsSecx />
      </div>
    </>
  );
}

const DeviceSecx = ({ data }: { data: Device }) => {
  const router = useRouter();

  const images = [
    "/media/store-item/dell1.png",
    "/media/store-item/dell2.png",
    "/media/store-item/dell3.png",
    "/media/store-item/dell4.png",
    "/media/store-item/dell5.png",
  ];
  const rating = 4.5;
  const reviews = 556;
  const colors = ["#000000", "#BBBBBB"];
  const storages = ["128GB", "256GB", "512GB", "1TB"];
  const features = [
    {
      icon: <Icons.screen_size />,
      key: "Screen size",
      value: `6.7"`,
    },
    {
      icon: <Icons.processor />,
      key: "Processor ",
      value: "Apple A16",
    },
    {
      icon: <Icons.processor_generation />,
      key: "Generation",
      value: "6",
    },
    {
      icon: <Icons.camera_main />,
      key: "Ram",
      value: "12GB",
    },
    {
      icon: <Icons.camera_front />,
      key: "Touch (if any)",
      value: "No",
    },
    {
      icon: <Icons.battery_capacity />,
      key: "Storage",
      value: "512",
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIdx((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <section className="flex flex-col px-8 mt-1 gap-y-6 text-[#17183B]">
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
              <span>{String(images.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="flex justify-center items-center py-4">
            <img
              className="object-contain select-none flex-shrink-0 w-[404px] h-[278px]"
              src={images[currentIdx]}
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
            {images.map((src, i) => (
              <div
                key={src}
                className={cn(
                  "md:size-16 lg:size-[4.5rem] px-[0.4rem] flex justify-center items-center xl:size-20 rounded ring-2 ",
                  currentIdx === i ? "ring-black" : "ring-[#D1D1D8]"
                )}
                onClick={() => setCurrentIdx(i)}
              >
                <img
                  src={src}
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
                <RatingStarComp rating={rating} className="size-4" />
              </div>
              <div className="font-gilroyMedium ">
                {rating} / 5.0{" "}
                <span className="text-[#A2A3B1]">({reviews})</span>
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
            {features.map((v) => (
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
            <button className="w-[47%] h-12 rounded-sm flex justify-center items-center border border-black">
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

const RatingStarComp = ({
  rating,
  className,
}: {
  rating: number | string;
  className?: string;
}) => {
  const numericRating =
    typeof rating === "string" ? parseFloat(rating) : rating;
  // Calculate the number of filled, half-filled, and unfilled stars
  const filledStars = Math.floor(numericRating); // Count of fully filled stars
  const isHalfFilled = numericRating % 1 >= 0.25 && numericRating % 1 <= 0.75; // Determine if there is a half-filled star
  const unfilledStars = 5 - filledStars - (isHalfFilled ? 1 : 0); // Remaining unfilled stars

  return (
    <div className="flex flex-row items-center gap-0">
      {/* Render filled stars */}
      {Array.from({ length: filledStars }).map((_, i) => (
        <Icons.star_filled className={className} key={`filled-${i}`} />
      ))}
      {/* Render half-filled star if applicable */}
      {isHalfFilled && <Icons.star_half_filled className={className} />}
      {/* Render unfilled stars */}
      {Array.from({ length: unfilledStars }).map((_, i) => (
        <Icons.star_unfilled key={`unfilled-${i}`} className={className} />
      ))}
    </div>
  );
};

const PerfectForSecx = () => {
  const perfectFor = [
    {
      icon: <Icons.both_arrows />,
      title: "Development Team",
    },
    {
      icon: <Icons.both_arrows />,
      title: "Development Team",
    },
    {
      icon: <Icons.both_arrows />,
      title: "Development Team",
    },
    {
      icon: <Icons.both_arrows />,
      title: "Development Team",
    },
  ];
  return (
    <section className="px-32 pt-16 pb-10">
      <h2 className="text-2xl 2xl:text-3xl font-gilroySemiBold">Perfect for</h2>
      <div className="flex py-4 items-center gap-5">
        {perfectFor.map((v) => (
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

const DeviceDetailedSecx = () => {
  const deviceDetails = `Just as a book is judged by its cover, the first thing you notice when
        you pick up a modern smartphone is the display. Nothing surprising,
        because advanced technologies allow you to practically level the display
        frames and cutouts for the front camera and speaker, leaving no room for
        bold design solutions. And how good that in such realities Apple
        everything is fine with displays. Both critics and mass consumers always
        praise the quality of the picture provided by the products of the
        Californian brand. And last year's 6.7-inch Retina panels, which had
        ProMotion, caused real admiration for many.`;

  const deviceFeatures = [
    {
      title: "Screen",
      features: [
        { key: "Screen diagonal", value: '6.7"' },
        { key: "The screen resolution", value: "2796x1290" },
        { key: "The screen refresh rate", value: "120 Hz" },
        { key: "The pixel density", value: "460 ppi" },
        { key: "Screen type", value: "OLED" },
        { key: "Additionally", value: "HDR display" },
      ],
    },
    {
      title: "CPU",
      features: [
        { key: "CPU", value: "A16 Bionic" },
        { key: "Number of cores", value: "6" },
      ],
    },
  ];

  return (
    <section className="flex px-32 flex-col py-3">
      <h2 className="text-2xl 2xl:text-3xl font-gilroySemiBold py-3">
        Details
      </h2>
      <p className="text-pretty py-3.5 font-gilroySemiBold text-[#9D9D9D] text-sm 2xl:text-base">
        {deviceDetails}
      </p>
      {deviceFeatures.map((feat) => (
        <div key={feat.title}>
          <h3 className="text-xl 2xl:text-2xl font-gilroySemiBold pt-4 pb-3">
            {feat.title}
          </h3>
          {feat.features.map((v) => (
            <div key={v.key} className="pt-1 pb-3">
              <div className="flex items-center justify-between">
                <span>{v.key}</span>
                <span>{v.value}</span>
              </div>
              <div className="h-px my-2.5 w-full bg-[#CDCDCD]" />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

const DeviceReviewsSecx = () => {
  const overallReviews = 556;
  const overallRating = "4.6";

  const allReviews = [
    {
      userName: `Alex K.`,
      date: "Jan 20, 2024",
      userRole: "Senior Analyst",
      reviewDescription: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.`,
      rating: "4.5",
      image: "AK",
    },
    {
      userName: `Alex K.`,
      date: "Jan 20, 2024",
      userRole: "Senior Analyst",
      reviewDescription: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat.`,
      rating: "4.5",
      image: "AK",
    },
  ];

  const ratingDetails = [
    {
      stars: 5,
      percentage: 60,
      reviewsCount: 448,
    },
    {
      stars: 4,
      percentage: 50,
      reviewsCount: 35,
    },
    {
      stars: 3,
      percentage: 38,
      reviewsCount: 19,
    },
    {
      stars: 2,
      percentage: 0,
      reviewsCount: 0,
    },
    {
      stars: 1,
      percentage: 0,
      reviewsCount: 0,
    },
  ];

  return (
    <section className="px-[8.5rem] flex flex-col py-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-x-4">
          <span className="text-xl 2xl:text-2xl font-gilroyMedium">
            Sort by newest review
          </span>
          <Icons.arrow_down />
        </div>
        <button className="rounded-md bg-black font-gilroyMedium text-xl 2xl:text-2xl text-white flex justify-center items-center w-72 h-14">
          Write a Review
        </button>
      </div>

      <div className="px-5 py-3">
        <h3 className="text-[#0D0C22] font-gilroyMedium text-xl 2xl:text-2xl pb-2">
          Reviews
        </h3>
        <div className="flex justify-between">
          <div className="w-[28%] flex flex-col gap-y-3">
            <h2 className="font-gilroyBold text-7xl 2xl:text-[5rem]">
              {overallRating}
            </h2>
            <RatingStarComp rating={overallRating} className="size-8" />
            <span className="text-[#858585] font-gilroyMedium text-lg ">{`(${overallReviews} Reviews)`}</span>
          </div>

          <div className="w-[68%] flex flex-col gap-y-2.5">
            {ratingDetails.map((v) => (
              <div
                key={v.stars}
                className="flex gap-1.5 justify-between items-center"
              >
                <div className="whitespace-nowrap font-gilroyMedium w-[7%]">{`${v.stars} stars`}</div>
                <div className="rounded-2xl h-[6px] relative bg-[#F2F6FB]  w-[83%]">
                  <div
                    style={{ width: `${v.percentage}%` }}
                    className=" rounded-2xl absolute h-full bg-[#E7B66B] "
                  />
                </div>
                <span className="font-gilroyMedium w-[8%]">
                  {v.reviewsCount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5 py-5">
          {allReviews.map((v) => (
            <div key={v.userName} className="flex flex-col gap-y-4 py-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-x-2">
                  <RatingStarComp rating={v.rating} className="size-5" />
                  <div className="text-[#858585] text-lg">{`${v.rating}/5`}</div>
                </div>
                {v.date}
              </div>
              <div className="flex items-center gap-x-2">
                <div className="size-14 rounded-full bg-opacity-20 bg-[#5465FF] text-[#5465FF] font-gilroySemiBold text-lg flex justify-center items-center">
                  {v.image}
                </div>
                <span className="font-gilroyMedium text-xl">{v.userName}</span>
              </div>
              <span className="text-[#858585] text-xl font-gilroyMedium">
                {v.userRole}
              </span>
              <p className="text-[#0D0C22] text-xl text-pretty font-gilroyRegular">
                {v.reviewDescription}
              </p>
              <div className="h-[4px] w-full bg-[#F8F7F4] rounded-3xl my-3" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <button className="w-40 h-12 border border-black flex items-center justify-center gap-1.5 rounded-md ">
            <span className="text-black font-gilroySemiBold text-sm">
              View More
            </span>
            <Icons.arrow_down />
          </button>
        </div>
      </div>
    </section>
  );
};
