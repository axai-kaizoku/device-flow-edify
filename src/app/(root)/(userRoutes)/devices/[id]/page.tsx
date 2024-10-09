'use client'
import { CombinedContainer } from "@/components/container/container";
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
        <CombinedContainer title="Devices">
            <div className="flex flex-col space-y-2">
						<p>
							<strong>Device Name:</strong> {deviceData?.device_name}
						</p>
						<p>
							<strong>Model:</strong> {deviceData?.custom_model}
						</p>
						<p>
							<strong>Brand:</strong> {deviceData?.brand}
						</p>
						<p>
							<strong>Serial Number:</strong> {deviceData?.serial_no}
						</p>
						<p>
							<strong>OS:</strong> {deviceData?.os}
						</p>
						<p>
							<strong>Processor:</strong> {deviceData?.processor}
						</p>
						<p>
							<strong>RAM:</strong> {deviceData?.ram}
						</p>
						<p>
							<strong>Storage:</strong> {deviceData?.storage}
						</p>
						<p>
							<strong>Warranty Status:</strong>{' '}
							{deviceData?.warranty_status ? 'Active' : 'Inactive'}
						</p>
						<p>
							<strong>Purchase Date:</strong> {deviceData?.device_purchase_date}
						</p>
						<p>
							<strong>Purchase Value:</strong> {deviceData?.purchase_value}
						</p>
						<p>
							<strong>Device Location:</strong> {deviceData?.city}
						</p>
						<p>
							<strong>Asset Serial Value:</strong> {deviceData?.asset_serial_no}
						</p>
						<p>
							<strong>Purchase Order:</strong> {deviceData?.purchase_order}
						</p>
                    </div>
        </CombinedContainer>
    )
}

export default Page