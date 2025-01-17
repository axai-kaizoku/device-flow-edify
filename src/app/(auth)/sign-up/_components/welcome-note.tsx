import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Welcome() {
  const router = useRouter();
  return (
    <div className="w-full h-screen justify-evenly items-center flex flex-col lg:flex-row p-8">
      <div className="w-[46%]  h-[auto]">
        <img
          src="/media/Onboarding/CompanyDetails.png"
          alt="edify-background"
          width={"100%"}
        />
      </div>
      <div className="w-[42%]  h-full justify-center items-center flex flex-col">
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <svg
            width="85"
            height="86"
            viewBox="0 0 85 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="6.10547"
              y="6.98438"
              width="72.1094"
              height="72.1094"
              rx="36.0547"
              fill="#D1FADF"
            />
            <rect
              x="6.10547"
              y="6.98438"
              width="72.1094"
              height="72.1094"
              rx="36.0547"
              stroke="#ECFDF3"
              stroke-width="12.0182"
            />
            <path
              d="M57.1823 41.6566V43.0387C57.1804 46.2783 56.1315 49.4304 54.1918 52.0251C52.2521 54.6197 49.5256 56.5179 46.419 57.4364C43.3124 58.3549 39.9921 58.2446 36.9533 57.1219C33.9145 55.9993 31.32 53.9244 29.5568 51.2067C27.7936 48.489 26.9561 45.2742 27.1693 42.0417C27.3824 38.8091 28.6348 35.7321 30.7396 33.2695C32.8444 30.8069 35.6889 29.0906 38.8488 28.3767C42.0087 27.6628 45.3147 27.9894 48.2738 29.3079M57.1823 31.0205L42.1595 46.0583L37.6527 41.5515"
              stroke="#039855"
              stroke-width="3.00456"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div className="text-center text-3xl font-gilroyBold text-indigo-950">
            Welcome to DeviceFlow
          </div>
          <div className="text-center text-base -mt-3 font-gilroyMedium  text-[#52525B]">
            Your have been successfully registered in DeviceFlow
          </div>
        </div>

        <button
          onClick={() => router.push("/login")}
          className="flex items-center mt-5 justify-center h-[56px] w-[75%] rounded-[9.3px] bg-black px-44 py-[13px]"
        >
          <div className=" text-white justify-center font-gilroySemiBold items-center flex gap-3">
            Login <MoveRight className="size-5" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Welcome;
