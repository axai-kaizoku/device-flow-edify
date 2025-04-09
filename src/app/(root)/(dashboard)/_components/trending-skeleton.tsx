export function TrendingDevices({
    dashboardData,
  }: {
    dashboardData: DashboardDetails | null;
  }) {
    const router = useRouter();
  
    if (!dashboardData) {
      return (
        <div className="flex w-full flex-col">
          <div className="font-gilroy flex flex-grow flex-col items-center justify-center gap-y-[5px] rounded-3xl border border-solid border-x-[#c0c0c099] border-y-[#c0c0c099] bg-white pb-2 pl-[5.2px] pr-[4.7px] pt-[13px] leading-[normal] tracking-[0px] backdrop-blur-[24]">
            <div className="flex items-center justify-between gap-x-4 self-stretch pl-4 pr-8">
              <div className="flex flex-col items-center">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-y-2 self-stretch">
              {[...Array(3)].map((_, index) => (
                <div className="flex flex-col gap-y-3 pt-[5px]" key={`trending-skeleton-${index}`}>
                  <div className="h-px bg-gray-200 w-full"></div>
                  <div className="flex h-16 flex-shrink-0 items-center justify-evenly gap-x-3.5">
                    <div className="flex flex-col items-center self-stretch">
                      <div className="h-16 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex flex-col items-start gap-y-[1.9px]">
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                      <div className="flex items-center gap-x-[2.8px]">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-1 w-1 bg-gray-200 rounded-full"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  
    // Rest of your existing component
    return (
      // ... your existing return
    );
  }