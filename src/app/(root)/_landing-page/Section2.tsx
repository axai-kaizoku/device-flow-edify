import { Slide } from "react-awesome-reveal"

export const Section2 = () => {
    return(
        <div className=" pl-36 pr-36 ">
        <Slide direction="down" fraction={1} triggerOnce>
          <div className=" flex flex-col w-full items-start justify-center gap-4 relative mt-16 pl-36 pr-36 ">
            <p className="relative self-stretch font-bold text-base-600 text-[52px] text-center tracking-[-1.20px] leading-[Truepx]">
              Everything You Need to <br />
              Manage Your IT Infrastructure
            </p>
          </div>
        </Slide>
        <Slide direction="left" className="pt-16 " fraction={0.5} triggerOnce>
          <img
            src={"/media/landingPage/content.png"}
            height={504}
            width={"100%"}
          />
        </Slide>
        <div className="flex gap-4 mt-4 pb-11">
          <img src={"/media/landingPage/content-2.png"} width={"49%"} />
          <img src={"/media/landingPage/content-3.png"} width={"49%"} />
        </div>
        <Slide direction="down" fraction={1} triggerOnce>
          <div className=" flex flex-col w-full items-start justify-center gap-4 relative mt-16 pl-36 pr-36 ">
            <p className="relative self-stretch font-bold text-base-600 text-[52px] text-center tracking-[-1.20px] leading-[Truepx]">
              Three Steps to Hassle-Free <br />
              IT Management
            </p>
          </div>
        </Slide>
        <div className="flex gap-12 mt-16 pb-11 items-center">
          <Slide direction="left" fraction={1} triggerOnce>
            <img src={"/media/landingPage/hassel-free-1.png"} />
          </Slide>
          <Slide direction="right" fraction={1} triggerOnce>
            <div className="text-black text-[42px] font-semibold  leading-[57.60px]">
              Add your devices and users to DeviceFlow’s intuitive platform.
            </div>
          </Slide>
        </div>
        <div className="flex gap-12 mt-16 pb-11 items-center">
          <Slide direction="left" fraction={1} triggerOnce>
          
            <div className="text-black text-[42px] font-semibold  leading-[57.60px]">
            Manage device allocation, purchases, and inventory with a few clicks.
            </div>
          </Slide>
          <Slide direction="right" fraction={1} triggerOnce>
          <img src={"/media/landingPage/hassel-free-2.png"} />
          </Slide>
        </div>
        <div className="flex gap-12 mt-16 pb-11 items-center">
          <Slide direction="left" fraction={1} triggerOnce>
            <img src={"/media/landingPage/hassel-free-4.png"} />
          </Slide>
          <Slide direction="right" fraction={1} triggerOnce>
            <div className="text-black text-[42px] font-semibold  leading-[57.60px]">
            Monitor asset lifecycle and optimize your IT workflows seamlessly.
            </div>
          </Slide>
        </div>
      </div>
    )
}