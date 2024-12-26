import { CombinedContainer } from "@/components/container/container";
import { Device, getDeviceById } from "@/server/deviceActions";
import { CartComponent } from "../cart/page";
import StoreDeviceMain from "./_components/device-detail";
import StoreNavbar from "../_components/store-navbar";

interface TeamPageProps {
  params: { id: string };
}

export default async function DeviceDetail({ params }: TeamPageProps) {
  try {
    // const data: Device = await getDeviceById(params.id);
    const data = {
      _id: "66f66352f12d3d8756fcbb88",
      device_name: "Dell laptop",
      asset_serial_no: "Dell serial no",
      serial_no: "EDIFY-5014",
      device_type: "laptop",
      brand: "acer",
      warranty_status: false,
      warranty_expiary_date: null,
      os: "macos",
      deleted_at: null,
      purchase_value: 1899,
      payable: 1000,
      userName: " ",
    };

    return (
      <>
        {/* <div className="flex gap-4 items-center">
            <CartComponent />
          </div> */}
        <StoreDeviceMain data={data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <CombinedContainer title="Device">
        <div className="text-red-500 dark:text-red-400">
          Failed to load data. Please try again later. <br />{" "}
          <a href="/" className="underline text-blue-500">
            Back to home
          </a>
        </div>
      </CombinedContainer>
    );
  }
}
