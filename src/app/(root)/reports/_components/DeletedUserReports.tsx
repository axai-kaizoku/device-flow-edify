import React from "react";
import { convertToCSV, downloadCSV } from "./util";
import { deletedUsers } from "@/server/filterActions";
import { UserResponse } from "@/server/userActions";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert, openAlert } from "@/app/store/alertSlice";
import { GlobalAlert } from "@/components/global-alert";

const DeletedUserReports = ({
  closeBtn,
}: {
  closeBtn: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.alert.isOpen);
  const handleDownloadDeletedAssetsReport = async () => {
    try {
      const deletedUserResponse: UserResponse = await deletedUsers();
      if (
        deletedUserResponse &&
        deletedUserResponse?.users &&
        deletedUserResponse?.users?.length > 0
      ) {
        const csv = convertToCSV(deletedUserResponse?.users);

        downloadCSV(csv, `deleted_users_report.csv`);
      } else {
        // alert("No data available");
        dispatch(openAlert());
      }
    } catch (error) {
      console.error("Error downloading the report:", error);
      dispatch(openAlert());

      // alert("Failed to download the report. Please try again.");
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
      <div className="text-left my-[33px]">Get All the Deleted Members</div>
      <div className="flex gap-2">
        <button
          onClick={() => closeBtn(false)}
          className="flex-1 px-1 font-gilroySemiBold text-lg py-2.5 border-[2px] border-black rounded-[49px]"
        >
          Cancel
        </button>
        <button
          className="flex-1 px-1 text-white bg-black rounded-[49px] font-gilroySemiBold text-lg py-2.5"
          onClick={handleDownloadDeletedAssetsReport}
        >
          Download
        </button>
      </div>
    </>
  );
};

export default DeletedUserReports;
