"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CombinedContainer } from "@/components/container/container";
import { DiagonisticIcons } from "./_components/icons";
import {
  QcReportResponse,
  qcReportTable,
  qualityCheck,
  uniqueIdGeneration,
} from "@/server/checkMateActions";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import LoginKey from "./_components/login-key";
import QcTable from "./_components/qc-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Diagonistic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [downloadClicked, setDownloadClicked] = useState(false);
  const [qualityData, setQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [qcReports, setQcReports] = useState<QcReportResponse>(null);
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 5,
    }
  );

  // Function to create query string for routing
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Fetch QC Reports on pagination changes if the table is visible
  useEffect(() => {
    if (searchParams.get("showTable")) {
      (async () => {
        console.log("Fetching QC Report for page:", pagination.page);
        const res = await qcReportTable(pagination.page, pagination.limit);
        setQcReports(res);
      })();
    }
  }, [pagination.page, pagination.limit, searchParams]);

  const handleDownloadSoftware = async () => {
    setLoading(true);
    try {
      const data = await qualityCheck();
      console.log("Quality Check Response:", data);
      setQualityData(data);
      setDownloadClicked(true);
    } catch (error) {
      console.error("Error during quality check:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUniqueGeneration = async () => {
    setLoading(true);
    try {
      const uniqueIdData = await uniqueIdGeneration();
      console.log("Unique ID Response:", uniqueIdData);
      setUniqueId(uniqueIdData.uniqueId);
    } catch (error) {
      console.error("Error during unique ID generation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginKeyDone = () => {
    setUniqueId(null);
    setDownloadClicked(false);
    setQualityData(null);
  };

  // Initial fetch on clicking "View Reports"
  const handleViewReports = async () => {
    router.push(pathname + "?" + createQueryString("showTable", "true"));
    const res = await qcReportTable(pagination.page, pagination.limit);
    setQcReports(res);
    setPagination({ limit: res.limit, page: res.page });
  };

  return (
    <CombinedContainer title="Diagnostics">
      <div className="flex flex-col pt-[14px]">
        <h1 className="text-gray-400 font-gilroyMedium 2xl:text-lg text-base">
          Diagnostics
        </h1>
        <h2 className="2xl:text-3xl text-2xl font-gilroyBold pt-[10px]">
          Device QC Reports
        </h2>
        {searchParams.get("showTable") ? (
          <QcTable data={qcReports} setPagination={setPagination} />
        ) : (
          <div className="rounded-[21px] mt-14 border border-[#F6F6F6] h-[66dvh] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5 justify-center items-center">
            {uniqueId ? (
              <LoginKey otpString={uniqueId} onDone={handleLoginKeyDone} />
            ) : (
              <>
                <div className="flex flex-col justify-center items-center">
                  <DiagonisticIcons.analyse_device />
                  <h1 className="text-3xl font-gilroySemiBold">
                    Analyze your device
                  </h1>
                  <p className="text-base text-[#4E4D4D] py-3 font-gilroyMedium">
                    Detailed insights & full specs of your laptop
                  </p>
                </div>
                {loading && (
                  <div className="py-2 text-base">
                    <DeviceFlowLoader />
                  </div>
                )}
                {!downloadClicked && !loading && (
                  <button
                    className="py-2 bg-black font-gilroySemiBold border hover:border hover:text-black duration-200 hover:border-black hover:bg-white text-white rounded-lg w-1/4"
                    onClick={handleDownloadSoftware}
                  >
                    Download Software
                  </button>
                )}
                {downloadClicked && !loading && qualityData && (
                  <>
                    {qualityData.success ? (
                      <div className="flex w-1/3 gap-2">
                        <button
                          onClick={handleUniqueGeneration}
                          className="py-2 border hover:border hover:text-black duration-200 hover:border-black hover:bg-white text-white bg-black font-gilroySemiBold rounded-lg w-1/2"
                        >
                          Scan Device
                        </button>
                        <button
                          className="py-2 border hover:border hover:text-black duration-200 hover:border-black hover:bg-white text-white bg-black font-gilroySemiBold rounded-lg w-1/2"
                          onClick={handleViewReports}
                        >
                          View Reports
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleUniqueGeneration}
                        className="py-2 border hover:border hover:text-black duration-200 hover:border-black hover:bg-white text-white bg-black font-gilroySemiBold rounded-lg w-1/4"
                      >
                        Scan Device
                      </button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </CombinedContainer>
  );
}
