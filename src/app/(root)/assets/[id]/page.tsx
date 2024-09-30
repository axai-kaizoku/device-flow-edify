import { CombinedContainer } from '@/components/container/container';
import { Device, getDeviceById } from '@/server/deviceActions';
import React from 'react';
import EditDevice from './_components/edit-device';
interface DevicePageProps {
	params: { id: string };
}
async function SingleDevice({ params }: DevicePageProps) {
	const data: Device = await getDeviceById(params.id);

	return (
		<CombinedContainer title="Devices">
			{/* <div className="p-6 space-y-4">
				<h1 className="text-2xl font-bold">Device Details</h1>
				<div className="flex flex-col space-y-2">
					<p>
						<strong>Device Name:</strong> {data.device_name}
					</p>
					<p>
						<strong>Model:</strong> {data.custom_model}
					</p>
					<p>
						<strong>Brand:</strong> {data.brand}
					</p>
					<p>
						<strong>Serial Number:</strong> {data.serial_no}
					</p>
					<p>
						<strong>OS:</strong> {data.os}
					</p>
					<p>
						<strong>Processor:</strong> {data.processor}
					</p>
					<p>
						<strong>RAM:</strong> {data.ram}
					</p>
					<p>
						<strong>Storage:</strong> {data.storage}
					</p>
					<p>
						<strong>Warranty Status:</strong>{' '}
						{data.warranty_status ? 'Active' : 'Inactive'}
					</p>
					<p>
						<strong>Purchase Date:</strong> {data.device_purchase_date}
					</p>
					<p>
						<strong>Purchase Value:</strong> {data.purchase_value}
					</p>
					<p>
						<strong>Asset Serial Value:</strong> {data.asset_serial_no}
					</p>
					<p>
						<strong>Purchase Order:</strong> {data.purchase_order}
					</p>
				</div>
			</div> */}
			<EditDevice data={data} />
		</CombinedContainer>
	);
}

export default SingleDevice;
