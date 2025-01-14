import React, { useEffect, useRef, useState } from "react";
import { FormField } from "@/app/(root)/settings/_components/form-field";
import { Org, getCurrentOrg, updateOrg } from "@/server/orgActions";
import Spinner from "@/components/Spinner";
import { Icons } from "@/components/icons";

export function CompanyDetails({ setSteps }: any) {
  const [company, setCompany] = useState<Org | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    const data: Org = await getCurrentOrg();
    setCompany(data);
  };
  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file instanceof File) {
      const formData: any = new FormData();
      formData.append("file", file);
      try {
        const data = await updateOrg({

          id:company?._id,
          title: undefined,
          description: undefined,
          logo: formData
        }
        ); // Send the image in the form data
        getCompany();
      } catch (error) {}
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateOrg({id: company?._id, title: company?.name});
      setSteps(2)
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen justify-evenly items-center flex flex-col lg:flex-row p-8">
      <div className="w-[42%] relative h-full justify-center items-center flex flex-col">
        <div
          className={`font-gilroySemiBold flex w-full gap-6 flex-col items-center  leading-[normal] tracking-[0px]`}
        >
          <div className="w-full">
            <div className="text-center text-[25px] font-gilroyBold leading-[normal] text-indigo-950">
              Customise your Organisation
            </div>
            <div className="text-center text-xl font-gilroyMedium leading-[normal] text-zinc-400">
              Setup your organization
            </div>
          </div>
         {company?.logo ? <div>
                <img
                  src={company.logo}
                  alt="Company Logo"
                  className="size-28 rounded-full border object-cover"
                />
            </div>:  <svg
            width="137"
            height="136"
            viewBox="0 0 137 136"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="68.1633"
              cy="68.09"
              r="66.1895"
              fill="#ECF0FF"
              stroke="#465FF1"
              strokeWidth="3.33029"
            />
            <path
              d="M68.8672 78.8259V73.3896"
              stroke="#465FF1"
              strokeWidth="3.33029"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M82.1412 54.5127C85.7625 54.5127 88.6766 57.4483 88.6766 61.0696V68.4408C83.4054 71.5264 76.4414 73.3906 68.8559 73.3906C61.2705 73.3906 54.3279 71.5264 49.0566 68.4408V61.0482C49.0566 57.4269 51.9922 54.5127 55.6135 54.5127H82.1412Z"
              stroke="#465FF1"
              strokeWidth="3.33029"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M76.3666 54.5032V53.7189C76.3666 51.1047 74.2453 48.9834 71.6311 48.9834H66.1027C63.4885 48.9834 61.3672 51.1047 61.3672 53.7189V54.5032"
              stroke="#465FF1"
              strokeWidth="3.33029"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M49.1094 76.2676L49.5144 81.6438C49.7886 85.2673 52.8078 88.0679 56.4398 88.0679H81.2939C84.9259 88.0679 87.9451 85.2673 88.2194 81.6438L88.6244 76.2676"
              stroke="#465FF1"
              strokeWidth="3.33029"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>}
          <div className="flex flex-col justify-end self-stretch pt-[17px]">
            <div className="flex flex-grow flex-wrap items-center justify-center gap-x-[22px] gap-y-[22px] text-[15px] font-medium leading-[normal] text-indigo-950 [max-height:59px] min-[423.75189208984375px]:flex-nowrap">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-x-[15px] rounded-[7.4px] border-x-[0.93px] border-t-[0.93px] border-solid border-x-[dimgray] border-y-[dimgray] bg-white px-8 py-2.5 [border-bottom-width:0.93px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.01214 9.08856C7.39749 9.08856 7.71024 9.40131 7.71024 9.78666C7.71024 10.172 7.39749 10.4848 7.01214 10.4848H6.14371C4.63675 10.4848 3.41182 11.7097 3.41182 13.2157V17.7533C3.41182 19.2603 4.63675 20.4852 6.14371 20.4852H16.5035C18.0095 20.4852 19.2354 19.2603 19.2354 17.7533V13.2073C19.2354 11.706 18.0142 10.4848 16.5137 10.4848H15.636C15.2506 10.4848 14.9379 10.172 14.9379 9.78666C14.9379 9.40131 15.2506 9.08856 15.636 9.08856H16.5137C18.7839 9.08856 20.6315 10.9362 20.6315 13.2073V17.7533C20.6315 20.0301 18.7793 21.8814 16.5035 21.8814H6.14371C3.86791 21.8814 2.01562 20.0301 2.01562 17.7533V13.2157C2.01562 10.9399 3.86791 9.08856 6.14371 9.08856H7.01214ZM11.8175 2.971L14.5317 5.69637C14.8035 5.97002 14.8025 6.41122 14.5298 6.68301C14.2562 6.95481 13.815 6.95481 13.5432 6.68115L12.0208 5.15348L12.0213 15.3686H10.6251L10.6246 5.15348L9.1042 6.68115C8.9683 6.81891 8.78866 6.88686 8.60994 6.88686C8.43216 6.88686 8.25345 6.81891 8.11755 6.68301C7.84483 6.41122 7.84297 5.97002 8.11569 5.69637L10.829 2.971C11.0905 2.70758 11.5559 2.70758 11.8175 2.971Z"
                    fill="#26203B"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  {company?.logo ? <div>Edit Logo</div>: <div>Upload Logo</div>}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleUploadLogo}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[75%] gap-6">
            <FormField
              label="Company Name"
              id="companyName"
              maxLength={6}
              value={company?.name || ""}
              onChange={(e) => {
                const nextState = { ...company };
                nextState.name = e.target.name;
                setCompany(nextState);
              }}
              placeholder="Company Name"
            />
          </div>
          <button
            onClick={() => {
              onSubmit();
            }}
            className="flex items-center mt-5 justify-center h-[56px] w-[75%] rounded-[9.3px] bg-black px-44 py-[13px]"
          >
            {loading ? (
              <Spinner />
            ) : (
              <div className="text-center text-white">Submit</div>
            )}
          </button>
        </div>
      </div>
      <div className="w-[46%]  h-[auto]">
        <img
          src="/media/Onboarding/CompanyDetails.png"
          alt="edify-background"
          width={"100%"}
        />
      </div>
    </div>
  );
}
