"use client";
import { Integration } from "./Integration";
import { Testimonials } from "./Testimonials";
import { CTA } from "./CTA";
import { Footer } from "./Footer";
import { useEffect, useRef, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { Section3 } from "./Section3";
import { Section2 } from "./Section2";
import { FAQ } from "./FAQ";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DemoForm from "./_components/DemoForm";

export const LandingPage = () => {
  const cardsRef: any = useRef([]); // Reference to all the 3 cards
  const router = useRouter();
  const boxRef: any = useRef(null); // Reference to the box container
  const elementRef = useRef(null);
  const ctaRef = useRef<HTMLDivElement>(null); // Reference to the CTA section
  const featRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);
  const signupref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const boxPosition = boxRef.current.getBoundingClientRect().top;
      if (boxPosition < 300) {
        cardsRef.current.forEach((card: any, index: number) => {
          if (index === 0) {
            const xOffset = 203; // X-offset for each card
            const yOffset = 625; //
            card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
          }
          if (index === 1) {
            const xOffset = 235; // X-offset for each card
            const yOffset = 588; //
            card.style.width = "320px";
            card.style.height = "139px";
            card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
          }
          if (index === 2) {
            const xOffset = -402; // X-offset for each card
            const yOffset = 750; //
            card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
          }
          if (index === 3) {
            const xOffset = -153; // X-offset for each card
            const yOffset = 625; //
            card.style.width = "200px";
            card.style.height = "115px";
            card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCTA = () => {
    if (ctaRef.current) {
      ctaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFeatures = () => {
    if (featRef.current) {
      featRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToNew = () => {
    if (newRef.current) {
      newRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSignUp = () => {
    if (signupref.current) {
      signupref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-0 max-lg:w-full">
      <div className="px-8 max-lg:hidden">
        <div
          className={
            " fade-in-top flex w-full items-center rounded-xl bg-neutral-800 py-[15px] pl-10 pr-2.5 mt-5"
          }
        >
          <div className=" flex flex-grow flex-wrap items-center justify-center gap-x-2.5 gap-y-[9px] min-[1355px]:flex-nowrap">
            <div className="font-gilroy flex h-[18px] w-[1285px] flex-shrink-0 items-center justify-center text-center text-lg font-gilroySemiBold leading-[18px] tracking-[0px] text-white">
              <p>
                {
                  "Welcome to the club!! Join the BETA program to get all the new updates  "
                }
                <span
                  className="text-center text-[15px] leading-[18px] underline cursor-pointer"
                  onClick={scrollToCTA}
                >
                  Click here
                </span>
              </p>
            </div>
            {/* <IconOutlineCancel className="h-5 w-5 flex-shrink-0" /> */}
          </div>
        </div>
      </div>

      <div
        className={
          " font-gilroy flex w-full flex-col items-center gap-y-8 bg-white tracking-[0px] px-8 max-lg:hidden"
        }
      >
        <div className="fade-in-top flex flex-wrap items-center justify-center gap-x-7 gap-y-5 self-stretch bg-white py-6 pl-12 pr-12 min-[1430px]:flex-nowrap">
          <div className="font-inter flex flex-grow flex-wrap items-center justify-between gap-x-10 gap-y-[11px] text-sm leading-normal min-[1430px]:flex-nowrap">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <div className="flex h-full w-full flex-shrink-0 items-center justify-center gap-x-[6.5px] overflow-clip px-3 pb-2.5 pt-[11px]">
                  <img
                    src="/media/landingPage/Deviceflow-logo.png"
                    width={184}
                    height={41}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-10">
              <div className="cursor-pointer" onClick={scrollToFeatures}>
                About
              </div>
              <div onClick={scrollToAbout} className="cursor-pointer">
                Features
              </div>
              {/* <div>Pricing</div>
              <div>Blog</div> */}
            </div>
            <Link href={"/login"}>
              <div className="pl-3 font-gilroyMedium underline">Log in</div>
            </Link>
          </div>
          <div
            onClick={scrollToCTA}
            className={
              "flex w-[162px] cursor-pointer items-center justify-center rounded-xl border border-solid border-gray-600 bg-neutral-800 hover:bg-black px-[15px] py-[11px]"
            }
          >
            <div className="font-gilroy text-center font-gilroySemiBold leading-6 tracking-[-0.2px] text-white cursor-pointer">
              <span>
                {"Register for "}
                Beta
              </span>
            </div>
          </div>
        </div>
        <div className="fade-in  flex items-end justify-center self-stretch pt-6">
          <div
            className="font-inter flex flex-wrap items-center justify-center gap-x-1 gap-y-1 rounded-[100px] bg-zinc-100 py-0.5 pl-0.5 pr-2 text-sm leading-5 tracking-[-0.1px] min-[1430px]:flex-nowrap cursor-pointer"
            onClick={() => router.push("#how-to-deviceflow")}
          >
            <div className="rounded-[100px] bg-neutral-800 px-2 py-0.5 text-center text-white">
              New
            </div>
            <div className="text-zinc-700">
              How DeviceFlow help your business ?
            </div>
            {/* <IconOutlineArrowRight className="h-[13px] w-3.5 flex-shrink-0" /> */}
          </div>
        </div>
        <div className="fade-in fltopex w-[826px] items-center justify-center text-center text-[60px] font-bold leading-[88px] tracking-[-3.6px] text-neutral-800">
          <p>Streamline IT Asset Management with DeviceFlow</p>
        </div>
        <div className="fade-in flex w-[548px] items-center justify-center text-center text-[22px] font-gilroyMedium leading-8 tracking-[-0.3px] text-[darkgray]">
          <p>
            Simplify your office's IT workflows with seamless asset, user, and
            inventory management.
          </p>
        </div>
        <div className="fade-in flex items-center justify-center self-stretch">
          <div className="flex items-center justify-end pl-9">
            <div className="flex items-center justify-center gap-x-3 text-center font-gilroySemiBold leading-6 tracking-[-0.2px]">
              <div
                onClick={scrollToCTA}
                className={
                  "flex w-[162px] cursor-pointer  items-center justify-center rounded-xl border border-solid border-gray-600 bg-neutral-800 hover:bg-black px-[15px] py-[11px]"
                }
              >
                <div className="font-gilroy text-center font-gilroySemiBold leading-6 tracking-[-0.2px] text-white cursor-pointer">
                  <span>
                    {"Register for "}
                    Beta
                  </span>
                </div>
              </div>
              <div className="flex items-center w-[148px] hover:bg-gray-50 justify-center rounded-xl border border-solid border-gray-100 bg-white px-[15px] py-[11px] cursor-pointer">
                <div
                  className="text-center text-zinc-700"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Request Demo
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            ref={(el: any) => (cardsRef.current[0] = el)}
            className="fade-in-left"
            src={"/media/landingPage/hero-issue.png"}
            width={199}
            height={292}
            style={{
              position: "absolute",
              top: 425,
              left: 108,
              transform: "rotate(-9.781deg)",
              transition: "transform 1s ease, top 1s ease, left 1s ease",
            }}
          />
          <img
            ref={(el: any) => (cardsRef.current[1] = el)}
            className="fade-in-left"
            src={"/media/landingPage/hero-asset.png"}
            width={199}
            height={292}
            style={{
              position: "absolute",
              top: 311,
              left: 70,
              transform: "rotate(-9.781deg)",
              transition: "transform 1s ease, top 1s ease, left 1s ease",
            }}
          />
          <img
            ref={(el: any) => (cardsRef.current[2] = el)}
            className="fade-in-right"
            src={"/media/landingPage/hero-order.png"}
            width={199}
            height={292}
            style={{
              position: "absolute",
              top: 300,
              right: 78,
              transform: "rotate(6.615deg)",
              transition: "transform 1s ease, top 1s ease, left 1s ease",
            }}
          />
          <img
            ref={(el: any) => (cardsRef.current[3] = el)}
            className="fade-in-right"
            src={"/media/landingPage/hero-banner.png"}
            width={199}
            height={292}
            style={{
              position: "absolute",
              top: 600,
              right: 100,
              transform: "rotate(6.615deg)",
              transition: "transform 1s ease, top 1s ease, left 0.5s ease",
            }}
          />
        </div>
        <div ref={boxRef}>
          <img src={"/media/landingPage/hero.svg"} />
        </div>
      </div>

      <div className="w-full hidden max-lg:block">
        <div className="relative flex items-center py-4 ">
          <Icons.burger_icon
            className="absolute left-4 cursor-pointer"
            onClick={toggleModal}
          />
          <div className="flex justify-center w-full mx-auto">
            <img
              src="/media/landingPage/Deviceflow-logo.png"
              width={170}
              height={41}
            />
          </div>
        </div>

        {/* Modal */}
        {isModalVisible && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={toggleModal}
            ></div>
            {/* Modal Content */}
            <div className="absolute left-4 top-[60px] z-20 bg-white shadow-lg rounded-[12px] p-3 w-[50%]">
              <ul className="text-sm text-gray-800 w-full text-center">
                <li
                  className="py-2 cursor-pointer text-[#191D23] font-gilroySemiBold text-base"
                  onClick={() => {
                    setIsModalVisible(false);
                    scrollToFeatures();
                  }}
                >
                  About
                </li>
                <li
                  className="py-2 cursor-pointer text-[#191D23] font-gilroySemiBold text-base"
                  onClick={() => {
                    setIsModalVisible(false);
                    scrollToAbout();
                  }}
                >
                  Features
                </li>

                <div className="h-[1px] bg-[#D6D6D6] mt-2"></div>
                <li
                  className="py-3 cursor-pointer text-[#191D23] font-gilroySemiBold text-base underline"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Log in
                </li>

                <div
                  onClick={() => {
                    setIsModalVisible(false);
                    scrollToCTA();
                  }}
                  className={
                    "flex cursor-pointer items-center justify-center rounded-xl border text-center border-solid border-gray-600 bg-neutral-800 hover:bg-black px-[15px] py-[8px]"
                  }
                >
                  <div className="font-gilroy text-center font-gilroySemiBold leading-6 tracking-[-0.2px] text-white cursor-pointer">
                    <span>
                      {"Register for "}
                      Beta
                    </span>
                  </div>
                </div>
              </ul>
            </div>
          </>
        )}

        <div className="w-[80%] mx-auto text-center mt-11">
          <div className="font-gilroyBold text-[#1D1F20] text-[35px] leading-[1.2]">
            Streamline IT Asset
            <br /> Management with
            <br />
            DeviceFlow
          </div>

          <div className="flex justify-center items-center mt-2">
            <div className="text-[#757575] font-gilroyMedium text-sm text-center w-[90%]">
              Simplify your office's IT workflows with seamless asset, user, and
              inventory management.
            </div>
          </div>

          <div className="flex justify-center items-center mt-4">
            <div
              onClick={scrollToCTA}
              className={
                "flex cursor-pointer items-center justify-center rounded-xl border text-center border-solid border-gray-600 bg-neutral-800 hover:bg-black px-[15px] py-[11px]"
              }
            >
              <div className="font-gilroy text-center font-gilroySemiBold leading-6 tracking-[-0.2px] text-white cursor-pointer">
                <span>
                  {"Register for "}
                  Beta
                </span>
              </div>
            </div>
          </div>

          <img
            src={"/media/landingPage/Hero-mobile.svg"}
            width="120%"
            className="py-7 "
          />
        </div>
      </div>
      <div ref={featRef}>
        <Section2 ref={newRef} />
      </div>
      <div ref={aboutRef}>
        <Section3 ref={aboutRef} />
      </div>

      <Integration />
      <Testimonials />
      <div ref={ctaRef}>
        <CTA ref={signupref} />
      </div>
      <FAQ />
      <Footer
        scrollToAbout={scrollToAbout}
        scrollToCTA={scrollToCTA}
        scrollToFeatures={scrollToFeatures}
        scrollToSignUp={scrollToSignUp}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="rounded-2xl bg-white p-5 shadow-lg text-center">
          <DemoForm setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
