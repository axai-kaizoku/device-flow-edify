"use client";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { getAllDevicesProp, getDevicesByUserId } from "@/server/deviceActions";
import NoAssetAssignedIcon from "@/icons/NoAssetAssignedIcon";
import { useClickOutside } from "@/hooks/use-outside-click";

export default function Diagonistic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const downloadRef = useRef<HTMLDivElement | null>(null);
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

  const [devices, setDevices] = useState(false);

  const buttonRef = useRef(null); // Step 1: Create a ref for the button

  const handleLinkClick = () => {
    handleDownloadSoftware();
    if (buttonRef.current) {
      buttonRef.current.click(); // Step 3: Trigger the button click
    }
  };

  useClickOutside(downloadRef, () => setDownloadModal(false));

  // Function to create query string for routing
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    async function checkDevices() {
      const devicesData: getAllDevicesProp = await getDevicesByUserId();
      if (devicesData.length > 0) {
        setDevices(true);
      }
    }

    checkDevices();
  }, []);

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

  return (
    <Suspense>
      <CombinedContainer title="Diagnostics">
        {session === 2 ? (
          sessLoader || qcReports === null ? (
            <div className="flex items-center justify-center h-full">
              <DeviceFlowLoader />
            </div>
          ) : (
            <div onClick={() => setDownloadModal(false)}>
              <QcTable
                data={qcReports}
                setPagination={setPagination}
                sessionRole={session}
              />
            </div>
          )
        ) : (
          <div className="flex flex-col ">
            <div className="flex justify-between items-center">
              {session === 1 && downloadClicked && (
                <div className="flex flex-col relative">
                  <div
                    className="flex  items-center py-1.5 gap-1  px-3 text-[#7F7F7F] border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300 cursor-pointer"
                    onClick={() => setDownloadModal(!downloadModal)}
                  >
                    <Download size={20} className="text-[#7F7F7F]" />{" "}
                    <div>Download Software</div>
                  </div>

                  {downloadModal && (
                    <div
                      ref={downloadRef}
                      className="border flex flex-col px-1 py-1 border-[#344054] bg-white rounded-2xl z-30 absolute gap-4 top-12"
                    >
                      <a
                        href="https://github.com/Harsh-winuall/QC-Release/releases/download/5.0.0/Check.Mate.Setup.5.0.0.exe"
                        className="py-2 cursor-pointer px-11 w-full text-center hover:bg-gray-50 rounded-xl text-sm text-[#344054] font-gilroyMedium"
                        onClick={() => {
                          handleLinkClick();
                          setDownloadModal(false);
                        }}
                      >
                        Windows
                      </a>
                      <a
                        href="https://github.com/Harsh-winuall/QC-Release/releases/download/5.0.1-Apple-Silicone/CheckMate-5.0.0-arm64.dmg"
                        className="py-2 cursor-pointer px-11 w-full text-center hover:bg-gray-50 rounded-xl text-nowrap text-sm text-[#344054] font-gilroyMedium"
                        onClick={() => {
                          handleLinkClick();
                          setDownloadModal(false);
                        }}
                      >
                        Apple M Series
                      </a>
                      <a
                        href="https://github.com/Harsh-winuall/QC-Release/releases/download/5.0.0-Apple/CheckMate-5.0.0.dmg"
                        className="py-2 cursor-pointer px-11 w-full text-center hover:bg-gray-50 rounded-xl text-nowrap text-sm text-[#344054] font-gilroyMedium"
                        onClick={() => {
                          handleLinkClick();
                          setDownloadModal(false);
                        }}
                      >
                        Apple Intel
                      </a>
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
              <div
                className="rounded-lg  border border-[#F6F6F6] h-[66dvh] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5 justify-center items-center"
                // onClick={() => setDownloadModal(false)}
              >
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
                        {session === 1 && (
                          <div className="flex flex-col justify-center items-center">
                            <DiagonisticIcons.analyse_device />
                            <h1 className="text-3xl font-gilroySemiBold">
                              Analyze your device
                            </h1>
                            <p className="text-base text-[#4E4D4D] py-3 font-gilroyMedium">
                              Detailed insights & full specs of your laptop
                            </p>
                          </div>
                        )}
                        {/* {JSON.stringify(downloadModal)} */}

                        {session === 1 && !downloadClicked && !loading && (
                          <>
                            <div className="relative w-full flex justify-center items-center">
                              <button
                                className="py-2 bg-black font-gilroySemiBold border hover:border hover:text-black duration-200 hover:border-black hover:bg-white text-white rounded-lg w-1/4 cursor-pointer"
                                onClick={() => {
                                  setDownloadModal((prev) => !prev);
                                  // handleUniqueGeneration();
                                }}
                              >
                                Download Software
                              </button>
                              {downloadModal && (
                                <div
                                  ref={downloadRef}
                                  className="border flex flex-col px-1 w-1/4 py-1 border-[#344054] bg-white rounded-2xl z-50 absolute gap-4 top-12"
                                >
                                  <a
                                    href="https://github.com/Harsh-winuall/QC-Release/releases/download/5.0.0/Check.Mate.Setup.5.0.0.exe"
                                    className="py-2 cursor-pointer px-11 w-full text-center hover:bg-gray-50 rounded-xl text-sm text-[#344054] font-gilroyMedium"
                                    onClick={() => {
                                      handleLinkClick();
                                      setDownloadModal(false);
                                    }}
                                  >
                                    Windows
                                  </a>
                                  <a
                                    href="https://github.com/Harsh-winuall/QC-Release/releases/download/5.0.1-Apple-Silicone/CheckMate-5.0.0-arm64.dmg"
                                    className="py-2 cursor-pointer px-11 w-full text-center hover:bg-gray-50 rounded-xl text-nowrap text-sm text-[#344054] font-gilroyMedium"
                                    onClick={() => {
                                      handleLinkClick();
                                      setDownloadModal(false);
                                    }}
                                  >
                                    Apple M Series
                                  </a>
                                  <a
                                    href="https://github.com/Harsh-winuall/QC-Release/releases/download/5.0.0-Apple/CheckMate-5.0.0.dmg"
                                    className="py-2 cursor-pointer px-11 w-full text-center hover:bg-gray-50 rounded-xl text-nowrap text-sm text-[#344054] font-gilroyMedium"
                                    onClick={() => {
                                      handleLinkClick();
                                      setDownloadModal(false);
                                    }}
                                  >
                                    Apple Intel
                                  </a>
                                </div>
                              )}
                            </div>

                            <button
                              className="py-2 border duration-200 border-black bg-white  text-black font-gilroySemiBold rounded-lg w-1/4 cursor-pointer"
                              onClick={handleViewReports}
                            >
                              View Reports
                            </button>
                          </>
                        )}

                        {!loading && qualityData && (
                          <>
                            {qualityData?.success ? (
                              <div className="flex w-1/4 gap-2">
                                <button
                                  ref={buttonRef}
                                  onClick={handleUniqueGeneration}
                                  className="py-2 border hover:border hover:text-black duration-200 hover:border-black hover:bg-white text-white bg-black font-gilroySemiBold rounded-lg w-full cursor-pointer"
                                >
                                  Generate UID
                                </button>
                              </div>
                            ) : (
                              <a
                                onClick={handleUniqueGeneration}
                                className="py-2 border hover:border hover:text-black duration-200 hover:border-black hover:bg-white text-white text-center bg-black font-gilroySemiBold rounded-lg w-1/4 cursor-pointer"
                              >
                                Generate UID
                              </a>
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
    </Suspense>
  );
}
