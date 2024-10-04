import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet'
import React, { useEffect, useState } from 'react'
import Form from './Form'
import { useRouter } from 'next/navigation'
import { Device, DeviceResponse, getDevicesByUserId } from '@/server/deviceActions'



const Devices = () => {
  const [devices, setDevices] = useState<DeviceResponse>([]); // State to hold devices
  const router = useRouter();

  const handleDeviceClick = (device: Device) => {
    router.push(`devices/${device.id}`);
  };

  useEffect(() => {
    // Fetch devices by user ID on component mount
    const fetchDevices = async () => {
      try {
        const devicesData = await getDevicesByUserId(); // Call the API function
        setDevices(devicesData); // Update the state with fetched devices
      } catch (error) {
        console.log('Failed to fetch devices');
      }
    };

    fetchDevices();
  }, []); // Empty dependency array to call useEffect only once


  return (
    <div className='flex flex-col gap-10'>
        {devices.length>0 ? ( devices.map((device:any)=>(
            <div className='flex flex-wrap justify-between items-center shadow-md rounded-xl py-5 px-8 hover:shadow-lg transition-all ease-in-out cursor-pointer'>
              <div className='flex flex-wrap justify-between items-center gap-7' onClick={() => handleDeviceClick(device)}>
                <div>
                    <img src={device.deviceImg} alt="Device Name" width={120} height={120}/>
                </div>

                <div>
                  <div className="model_number font-bold text-xl">{device.device_name}</div>
                  <div className="serial_number text-gray-500">{device.serial_no}</div>
                </div>
              </div>

              <div>
                <Sheet>
                  <SheetTrigger>
                    <button className="bg-black py-2 px-3 text-white rounded-lg hover:opacity-90 duration-300">
                      Report an Issue
                    </button>
                  </SheetTrigger>
                  <SheetContent>
                    <Form device={device}/>
                  </SheetContent>
                </Sheet>
					    </div>

            </div>
          ))) : (<h1>No Devices Available</h1>)}
    </div>
  )
}

export default Devices