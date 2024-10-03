import { Device, getDeviceById } from "@/server/deviceActions";
import { useState } from "react";

interface DeviceParam {
    params: {id: string}
}

const Page = async ({params}: DeviceParam) => {
    // const {id} = params;
    // const [deviceData, setDeviceData] = useState({});

    // const data: Device = await getDeviceById(id);
    // console.log(data);

    return (
        <div>
            
        </div>
    )
}

export default Page