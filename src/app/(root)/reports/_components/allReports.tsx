"use client";
import { getSoldInventoryReport } from "@/server/reportsAction";
import AssignedDevicesReport from "./assignedDevicesReport";
import DevicesReport from "./devicesReport";
import EmployeeReport from "./employeeReport";
import { convertToCSV, downloadCSV } from "./util";
import { report } from "../page";
import AllAssets from "./AllAssets";
import DeletedAssetsReport from "./DeletedAssetsReport";
import UnassignedReport from "./unassignedAssets";
import DeletedUserReports from "./DeletedUserReports";
import AllUsers from "./AllUsers";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert, openAlert } from "@/app/store/alertSlice";
import { GlobalAlert } from "@/components/global-alert";

interface reportsForm {
  report: report;
  index: number;
  closeBtn: (value: boolean) => void;
}

const AllReports = ({ index, report, closeBtn }: reportsForm) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.alert.isOpen);
  const handleDownloadInventoryReport = async () => {
    try {
      const data = await getSoldInventoryReport();

      if (data && data?.soldInventory && data?.soldInventory?.length > 0) {
        const csv = convertToCSV(data?.soldInventory);

        downloadCSV(csv, `Sold_Inventory_report.csv`);
      } else {
        // alert('No data available');
        dispatch(openAlert());
      }
    } catch (error) {
      console.error("Error downloading the report:", error);
      // alert('Failed to download the report. Please try again.');
      dispatch(openAlert());
    }
  };

  return (
    <>
      <GlobalAlert
        isOpen={isOpen}
        onClose={() => dispatch(closeAlert())}
        title="No data available"
        description="Something went wrong !!"
        isFailure={true}
      />
      <div key={index} className="flex flex-col space-y-4">
        <h2 className="text-3xl flex justify-start items-center gap-2 font-gilroySemiBold">
          {report?.title}
        </h2>
        {/* <p className="text-gray-600 mb-5 leading-relaxed">{report.description}</p> */}
        {report?.title === "Total Assets" ? (
          // <DevicesReport />
          <AllAssets closeBtn={closeBtn} />
        ) : report?.title === "Assigned Members" ? (
          <EmployeeReport closeBtn={closeBtn} />
        ) : report?.title === "Inventory Devices Report" ? (
          <div className="flex flex-col">
            {/* <div className="my-4">
						<label className="text-gray-700 font-gilroyMedium text-lg">File Format :</label>  
						<input type='text'
						className='w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition duration-200'
						value="CSV"
						readOnly
						required={true}
						/>  
					</div> */}

            <div className="flex gap-2">
              <button className="flex-1 font-gilroySemiBold text-lg py-2.5 border-[2px] border-black rounded-[49px]">
                Cancel
              </button>
              <button
                className="flex-1 text-white bg-black rounded-[49px] font-gilroySemiBold text-lg py-2.5"
                onClick={handleDownloadInventoryReport}
              >
                Download
              </button>
            </div>
          </div>
        ) : report?.title === "Assigned Assets" ? (
          <AssignedDevicesReport closeBtn={closeBtn} />
        ) : report?.title === "Deleted Assets" ? (
          <DeletedAssetsReport closeBtn={closeBtn} />
        ) : report?.title === "Unassigned Assets" ? (
          <UnassignedReport closeBtn={closeBtn} />
        ) : report?.title === "Deleted Members" ? (
          <DeletedUserReports closeBtn={closeBtn} />
        ) : report?.title === "Total Members" ? (
          <AllUsers closeBtn={closeBtn} />
        ) : (
          <div className="text-gray-500 italic">
            No action available right now
          </div>
        )}
      </div>
    </>
  );
};

export default AllReports;
