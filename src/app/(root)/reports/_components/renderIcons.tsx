import { LaptopMinimal, Smartphone, UserRound } from "lucide-react";
import { report } from "../page";

export const RenderIcon = ({report}:{report:report}) =>{
    if (report?.title.toLowerCase().startsWith('active')) {
        return (
          <div className='bg-[#F0FFF4] rounded-[17px] w-14 h-14 flex justify-center items-center'>
            <div className='rounded-[13px] bg-[#DAFFE5] p-2 w-11 h-11 flex justify-center items-center'>
              {
                report?.tag.toLowerCase() === 'people' ?
                    <UserRound className='w-6 h-7 text-[#0D9B00]' /> :
                    <LaptopMinimal className='w-6 h-7 text-[#0D9B00]'/>
                }
            </div>
          </div>
        );
      } else if (report?.title.toLowerCase().startsWith('deleted')) {
        return (
          <div className='bg-[#FFE8E8] rounded-[17px] w-14 h-14 flex justify-center items-center'>
            <div className='rounded-[13px] bg-[#FED9D9] p-2 w-11 h-11 flex justify-center items-center'>
            {
                report?.tag.toLowerCase() === 'people' ?
                    <UserRound className='w-6 h-7 text-[#FF0000]' /> :
                    <LaptopMinimal className='w-6 h-7 text-[#FF0000]'/>
                }
            </div>
          </div>
        );
      }
      else {
        return (
          <div className='bg-[#E9E9E9] rounded-[17px] w-14 h-14 flex justify-center items-center'>
            <div className='rounded-[13px] bg-[#D3D3D3] p-2 w-11 h-11 flex justify-center items-center'>
            {
                report?.tag.toLowerCase() === 'people' ?
                    <UserRound className='w-6 h-7 text-black' /> :
                    <LaptopMinimal className='w-6 h-7 text-black'/>
                }
            </div>
          </div>
        );
      }
}