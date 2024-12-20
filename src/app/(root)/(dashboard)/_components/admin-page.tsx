import { CombinedContainer } from "@/components/container/container";
import { SearchBarWithProfile } from "@/components/container/search-bar-with-profile";

import { getTrendingDevice } from "@/server/storeActions";
import { getCurrentOrg, Org } from "@/server/orgActions";

import TrendingDevices from "./trending-dashboard";
import { Device } from "@/server/deviceActions";
// import { SelectDemo } from "@/components/dropdown/select-input";
// import { SelectDropdownDemo } from "@/components/dropdown/select-dropdown";
// import { DownloadButton } from "@/components/buttons/download-button";

export default async function AdminDashboard() {
  const trendingDevice: Device[] = await getTrendingDevice();
  const organisation: Org = await getCurrentOrg();
  const organisationById = organisation;

  return (
    <CombinedContainer title="Admin Dashboard">
      {/* <div className="w-full h-60 flex items-center justify-center">
        <DownloadButton />
      </div> */}

      <div>
        <SearchBarWithProfile />

        <div className="h-8" />

        {/* <SelectDemo />
        <SelectDropdownDemo /> */}
        {/* Organization Details Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-gilroySemiBold mb-6 text-gray-800 flex items-center">
            🌟 Organization Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Total Devices",
                value: organisationById?.total_devices || "0",
                icon: "💻",
              },
              {
                title: "Total Users",
                value: organisationById?.total_users || "0",
                icon: "👥",
              },
              {
                title: "Total Purchase",
                value: organisationById?.total_purchased
                  ? `₹ ${new Intl.NumberFormat("en-IN").format(
                      organisationById.total_purchased
                    )}`
                  : "N/A",
                icon: "💰",
              },
              {
                title: "Primary Address",
                value:
                  organisationById?.office_address?.find(
                    (addr) => addr.isPrimary
                  )?.city || "N/A",
                icon: "📍",
              },
            ].map((detail, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-gray-100 via-gray-50 to-white"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl">{detail.icon}</span>
                  <h3 className="text-lg font-gilroyMedium text-gray-700 ml-4">
                    {detail.title}
                  </h3>
                </div>
                <p className="text-md text-gray-600 font-gilroySemiBold">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Padding */}
        <div className="h-8" />

        {/* Upcoming Joinees Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-gilroySemiBold mb-6 text-gray-800">
            🎉 Upcoming Joinees
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {organisationById?.upcoming_joinee?.map((joinee) => (
              <div
                key={joinee._id}
                className="p-6 border rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-gilroyBold text-blue-500">
                    {joinee.first_name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-gilroyMedium text-gray-700">
                      {joinee.first_name} {joinee.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">{joinee.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-gilroyMedium text-gray-700">
                      Phone:
                    </span>{" "}
                    {joinee.phone}
                  </p>
                  <p>
                    <span className="font-gilroyMedium text-gray-700">
                      Onboarding:
                    </span>{" "}
                    {new Date(joinee.onboarding_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )) || <p className="text-gray-600">No upcoming joinees</p>}
          </div>
        </div>

        <div className="h-8" />

        <TrendingDevices data={trendingDevice} />

        <div className="h-8" />
      </div>
    </CombinedContainer>
  );
}
