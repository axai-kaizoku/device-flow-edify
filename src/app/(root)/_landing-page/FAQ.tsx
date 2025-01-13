import React, { useState } from "react";

export const FAQ = () => {
  // Manage the state of each FAQ item
  const [expanded, setExpanded] = useState(null);
  const [showAll, setShowAll] = useState(false); // Manages "View More" and "View Less"

  // Toggle the expanded state for a specific FAQ
  const toggleFAQ = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
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
        "DeviceFlow is built for startups, IT teams, and growing businesses that want to simplify managing laptops, desktops, accessories, and other office devices.",
    },
    {
      question: "What makes DeviceFlow different?",
      answer:
        "We offer a unified platform for asset management, user onboarding/offboarding, and inventory tracking—saving you time, reducing errors, and providing actionable insights. Plus, we’re designed with startups in mind!",
    },
    {
      question: "Is DeviceFlow compatible with my existing tools?",
      answer:
        "Yes! DeviceFlow integrates with popular tools like Slack, Jira, and Microsoft Teams to ensure seamless IT workflows across your organization.",
    },
    {
      question: "Can I try DeviceFlow before purchasing?",
      answer:
        "Absolutely! We’re currently offering beta access. Sign up today to get early access and provide feedback to shape the future of IT management.",
    },
    {
      question: "How secure is DeviceFlow?",
      answer:
        "Your data’s security is our top priority. DeviceFlow uses industry-standard encryption and follows best practices to ensure your information remains safe and private.",
    },
    {
      question: "How do I get started with DeviceFlow?",
      answer:
        "Sign up for our beta program using the form above. Once you’re in, our intuitive platform will guide you through the setup process in minutes.",
    },
    {
      question: "What types of assets can I manage with DeviceFlow?",
      answer:
        "You can manage laptops, desktops, monitors, keyboards, mice, headphones, and any other IT-related devices or office accessories.",
    },
    {
      question: "Is there a free version of DeviceFlow?",
      answer:
        "We currently offer beta access for free! Once we launch, we’ll provide flexible pricing plans tailored to businesses of all sizes.",
    },
    {
      question: "How do I contact support?",
      answer:
        "We’re here to help! Reach out to us anytime at support@deviceflow.ai, and our team will get back to you promptly.",
    },
  ];

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  

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
      {visibleFaqs.map((faq, index) => (
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
      {faqs.length > 5 && (
        <div
          className="pt-3 text-center text-sm font-gilroySemiBold leading-normal underline cursor-pointer"
          onClick={toggleShowAll}
        >
          {showAll ? "View Less" : "View More"}
        </div>
      )}
    </div>
  );
};
