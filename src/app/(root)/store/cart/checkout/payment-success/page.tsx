"use client";
import Error from "@/app/error/page";
import NotFound from "@/app/not-found";
import { RootState } from "@/app/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [showTick, setShowTick] = useState(false);
  const [showTextAndButtons, setShowTextAndButtons] = useState(false);
  const [showCrackers, setShowCrackers] = useState(false);
  const [fadeOutCrackers, setFadeOutCrackers] = useState(false);
  const router = useRouter();
  const paymentData = useSelector((state: RootState) => state?.payment);

  // if (!paymentData.paymentId) {
  //   router.push('/error');
  // }

  useEffect(() => {
    // Show the tick after 2 seconds
    const tickTimer = setTimeout(() => {
      setShowLoader(false);
      setShowTick(true);
      setShowCrackers(true);
    }, 1000);

    // Fade out the crackers and show the text/buttons after 2 more seconds
    const crackersTimer = setTimeout(() => {
      setFadeOutCrackers(true); // Trigger fade-out animation
    }, 3000);

    // Show the text and buttons after 3 seconds
    const textAndButtonsTimer = setTimeout(() => {
      setShowTextAndButtons(true);
      setShowCrackers(false); // Start the fall animation
    }, 4000);

    return () => {
      clearTimeout(tickTimer);
      clearTimeout(crackersTimer);
      clearTimeout(textAndButtonsTimer);
    };
  }, []);

  return (
    <>
      {paymentData.paymentId ? (
        <div className="flex flex-col items-center justify-center h-[80vh] bg-white">
          {/* Animation Container */}
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* Loader */}
            {showLoader && (
              <div className="w-24 h-24 border-8 border-t-transparent border-[#14AD23] rounded-full animate-spin"></div>
            )}
            {/* Green Circle with Tick */}
            {showTick && (
              <div className="absolute w-40 h-40 bg-[#14AD23] rounded-full flex items-center justify-center transform scale-90 animate-scale-up">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="white"
                  className="w-32 h-32 animate-tick-fall"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            {showCrackers && (
              <div
                className={`absolute flex items-center justify-center w-full h-full ${
                  fadeOutCrackers
                    ? "animate-fall-fade-out"
                    : "animate-scale-up-center"
                }`}
              >
                <svg
                  width="335"
                  height="198"
                  viewBox="0 0 335 198"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="52.3826"
                    cy="68.7465"
                    rx="6.71461"
                    ry="6.53894"
                    fill="#FF4B4B"
                  />
                  <ellipse
                    cx="31.114"
                    cy="174.63"
                    rx="6.71461"
                    ry="6.53894"
                    fill="#FF4B4B"
                  />
                  <ellipse
                    cx="301.436"
                    cy="75.2855"
                    rx="6.71461"
                    ry="6.53894"
                    fill="#FF4B4B"
                  />
                  <ellipse
                    cx="269.093"
                    cy="27.121"
                    rx="6.71466"
                    ry="6.53899"
                    fill="#F04BFF"
                  />
                  <ellipse
                    cx="246.992"
                    cy="193.652"
                    rx="3.91986"
                    ry="3.81731"
                    fill="#F04BFF"
                  />
                  <ellipse
                    cx="273.013"
                    cy="124.648"
                    rx="3.91986"
                    ry="3.81731"
                    fill="#1EB600"
                  />
                  <ellipse
                    cx="41.748"
                    cy="124.648"
                    rx="3.91986"
                    ry="3.81731"
                    fill="#FF00D4"
                  />
                  <ellipse
                    cx="4.32318"
                    cy="78.0073"
                    rx="3.91986"
                    ry="3.81731"
                    fill="#FF00D4"
                  />
                  <ellipse
                    cx="80.4394"
                    cy="186.017"
                    rx="3.91986"
                    ry="3.81731"
                    fill="#FFBB00"
                  />
                  <ellipse
                    cx="327.656"
                    cy="128.465"
                    rx="7.26807"
                    ry="7.07792"
                    fill="#FFBB00"
                  />
                  <ellipse
                    cx="108.75"
                    cy="22.2083"
                    rx="6.96924"
                    ry="6.78691"
                    fill="#00A6FF"
                  />
                  <ellipse
                    cx="301.435"
                    cy="168.091"
                    rx="3.91986"
                    ry="3.81731"
                    fill="#00A6FF"
                  />
                  <ellipse
                    cx="324.308"
                    cy="28.9953"
                    rx="3.91986"
                    ry="3.81731"
                    fill="#00A6FF"
                  />
                  <ellipse
                    cx="45.6679"
                    cy="18.3908"
                    rx="3.91986"
                    ry="3.81731"
                    fill="#FFBB00"
                  />
                  <ellipse
                    cx="209.745"
                    cy="7.1635"
                    rx="3.91986"
                    ry="3.81731"
                    fill="#00A6FF"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Success Text and Buttons */}
          <div className="flex flex-col items-center mt-8 gap-4">
            {showTick && (
              <div className="text-4xl font-gilroyBold text-black">
                Wohoo!! Order Placed
              </div>
            )}
            {showTextAndButtons ? (
              <div className="flex flex-col gap-3 animate-fade-in">
                {/* <Link href="/store"> */}
                <span
                  className="text-base font-gilroySemiBold bg-black text-white hover:text-black hover:bg-white hover:ring-1 hover:ring-black  px-9 py-4 rounded cursor-pointer"
                  onMouseEnter={() => {
                    router.prefetch("/store");
                  }}
                  onClick={() => {
                    router.push("/store");
                  }}
                >
                  Continue Shopping
                </span>
                {/* </Link> */}
                <button className="text-lg font-gilroyMedium text-center cursor-pointer">
                  View Order
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3"></div>
            )}
          </div>
        </div>
      ) : (
        <Error />
      )}
    </>
  );
};

export default PaymentSuccess;

// 'use client'
// import React, { useEffect, useState } from "react";

// const PaymentSuccess = () => {
//   const [showTick, setShowTick] = useState(false);
//   const [showText, setShowText] = useState(false);

//   useEffect(() => {
//     // Showing tick after 3 seconds
//     const tickTimer = setTimeout(() => setShowTick(true), 2000);

//     // Showing text after 4 seconds
//     const textTimer = setTimeout(() => setShowText(true), 3000);

//     return () => {
//       clearTimeout(tickTimer);
//       clearTimeout(textTimer);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-full bg-white">
//       {/* Animation Container */}
//       <div className="flex items-center justify-center w-32 h-32 relative">
//         {/* Loader */}
//         {!showTick && (
//           <div className="w-24 h-24 border-8 border-t-transparent border-[#14AD23] rounded-full animate-spin"></div>
//         )}
//         {/* Tick */}
//         {showTick && (
//           <div className="absolute w-40 h-40 bg-[#14AD23] rounded-full flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={4}
//               stroke="white"
//               className="w-32 h-32"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>
//         )}
//       </div>
//       {/* Success Text */}
//       {showText && (
//         <>
//           <div className="mt-8 mb-[18.92px] text-4xl font-gilroyBold text-black animate-fade-in">
//             Wohoo!! Order Placed
//           </div>

//           <div className="flex flex-col gap-3 animate-fade-in">
//             <div className="text-base font-gilroySemiBold bg-black text-white px-9 py-[16px] rounded-[4px] cursor-pointer">Continue Shopping</div>
//             <div className="text-[18px] font-gilroyMedium] text-center cursor-pointer">View</div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PaymentSuccess;
