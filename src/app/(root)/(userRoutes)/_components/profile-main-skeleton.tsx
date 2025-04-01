import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-6 mt-2 font-gilroyRegular">
      {/* Column 1 */}
      <div className="flex flex-col gap-6">
        {/* Card 1 */}
        <div className="w-96 max-[1370px]:w-[350px] max-[1270px]:w-[340px] h-40 flex items-center bg-gray-200 animate-pulse rounded-[25px] px-6 py-4">
          <div className="flex justify-start gap-4 items-start w-full">
            <div className="w-[90px] h-[90px] bg-gray-300 rounded-full flex-shrink-0"></div>
            <div className="flex flex-col w-full">
              <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded mt-2"></div>
              <div className="flex gap-2 mt-4">
                <div className="w-20 h-6 bg-gray-300 rounded"></div>
                <div className="w-20 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="w-96 max-[1370px]:w-[350px] max-[1270px]:w-[340px] bg-gray-200 animate-pulse rounded-[25px] px-6 py-4">
          <div className="flex flex-col gap-5">
            <div className="w-1/3 h-5 bg-gray-300 rounded"></div>
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-2xl"></div>
                <div className="flex flex-col w-full">
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-5 bg-gray-300 rounded mt-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-6">
        {/* Card 1 */}
        <div className="w-96 max-[1370px]:w-[350px] max-[1270px]:w-[340px] bg-gray-200 animate-pulse rounded-[25px] px-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="w-1/3 h-5 bg-gray-300 rounded"></div>
            <div className="flex items-start gap-4">
              <div className="w-[78px] h-[78px] bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="flex flex-col w-full">
                <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mt-2"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="w-96 max-[1370px]:w-[350px] max-[1270px]:w-[340px] bg-gray-200 animate-pulse rounded-[25px] px-6 py-4">
          <div className="flex flex-col gap-5">
            <div className="w-1/3 h-5 bg-gray-300 rounded"></div>
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-2xl"></div>
                <div className="flex flex-col w-full">
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-5 bg-gray-300 rounded mt-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-6">
        {/* Card 1 */}
        <div className="w-96 max-[1370px]:w-[350px] max-[1270px]:w-[340px] bg-gray-200 animate-pulse rounded-[25px] p-6">
          <div className="w-full h-32 bg-gray-300 rounded"></div>
        </div>
        {/* Card 2 */}
        <div className="w-96 max-[1370px]:w-[350px] max-[1270px]:w-[340px] bg-gray-200 animate-pulse rounded-[25px] p-6"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
