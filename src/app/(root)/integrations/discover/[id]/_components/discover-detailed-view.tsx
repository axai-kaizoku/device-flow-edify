"use client";
import { buttonVariants } from "@/components/buttons/Button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  allIntegrationsAvailable,
  connectGsuiteIntegration,
  connectIntegration,
  getIntegrationById,
} from "@/server/integrationActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ConnectIntegration } from "../../../_components/connect-integration";
import { IntegrationCompanyCard } from "../../../_components/discover/integration-company-card";
import { BlueLink, IntBack } from "../../../_components/icons";
import MappingDialogOne from "../../../_components/installed/mapping-dialog-one";
import MappingDialogTwo from "./mapping-dialog-two";

function DiscoverDetailedView({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [nextSteps, setNextSteps] = useState(0);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const { data, status } = useQuery({
    queryKey: ["get-integration-by-id", id],
    queryFn: () => getIntegrationById({ id }),
    // staleTime: 1000 * 60 * 5,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

  const { data: companies } = useQuery({
    queryKey: ["all-integrations"],
    queryFn: allIntegrationsAvailable,
    // staleTime: 1000 * 60 * 5,

    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

  const shuffledCompanies = useMemo(() => {
    if (!companies) return [];

    const shuffled = [...companies].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [companies]);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (status === "success") {
      setSelectedImage(data?.companyImages?.[0]);
    }
  }, [status]);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const mutation = useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload?: { platform?: string; credentials?: {}; store?: {}[] };
    }) => {
      return await connectIntegration({ payload });
    },
    mutationKey: ["add-integration-response"],
    onMutate: () => {
      setShowConnectModal(true);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["get-integration-by-id"],
          exact: false,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["fetch-people"],
          exact: false,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["user-by-integrations", "all-data"],
          exact: true,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["all-integrations", "discover"],
          exact: true,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["all-integrations"],
          exact: false,
          refetchType: "all",
        }),
      ]);

      setNextSteps(1);
      setShowConnectModal(false);
    },
  });

  const gSuiteMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return await connectGsuiteIntegration({ id });
    },
    mutationKey: ["gsuite-integration-response"],
    onMutate: () => {
      setShowConnectModal(true);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["get-integration-by-id"],
          exact: false,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["fetch-people"],
          exact: false,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["user-by-integrations", "all-data"],
          exact: true,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["all-integrations", "discover"],
          exact: true,
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["all-integrations"],
          exact: false,
          refetchType: "all",
        }),
      ]);

      setNextSteps(1);
      setShowConnectModal(false);
    },
    onError: () => {
      setShowConnectModal(false);
    },
  });

  return (
    <>
      {status === "pending" ? (
        <DiscoverDetailedViewSkeleton />
      ) : (
        <>
          {/* <GsuiteDialog open={gsuite} setOpen={setGsuite} /> */}
          <ConnectIntegration
            integrationData={data}
            mutation={mutation}
            open={showConnectModal}
            setOpen={setShowConnectModal}
            gSuiteMutation={gSuiteMutation}
            loading={gSuiteMutation.status === "pending"}
            // open={nextSteps === 1}
          />
          <MappingDialogOne
            open={nextSteps === 1}
            // setOpen={setOpenOne}
            response={gSuiteMutation?.data ?? mutation.data}
            platform={data?.platform}
            setNextSteps={setNextSteps}
          />

          <MappingDialogTwo
            open={nextSteps === 2}
            // setOpen={setOpenTwo}
            response={gSuiteMutation?.data ?? mutation.data}
            platform={data?.platform}
            setNextSteps={setNextSteps}
          />
          <div className="flex flex-col items-start w-full h-full hide-scrollbar">
            <h1
              onClick={() => router.push("/integrations/discover")}
              className="text-[#7f7f7f] cursor-pointer hover:underline pl-5 flex items-center gap-2 text-base font-gilroyMedium"
            >
              <IntBack />
              Discover
            </h1>
            <div className="flex gap-4 p-6 w-full">
              <div className="w-[20%] flex flex-col gap-4 ">
                <div className="flex justify-start items-center">
                  <div className="flex justify-start items-center w-full pl-3.5">
                    <img
                      src={data?.companyLogo}
                      width={128}
                      height={128}
                      className="size-32 object-contain"
                      alt={data?.platform ?? ""}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-start">
                  {data?.platform?.toLowerCase().includes("figma") ? (
                    <>
                      <span
                        className={buttonVariants({
                          className:
                            "rounded-lg text-sm bg-white border text-black min-w-fit w-[10rem] font-gilroySemiBold  h-9",
                        })}
                      >
                        Coming soon
                      </span>
                    </>
                  ) : data?.isConnected ? (
                    <Link
                      href={`/integrations/installed?platform=${data?.platform}`}
                    >
                      <span
                        className={buttonVariants({
                          className:
                            "rounded-lg text-sm bg-white text-black min-w-fit w-[10rem] font-gilroySemiBold border hover:border-black h-9",
                        })}
                      >
                        View Integration
                      </span>
                    </Link>
                  ) : (
                    <span
                      className={buttonVariants({
                        className:
                          "rounded-lg text-sm bg-black text-white min-w-fit w-[10rem] font-gilroySemiBold border border-black h-9 cursor-pointer hover:bg-neutral-800/95",
                      })}
                      onClick={() => setShowConnectModal(true)}
                    >
                      Install Now
                    </span>
                  )}
                </div>

                {/* <Button onClick={() => setGsuite(true)}>openj</Button> */}

                <div className="flex flex-col gap-1">
                  <h1 className="text-base font-gilroySemiBold">Built by</h1>
                  <h1 className="text-base text-[#8A8F98] font-gilroyMedium">
                    {data?.builtBy}
                  </h1>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-base font-gilroySemiBold">Website</h1>
                  <Link
                    href={data?.website}
                    target="_blank"
                    className="text-base hover:underline text-[#8A8F98] font-gilroyMedium w-fit"
                  >
                    {data?.website.split("//")[1]}
                  </Link>
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-base font-gilroySemiBold">Category</h1>
                  <p className="text-base text-[#8A8F98] font-gilroyMedium">
                    {[
                      { label: "Cloud", key: "isCloud" },
                      { label: "CRM", key: "isCrm" },
                      { label: "Design", key: "isDesign" },
                      { label: "Sales", key: "isSales" },
                      { label: "Technology", key: "isTechnology" },
                      { label: "Trending", key: "isTrending" },
                      { label: "Popular", key: "isPopular" },
                      { label: "Newly Added", key: "isNewlyAdded" },
                    ]
                      .filter(({ key }) => data?.[key as keyof typeof data])
                      .map(({ label }) => label)
                      .join(", ")}
                  </p>
                </div>
              </div>

              <div className="w-[80%] flex flex-col gap-5 ">
                <div className="flex flex-col ">
                  <h1 className="text-2xl font-gilroySemiBold">
                    {data?.platform}
                  </h1>
                  <p className="text-[#7F7F7F] text-base font-gilroyMedium">
                    {`${data?.description.split(".")[0]}.`}
                  </p>
                </div>
                <div className="flex justify-between gap-8">
                  <div className="w-[75%]">
                    <img
                      src={selectedImage}
                      className="rounded-2xl h-96 object-cover "
                      alt="Main display"
                    />
                  </div>
                  <div className="w-[25%] flex flex-col gap-5">
                    {data?.companyImages?.map((imgSrc, index) => (
                      <img
                        key={index}
                        src={imgSrc}
                        className={`rounded-xl h-28 cursor-pointer object-cover ${
                          imgSrc === selectedImage
                            ? "ring-2 ring-black p-1"
                            : ""
                        }`}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => handleImageClick(imgSrc)}
                      />
                    ))}
                  </div>
                </div>
                <h1 className="text-xl font-gilroySemiBold mt-2">Details</h1>
                <div className="flex justify-between text-base">
                  <div className="flex  font-gilroyMedium flex-col gap-2">
                    <h1>Version</h1>
                    <p className="text-[#7f7f7f]">{data?.version}</p>
                  </div>
                  <div className="flex  font-gilroyMedium flex-col gap-2">
                    <h1>Updated </h1>
                    {(() => {
                      const onboardingDate = data?.newVersionDate;

                      if (!onboardingDate) {
                        return <div>-</div>;
                      }

                      const date = new Date(onboardingDate);

                      if (isNaN(date.getTime())) {
                        return <div>-</div>;
                      }

                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return <p className="text-[#7f7f7f]">{formattedDate}</p>;
                    })()}
                  </div>
                  <div className="flex  font-gilroyMedium flex-col gap-2">
                    <h1>Size</h1>
                    <p className="text-[#7f7f7f]">{data?.size}</p>
                  </div>
                  <div className="flex  font-gilroyMedium flex-col gap-2">
                    <h1>Documentation</h1>
                    <p className="text-[#007aff] flex items-center  gap-1">
                      Click here
                      <BlueLink />
                    </p>
                  </div>
                </div>
                <h1 className="text-xl font-gilroySemiBold mt-2">About</h1>
                <p className="text-base font-gilroyMedium whitespace-pre-line break-all">
                  {data?.description}
                </p>

                <h1 className="text-xl font-gilroySemiBold ">Explore</h1>

                <div className=" flex flex-wrap gap-4 xl:grid xl:justify-items-center xl:gap-7 xl:grid-cols-3">
                  {shuffledCompanies?.slice(0, 3).map((company, i) => (
                    <IntegrationCompanyCard
                      key={company._id}
                      company={company}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DiscoverDetailedView;

const DiscoverDetailedViewSkeleton = () => (
  <>
    <h1 className="text-[#7f7f7f] px-10 flex items-center gap-2 text-lg font-gilroyMedium">
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="h-6 w-24" />
    </h1>
    <div className="flex gap-8 p-10 w-full">
      {/* Left Sidebar Skeleton */}
      <div className="w-[20%] flex flex-col gap-5">
        <div className="flex justify-center items-center">
          <Skeleton className="size-40" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Right Section Skeleton */}
      <div className="w-[80%] flex flex-col gap-5">
        <div className="flex flex-col">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-3/4 mt-2" />
        </div>
        <div className="flex justify-between gap-8">
          <Skeleton className="h-96 w-[75%] rounded-2xl" />
          <div className="w-[25%] flex flex-col gap-5">
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </div>
        </div>
        <h1 className="text-xl font-gilroySemiBold">Details</h1>
        <div className="flex justify-between">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex text-lg font-gilroyMedium flex-col gap-2"
            >
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-28" />
            </div>
          ))}
        </div>
        <h1 className="text-xl font-gilroySemiBold">About</h1>
        <Skeleton className="h-24 w-full" />
        <h1 className="text-xl font-gilroySemiBold">Explore</h1>
        <div className="flex flex-wrap gap-4 xl:grid xl:justify-items-center xl:gap-7 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-60 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  </>
);
