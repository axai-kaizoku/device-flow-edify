"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CombinedContainer } from "@/components/container/container";
import { DiagonisticIcons } from "./_components/icons";
import {
  QcReportResponse,
  qcReportTable,
  qcReportTableAdmin,
  qualityCheck,
  uniqueIdGeneration,
} from "@/server/checkMateActions";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import LoginKey from "./_components/login-key";
import QcTable from "./_components/qc-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSession } from "@/server/helper";
import { Download } from "lucide-react";

export default function Diagonistic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<any>(null);
  const [sessLoader, setSessLoader] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [qualityData, setQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [qcReports, setQcReports] = useState<QcReportResponse>(null);
  const [downloadModal, setDownloadModal] = useState(false);
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

  // Get session and role (assume admin role is indicated by a specific value, e.g. 2)
  useEffect(() => {
    async function handleSession() {
      setSessLoader(true);
      const sess = await getSession();
      console.log("Session loaded:", sess);
      setSession(sess?.user?.user?.role);
      setSessLoader(false);
    }
    handleSession();
  }, []);

  // Helper: choose fetch function based on role.
  const fetchQcReports = async (page: number, limit: number) => {
    console.log("Fetching QC reports for role:", session);
    if (session === 2) {
      console.log("Using qcReportTableAdmin");
      return await qcReportTableAdmin(page, limit);
    } else {
      console.log("Using qcReportTable");
      return await qcReportTable(page, limit);
    }
  };

  useEffect(() => {
    // For admin, fetch data regardless; for others, only if "showTable" is set
    if (session !== null && (session === 2 || searchParams.get("showTable"))) {
      (async () => {
        console.log("Fetching QC Report for page:", pagination.page);
        try {
          const res = await fetchQcReports(pagination.page, pagination.limit);
          console.log("Fetched reports:", res);
          setQcReports(res);
        } catch (error) {
          console.error("Error fetching QC reports:", error);
        }
      })();
    }
  }, [pagination.page, pagination.limit, searchParams, session]);

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
      setUniqueId(uniqueIdData?.uniqueId);
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
    try {
      const res = await fetchQcReports(pagination.page, pagination.limit);
      console.log("View Reports fetched:", res);
      setQcReports(res);
      setPagination({ limit: res.limit, page: res.page });
    } catch (error) {
      console.error("Error in handleViewReports:", error);
    }
  };
  // Show loader until session is loaded
  if (sessLoader) {
    return (
      <CombinedContainer title="Diagnostics">
        <div className="flex items-center justify-center h-full">
          <DeviceFlowLoader />
        </div>
      </CombinedContainer>
    );
  }
  return (
    <CombinedContainer title="Diagnostics">
      {session === 2 ? (
        sessLoader || qcReports === null ? (
          <DeviceFlowLoader />
        ) : (
          <QcTable
            data={qcReports}
            setPagination={setPagination}
            sessionRole={session}
          />
        )
      ) : (
        <div className="flex flex-col pt-[24px]">
          <h1 className="text-gray-400 font-gilroyMedium 2xl:text-lg text-base">
            Diagnostics
          </h1>
          <div className="flex justify-between items-center">
            <h2 className="2xl:text-3xl text-2xl font-gilroyBold pt-[10px]">
              Device QC Reports
            </h2>

            {downloadClicked && (
              <div className="flex flex-col relative">
                <div
                  className="flex  items-center py-1.5 gap-1  px-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300 cursor-pointer"
                  onClick={() => setDownloadModal(!downloadModal)}
                >
                  <Download size={20} className="text-[#7F7F7F]" />{" "}
                  <div>Download Software</div>
                </div>

                {downloadModal && (
                  <div className="border px-1 py-1 border-[#344054] bg-white rounded-2xl z-30 absolute gap-4 top-12">
                    <p className="py-2 cursor-pointer px-14 w-full text-center hover:bg-gray-50 rounded-xl text-sm text-[#344054] font-gilroyMedium">Windows</p>
                    <p className="py-2 cursor-pointer px-14 w-full text-center hover:bg-gray-50 rounded-xl text-nowrap text-sm text-[#344054] font-gilroyMedium">Apple Mac</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {searchParams.get("showTable") ? (
            <QcTable
              data={qcReports}
              setPagination={setPagination}
              sessionRole={session}
            />
          ) : (
            <div className="rounded-[21px] mt-6 border border-[#F6F6F6] h-[66dvh] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5 justify-center items-center">
              {uniqueId ? (
                <LoginKey otpString={uniqueId} onDone={handleLoginKeyDone} />
              ) : (
                <>
                  {loading ? (
                    <CombinedContainer title="Diagnostics">
                      <div className="flex items-center justify-center h-full">
                        <DeviceFlowLoader />
                      </div>
                    </CombinedContainer>
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
                                className="py-2 border duration-200 border-black bg-white  text-black font-gilroySemiBold rounded-lg w-1/2"
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
                </>
              )}
            </div>
          )}
        </div>
      )}
    </CombinedContainer>
  );
}
