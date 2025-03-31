"use client";
import React, { useCallback, useState } from "react";
import { CombinedContainer } from "@/components/container/container";
import { DiagonisticIcons } from "./_components/icons";
import { qualityCheck, uniqueIdGeneration } from "@/server/checkMateActions";
import { getSession } from "@/server/helper";
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
  const [sessionData, setSessionData] = useState(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleDownloadSoftware = async () => {
    setLoading(true);
    try {
      const sess = await getSession();
      console.log("Session:", sess);
      setSessionData(sess);

      if (!sess || !sess.user?.user?.userId) {
        console.error("User ID not found in session");
        setLoading(false);
        return;
      }

      const data = await qualityCheck(sess.user.user.userId);
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
      const sess = await getSession();
      console.log("Session for Unique Generation:", sess);
      if (!sess || !sess.user?.user?.userId) {
        console.error("User ID not found in session");
        setLoading(false);
        return;
      }
      const uniqueIdData = await uniqueIdGeneration(sess.user.user.userId);
      console.log("Unique ID Response:", uniqueIdData);
      // Assuming the API returns an object with a uniqueId field
      setUniqueId(uniqueIdData.uniqueId);
    } catch (error) {
      console.error("Error during unique ID generation:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleLoginKeyDone = () => {
    // Reset state so that the download software screen is shown again.
    setUniqueId(null);
    setDownloadClicked(false);
    setQualityData(null);
  };

  const handleViewReports = () => {
    router.push(pathname + "?" + createQueryString("showTable", "false"));
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
        {searchParams.get("showTable") ? ( // Show QcTable when showQcTable is false
          <QcTable />
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
