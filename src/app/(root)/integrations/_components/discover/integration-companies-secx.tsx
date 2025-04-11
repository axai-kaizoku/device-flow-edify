import Link from "next/link";
import { IntegrationCompanyCard } from "./integration-company-card";
import { AllIntegrationAvailable } from "@/server/integrationActions";

export const IntegrationCompaniesSecx = (props: {
  categoryName: string;
  categoryCompanies: AllIntegrationAvailable[];
}) => {
  return (
    <section className="w-full flex flex-col items-start gap-3 ">
      <h1 className="relative font-gilroySemiBold p-1.5">
        {props?.categoryName}
      </h1>
      <div className=" flex flex-wrap gap-3 xl:grid xl:justify-items-center xl:gap-5 xl:grid-cols-3">
        {props?.categoryCompanies?.map((company) => (
          <IntegrationCompanyCard key={company?._id} company={company} />
        ))}
      </div>
    </section>
  );
};
