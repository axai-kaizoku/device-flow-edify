import { DashboardDetails } from "./interface";

export const Members = ({
  dashboardData,
}: {
  dashboardData: DashboardDetails | null;
}) => {
  return (
    <div className="font-gilroy flex w-full flex-shrink-0 flex-col gap-y-4 overflow-clip rounded-3xl border border-solid border-x-[#c0c0c099] border-y-[#c0c0c099] bg-white pb-3 pl-[22px] pr-5 pt-[13px] tracking-[0px] backdrop-blur-[24]">
      <div className="flex items-center">
        <div className="flex items-center justify-center gap-x-[18px] pt-[0.08px]">
          <div className="text-sm font-gilroySemiBold leading-[23px]">
            Members
          </div>
          <div className="rounded-[17px] bg-purple-50 px-2 py-0.5 text-center text-xs font-gilroyMedium leading-[19px] text-purple-700">
            {(dashboardData?.userData[0].activeUsers || 0) + (dashboardData?.userData[0].inactiveUsers || 0)} Total Members
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-5 text-center text-[11px] font-gilroyMedium leading-[17px] text-slate-600 min-[461px]:flex-nowrap">
        <div className="flex w-[127px]  flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[20px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
          <div className="relative z-0 flex items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <circle cx="14.9335" cy="14.8325" r="14.1789" fill="#027A48" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.97127 8.45196C9.18819 8.45196 8.55338 9.08678 8.55338 9.86985V19.7951C8.55338 20.5782 9.18819 21.213 9.97127 21.213H19.8965C20.6796 21.213 21.3144 20.5782 21.3144 19.7951V9.86985C21.3144 9.08678 20.6796 8.45196 19.8965 8.45196H9.97127ZM12.0981 15.5414C12.0981 15.1499 11.7807 14.8325 11.3892 14.8325C10.9976 14.8325 10.6802 15.1499 10.6802 15.5414V18.3772C10.6802 18.7688 10.9976 19.0862 11.3892 19.0862C11.7807 19.0862 12.0981 18.7688 12.0981 18.3772V15.5414ZM14.9339 12.7056C15.3254 12.7056 15.6428 13.023 15.6428 13.4146V18.3772C15.6428 18.7688 15.3254 19.0862 14.9339 19.0862C14.5424 19.0862 14.2249 18.7688 14.2249 18.3772V13.4146C14.2249 13.023 14.5424 12.7056 14.9339 12.7056ZM19.1876 11.2877C19.1876 10.8962 18.8702 10.5788 18.4786 10.5788C18.0871 10.5788 17.7697 10.8962 17.7697 11.2877V18.3772C17.7697 18.7688 18.0871 19.0862 18.4786 19.0862C18.8702 19.0862 19.1876 18.7688 19.1876 18.3772V11.2877Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
            {dashboardData?.userData[0].activeUsers || 0}
          </div>
          <div className="text-center  text-[11px]">Active</div>
        </div>
        <div className="w-[127px]  flex flex-col items-start gap-y-[5.4px] rounded-[11px] border-x-[1.1px] border-t-[1.1px] border-solid border-x-[gainsboro] border-y-[gainsboro] bg-white pb-[20px] pl-3.5  pt-3.5 [border-bottom-width:1.1px]">
          <div className="relative z-0 flex items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
            >
              <circle cx="14.2125" cy="14.627" r="14.1789" fill="#FF947A" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.54092 10.3729C8.54092 8.8067 9.81055 7.53708 11.3767 7.53708H15.6304V10.3729C15.6304 11.939 16.9 13.2087 18.4662 13.2087H19.8841V18.8802C19.8841 20.4464 18.6144 21.716 17.0483 21.716H11.3767C9.81055 21.716 8.54092 20.4464 8.54092 18.8802V10.3729ZM11.3767 13.9176C10.9852 13.9176 10.6678 14.235 10.6678 14.6265C10.6678 15.0181 10.9852 15.3355 11.3767 15.3355H12.7946C13.1861 15.3355 13.5035 15.0181 13.5035 14.6265C13.5035 14.235 13.1861 13.9176 12.7946 13.9176H11.3767ZM11.3767 16.7534C10.9852 16.7534 10.6678 17.0708 10.6678 17.4623C10.6678 17.8539 10.9852 18.1713 11.3767 18.1713H14.2125C14.604 18.1713 14.9214 17.8539 14.9214 17.4623C14.9214 17.0708 14.604 16.7534 14.2125 16.7534H11.3767ZM17.5316 9.0959L17.4388 10.4883C17.4103 10.9163 17.7654 11.2714 18.1933 11.2429L19.5858 11.15C20.1935 11.1095 20.4706 10.3721 20.0399 9.94136L18.7403 8.64176C18.3096 8.21106 17.5722 8.48815 17.5316 9.0959Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="pt-1.5 text-[17px] font-gilroySemiBold leading-[23px]">
            {dashboardData?.userData[0].inactiveUsers || 0}
          </div>
          <div className="text-center">Deleted</div>
        </div>
      </div>
    </div>
  );
};
