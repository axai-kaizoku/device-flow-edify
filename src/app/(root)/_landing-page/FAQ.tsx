import React, { useState } from "react";

export const FAQ = () => {
  // Manage the state of each FAQ item
  const [expanded, setExpanded] = useState(null);

  // Toggle the expanded state for a specific FAQ
  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqs = [
    {
      question: "What is DeviceFlow?",
      answer:
        "DeviceFlow is a comprehensive IT asset management tool designed to help startups and businesses manage devices, onboard/offboard users, and keep track of inventory effortlessly.",
    },
    {
      question: "Who is DeviceFlow for?",
      answer:
        "DeviceFlow is designed for startups, businesses, and IT teams looking for efficient asset management solutions.",
    },
    {
      question: "What makes DeviceFlow different?",
      answer:
        "DeviceFlow offers unique features like easy integration with existing tools, user-friendly interfaces, and advanced tracking capabilities.",
    },
    {
      question: "Is DeviceFlow compatible with my existing tools?",
      answer: "Yes, DeviceFlow integrates seamlessly with most existing IT tools.",
    },
    {
      question: "Can I try DeviceFlow before purchasing?",
      answer:
        "Yes, we offer a trial version of DeviceFlow so you can experience its benefits before committing.",
    },
  ];

  return (
    <div
      className="font-gilroy flex w-full flex-col items-center gap-y-5 bg-white px-96 pb-[104px] pt-24 tracking-[0px]"
    >
      <div className="text-center text-4xl font-bold leading-[44px] tracking-[-0.32px] text-gray-950">
        Got Questions? We Have Answers
      </div>
      <div className="self-stretch text-center text-xl font-gilroyMedium leading-[30px] text-gray-500">
        Everything you need to know about DeviceFlow
      </div>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`flex flex-col w-full ${
            index !== 0 ? "border-t border-gray-300" : ""
          } pt-6`}
        >
          <div
            className="flex items-start justify-between cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="text-lg font-gilroySemiBold leading-7 text-gray-950">
              {faq.question}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              className="transition-transform duration-300"
              style={{
                transform: expanded === index ? "rotate(45deg)" : "rotate(0)",
              }}
            >
              <path
                d="M8 12.7998H12M16 12.7998H12M12 12.7998V8.7998M12 12.7998V16.7998"
                stroke="#030712"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22.7998C17.5228 22.7998 22 18.3227 22 12.7998C22 7.27696 17.5228 2.7998 12 2.7998C6.47715 2.7998 2 7.27696 2 12.7998C2 18.3227 6.47715 22.7998 12 22.7998Z"
                stroke="#030712"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="font-gilroyMedium leading-6 text-gray-500 pt-4">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
      {faqs.length > 5 && 
        <div className="pt-3 text-center text-sm font-gilroySemiBold leading-normal underline cursor-pointer">
          View more
        </div>
      }
    </div>
  );
};
