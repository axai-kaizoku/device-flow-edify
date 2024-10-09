import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet'
import React, { useEffect, useState } from 'react'
import Form from './Form'
import { useRouter } from 'next/navigation'
import { Device, DeviceResponse, getDevicesByUserId } from '@/server/deviceActions'



const Devices = ({devices}:any) => {
  const [closeBtn,setCloseBtn]=useState(false)
  // const [devices, setDevices] = useState<DeviceResponse>([]); // State to hold devices
  const router = useRouter();

  const handleDeviceClick = (id: string) => {
    router.push(`devices/${id}`);
  };



  return (
    <div className='flex flex-col gap-10'>
        {devices.length>0 ? ( devices.map((device:any)=>(
            <div className='flex flex-wrap justify-between items-center shadow-md rounded-xl py-5 px-8 hover:shadow-lg transition-all ease-in-out cursor-pointer'>
              <div className='flex flex-wrap justify-between items-center gap-7' onClick={() => handleDeviceClick(device._id)}>
                <div>
                    <img src={device.deviceImg} alt="Sample Img" width={120} height={120}/>
                </div>

                <div>
                  <div className="model_number font-bold text-xl">{device.device_name}</div>
                  <div className="serial_number text-gray-500">{device.serial_no}</div>
                </div>
              </div>

              <div>
                <Sheet onOpenChange={setCloseBtn} open={closeBtn}>
                  <SheetTrigger>
                    <button className="bg-black py-2 px-3 text-white rounded-lg hover:opacity-90 duration-300">
                      Report an Issue
                    </button>
                  </SheetTrigger>
                  <SheetContent>
                    <Form device={device} closeBtn={setCloseBtn}/>
                  </SheetContent>
                </Sheet>
					    </div>

            </div>
          ))) : (<h1>No Devices Available</h1>)}
    </div>
  )
}

export default Devices