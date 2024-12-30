import { CombinedContainer } from "@/components/container/container";
import { Device, getDeviceById } from "@/server/deviceActions";
import React from "react";
import EditDevice from "./_components/edit-device";
interface DevicePageProps {
  params: { id: string };
}
async function SingleDevice({ params }: DevicePageProps) {
  const data: Device = await getDeviceById(params.id);

  return (
    <CombinedContainer title="Devices">
      <EditDevice data={data} />
    </CombinedContainer>
  );
}

export default SingleDevice;
