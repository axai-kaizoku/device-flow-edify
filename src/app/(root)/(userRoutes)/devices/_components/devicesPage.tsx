import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet'
import { Button } from '@/components/wind/Buttons'
import React from 'react'
import Form from './Form'

const Devices = ({devices}:any) => {
  return (
    <div className='flex flex-col gap-10'>
        {devices.map((device:any)=>(
            <div className='flex flex-wrap justify-between items-center shadow-md rounded-xl py-5 px-8 hover:shadow-lg transition-all ease-in-out' onClick={()=>{}}>
              <div className='flex flex-wrap justify-between items-center gap-7'>
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
          ))}
    </div>
  )
}

export default Devices