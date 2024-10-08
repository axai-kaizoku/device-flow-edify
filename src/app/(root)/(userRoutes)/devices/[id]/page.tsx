'use client'
import { Device, getDeviceById } from "@/server/deviceActions";
import { useState } from "react";

interface DeviceParam {
    params: {id: string}
}

const Page = async ({params}: DeviceParam) => {
    const [deviceData, setDeviceData] = useState({});
    const {id} = params;
    console.log(id);
    // const data: Device = await getDeviceById(id); // Fetch the device by ID

    // const data: Device = await getDeviceById(id);
    // console.log(data);

    return (
        <div>
            
        </div>
    )
}

export default Page