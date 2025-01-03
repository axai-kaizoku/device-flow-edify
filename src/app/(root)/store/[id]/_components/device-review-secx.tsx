import { Icons } from "@/components/icons";
import { StoreDevice } from "@/server/deviceActions";
import { RatingStarComp } from "./rating-stars";

export const DeviceReviewsSecx = ({ data }: { data: StoreDevice }) => {
  const { overallReviews, overallRating } = data;

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
            <RatingStarComp rating={overallRating ?? ""} className="size-8" />
            <span className="text-[#858585] font-gilroyMedium text-lg ">{`(${overallReviews} Reviews)`}</span>
          </div>

          <div className="w-[68%] flex flex-col-reverse gap-y-2.5">
            {data.ratingDetails!.map((v) => (
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
          {data?.reviews?.map((v) => (
            <div key={v?._id} className="flex flex-col gap-y-4 py-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-x-2">
                  <RatingStarComp
                    rating={v?.rating ?? "-"}
                    className="size-5"
                  />
                  <div className="text-[#858585] text-lg">{`${
                    v?.rating ?? 0
                  }/5`}</div>
                </div>
                {new Date(v.createdAt ?? "").toLocaleDateString()}
              </div>
              <div className="flex items-center gap-x-2">
                {v?.image ? (
                  <>
                    <img
                      src={v?.image}
                      alt="user"
                      className="size-11 rounded-full border"
                    />
                  </>
                ) : (
                  <>
                    <div className="size-14 rounded-full bg-opacity-20 bg-[#5465FF] text-[#5465FF] font-gilroySemiBold text-lg flex justify-center items-center">
                      {v?.name.split("")[0].toUpperCase() ?? ""}
                    </div>
                  </>
                )}

                <span className="font-gilroyMedium text-xl">
                  {v?.name ?? ""}
                </span>
              </div>
              <span className="text-[#858585] text-xl font-gilroyMedium">
                {v?.role ?? ""}
              </span>
              <p className="text-[#0D0C22] text-xl text-pretty font-gilroyRegular">
                {v?.comment ?? ""}
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
