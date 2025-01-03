import { getDeviceById, StoreDevice } from "@/server/deviceActions";
import StoreDeviceMain from "./_components/main";

type TeamPageProps = { params: { id: string } };

export default async function DeviceDetail({ params }: TeamPageProps) {
  try {
    const data: StoreDevice = await getDeviceById(params.id);

    return <StoreDeviceMain data={data} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="text-red-500 dark:text-red-400">
        Failed to load data. Please try again later. <br />
        <a href="/" className="underline text-blue-500">
          Back to home
        </a>
      </div>
    );
  }
}
