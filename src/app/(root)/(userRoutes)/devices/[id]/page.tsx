import { CombinedContainer } from "@/components/container/container";
import { Device, getDeviceById } from "@/server/deviceActions";
import { useState } from "react";

interface DeviceParam {
    params: {id: string}
}

const Page = async ({params}: DeviceParam) => {
    // const [deviceData, setDeviceData] = useState({});
    const {id} = params;
    const data: Device = await getDeviceById(id); // Fetch the device by ID

    // const data: Device = await getDeviceById(id);
    // console.log(data);

    return (
        <CombinedContainer title="Devices">
            <div className="flex flex-col space-y-2">
						<p>
							<strong>Device Name:</strong> {data?.device_name}
						</p>
						<p>
							<strong>Model:</strong> {data?.custom_model}
						</p>
						<p>
							<strong>Brand:</strong> {data?.brand}
						</p>
						<p>
							<strong>Serial Number:</strong> {data?.serial_no}
						</p>
						<p>
							<strong>OS:</strong> {data?.os}
						</p>
						<p>
							<strong>Processor:</strong> {data?.processor}
						</p>
						<p>
							<strong>RAM:</strong> {data?.ram}
						</p>
						<p>
							<strong>Storage:</strong> {data?.storage}
						</p>
						<p>
							<strong>Warranty Status:</strong>{' '}
							{data?.warranty_status ? 'Active' : 'Inactive'}
						</p>
						<p>
							<strong>Purchase Date:</strong> {data?.device_purchase_date}
						</p>
						<p>
							<strong>Purchase Value:</strong> {data?.purchase_value}
						</p>
						<p>
							<strong>Device Location:</strong> {data?.city}
						</p>
						<p>
							<strong>Asset Serial Value:</strong> {data?.asset_serial_no}
						</p>
						<p>
							<strong>Purchase Order:</strong> {data?.purchase_order}
						</p>
                    </div>
        </CombinedContainer>
    )
}

export default Page