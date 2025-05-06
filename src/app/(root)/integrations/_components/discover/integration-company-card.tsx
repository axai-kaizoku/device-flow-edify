import { AllIntegrationAvailable } from "@/server/integrationActions";
import Link from "next/link";

export const IntegrationCompanyCard = ({
  company,
}: {
  company: AllIntegrationAvailable;
}) => {
  const displayWebsite = company?.website?.replace(/^https?:\/\//, "");
  return (
    <Link
      href={`/integrations/discover/${company._id}`}
      key={company?._id}
      className="max-w-[18rem] w-full rounded-md hover:border-black p-4 flex flex-col gap-4 border border-[#B4B4B4]"
    >
      <div className="flex gap-2.5 items-start justify-between relative">
        <div className="flex gap-1.5">
          <img
            src={company?.companyLogo}
            alt={company?.platform}
            width={48}
            height={48}
            className="object-contain size-12"
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-lg font-gilroySemiBold">
              {" "}
              {company?.platform}
            </h1>
            <span className="text-[#7F7F7F] text-sm font-gilroyMedium flex items-center">
              <Link
                href={`/integrations/discover/${company._id}`}
                onClick={(e) => e.stopPropagation()}
                className="hover:underline truncate w-fit"
              >
                {displayWebsite}
              </Link>
              <a
                href={company?.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="ml-2"
              >
                <img
                  src="/media/discover-filters/open-link.svg"
                  alt="open link"
                  width={16}
                  height={16}
                />
              </a>
            </span>
          </div>
        </div>
        {company?.isConnected ? (
          <div className="bg-[#E2FBE6] text-[#2E8016] text-[12px] font-gilroyMedium rounded-full flex justify-center items-center px-2.5 py-0.5 absolute top-0 right-0">
            Installed
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <p className="text-[#7f7f7f] font-gilroyMedium text-sm line-clamp-2">
        {company?.description}
      </p>
    </Link>
  );
};
