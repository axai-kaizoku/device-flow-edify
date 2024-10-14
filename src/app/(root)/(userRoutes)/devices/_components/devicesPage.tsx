// Devices.tsx
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import Form from './Form';
import { useRouter } from 'next/navigation';
import { Device, getAllDevicesProp } from '@/server/deviceActions';


type DevicesProps = {
	devices: getAllDevicesProp;
};

const Devices = ({ devices }: DevicesProps) => {
	const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
	const router = useRouter();

	const handleDeviceClick = (id: string | undefined) => {
		router.push(`devices/${id}`);
	};

	const handleReportClick = (device: Device) => {
		setSelectedDevice(device);
	};

	const closeSheet = () => {
		setSelectedDevice(null);
	};

	return (
		<div className="flex flex-col gap-10">
			{devices.length > 0 ? (
				devices.map((device: Device) => (
					<div
						key={device._id}
						className="flex flex-wrap justify-between items-center shadow-md rounded-xl py-5 px-8 hover:shadow-lg transition-all ease-in-out">
						{/* Device Information */}
						<div
							className="flex flex-wrap justify-between items-center gap-7 cursor-pointer"
							onClick={() => handleDeviceClick(device._id)}>
							<div>
								<img
									src={device.image}
									alt={device.device_name}
									width={120}
									height={120}
									className="object-cover rounded-md"
								/>
							</div>

							<div>
								<div className="model_number font-bold text-xl">
									{device.device_name}
								</div>
								<div className="serial_number text-gray-500">
									{device.serial_no}
								</div>
							</div>
						</div>

						{/* Report Issue Button */}
						<div>
							<button
								className="bg-black py-2 px-3 text-white rounded-lg hover:opacity-90 duration-300"
								onClick={() => handleReportClick(device)}>
								Report an Issue
							</button>
						</div>
					</div>
				))
			) : (
				<h1>No Devices Available</h1>
			)}

			{/* Single Sheet for the Selected Device */}
			<Sheet
				open={selectedDevice !== null}
				onOpenChange={(open) => !open && closeSheet()}>
				<SheetContent>
					{selectedDevice && (
						<Form device={selectedDevice} closeBtn={closeSheet} />
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default Devices;
