"use client";
import { Device } from "@/server/deviceActions";
import { useRouter } from "next/navigation";
import React from "react";

function TrendingDevices({ data }: { data: Device[] }) {
  const router = useRouter();
  const handleSubmit = (id: string) => {
    router.push(`/store/${id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-gilroySemiBold mb-6 text-gray-800">
        🔥 Trending Devices
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((device) => (
          <div
            key={device?._id}
            className="group p-4 border rounded-lg bg-gray-50 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden"
          >
            {/* Device Image */}
            <div className="w-full h-40 bg-white rounded-t-lg overflow-hidden">
              <img
                src={device?.image![0]?.url ?? "/media/mac.jpeg"}
                alt={device?.device_name}
                className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Device Details */}
            <div className="p-4">
              <h3 className="text-lg font-gilroySemiBold text-gray-700 mb-2 truncate">
                {device?.device_name}
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <span className="font-gilroyMedium text-gray-700">
                    Brand:
                  </span>{" "}
                  {device?.brand}
                </p>
                <p>
                  <span className="font-gilroyMedium text-gray-700">OS:</span>{" "}
                  {device?.os}
                </p>
                <p>
                  <span className="font-gilroyMedium text-gray-700">Type:</span>{" "}
                  {device?.device_type}
                </p>
                <p>
                  <span className="font-gilroyMedium text-gray-700">
                    Serial No:
                  </span>{" "}
                  {device?.serial_no}
                </p>
              </div>

              {/* Pricing */}
              <div className="mt-4 flex items-center justify-between text-gray-700">
                <p className="text-sm line-through">₹{device.purchase_value}</p>
                <p className="text-lg font-gilroyBold text-red-500">
                  ₹{device?.payable}
                </p>
              </div>

              {/* Call to Action */}
              <button
                onClick={() => handleSubmit(device?._id!)}
                className="mt-6 w-full bg-black hover:bg-black/80 text-white text-sm font-gilroyMedium py-2 rounded-lg transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        )) || <p>No trending devices available</p>}
      </div>
    </div>
  );
}

export default TrendingDevices;
