"use client";
import React, { useState } from "react";
import { deleteDevice, updateDevice } from "@/server/deviceActions";
import { useRouter } from "next/navigation";
import { FileEdit, Trash } from "lucide-react";
import { getAddress } from "@/server/addressActions";
import ApiDropdown from "@/components/dropdown/api-dropdown";
import { fetchUsers } from "@/server/userActions";

function EditDevice({ data }: { data: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [deviceData, setDeviceData] = useState(data);
  const navigate = useRouter();
  const router = useRouter();

  const [formData, setFormData] = useState({
    officeLocation: {
      name: deviceData.city,
      value: deviceData.addressId,
    },
    assignedTo: {
      name: deviceData.userName,
      value: deviceData.userId,
    },
  });

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this device?");
    if (confirmed) {
      const deletedDevice = await deleteDevice(data._id);
      if (deletedDevice) {
        navigate.push("/assets");
      }
    }
  };

  const handleSave = async () => {
    const updatedDevice = await updateDevice(data._id, deviceData);
    if (updatedDevice) {
      alert("Device updated successfully");
      console.log(updatedDevice);
      setDeviceData(updatedDevice);
      setIsEditing(false);
    }
    router.refresh();
  };

  const handleApiChange =
    (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      setFormData((prev) => ({
        ...prev,
        [field]: {
          name: selectedOption.text,
          value: e.target.value,
        },
      }));

      if (field === "officeLocation") {
        setDeviceData({
          ...deviceData,
          addressId: e.target.value,
          city: selectedOption.text,
        });
      } else {
        setDeviceData({
          ...deviceData,
          userId: e.target.value,
          city: selectedOption.text,
        });
      }
    };

  return (
    <>
      <div className="p-8 space-y-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-gilroyBold text-gray-800 text-center mb-4">
          Device Details
        </h1>

        {isEditing ? (
          <div className="space-y-6">
            {/* Device Info Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-xl font-gilroySemiBold mb-4 text-blue-600">
                Device Info
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={deviceData.device_name}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      device_name: e.target.value,
                    })
                  }
                  placeholder="Device Name"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.custom_model}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      custom_model: e.target.value,
                    })
                  }
                  placeholder="Model"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.brand}
                  onChange={(e) =>
                    setDeviceData({ ...deviceData, brand: e.target.value })
                  }
                  placeholder="Brand"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.serial_no}
                  onChange={(e) =>
                    setDeviceData({ ...deviceData, serial_no: e.target.value })
                  }
                  placeholder="Serial Number"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.asset_serial_no}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      asset_serial_no: e.target.value,
                    })
                  }
                  placeholder="Asset Serial Number"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Yahan resName mein email likh do first_name ki jagah */}
                <ApiDropdown
                  fetching={fetchUsers}
                  name="userId"
                  resName="first_name"
                  value={formData.assignedTo.value}
                  onChange={handleApiChange("assignedTo")}
                  placeholder="Select a User to Assign"
                />
              </div>
            </div>

            {/* System Specs Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-xl font-gilroySemiBold mb-4 text-blue-600">
                System Specs
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={deviceData.processor}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      processor: e.target.value,
                    })
                  }
                  placeholder="Processor"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.ram}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      ram: e.target.value,
                    })
                  }
                  placeholder="RAM"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.storage}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      storage: e.target.value,
                    })
                  }
                  placeholder="Storage"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.os}
                  onChange={(e) =>
                    setDeviceData({ ...deviceData, os: e.target.value })
                  }
                  placeholder="Operating System"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Purchase & Warranty Info Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-xl font-gilroySemiBold mb-4 text-blue-600">
                Purchase & Warranty Info
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={deviceData.device_purchase_date}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      device_purchase_date: e.target.value,
                    })
                  }
                  placeholder="Purchase Date"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.purchase_value}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      purchase_value: e.target.value,
                    })
                  }
                  placeholder="Purchase Value"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.purchase_order}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      purchase_order: e.target.value,
                    })
                  }
                  placeholder="Purchase Order"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={deviceData.warranty_status}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      warranty_status: e.target.value,
                    })
                  }
                  placeholder="Warranty Status"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="date"
                  value={deviceData.warranty_expiary_date}
                  onChange={(e) =>
                    setDeviceData({
                      ...deviceData,
                      warranty_expiary_date: e.target.value,
                    })
                  }
                  placeholder="Warranty Expiry Date"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Location & Ownership Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-xl font-gilroySemiBold mb-4 text-blue-600">
                Location & Ownership
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <ApiDropdown
                  fetching={getAddress}
                  name="addressId"
                  resName="city"
                  value={formData.officeLocation.value}
                  onChange={handleApiChange("officeLocation")}
                  placeholder="Select a Location"
                />

                {/* <input
									type="text"
									value={deviceData.city}
									onChange={(e) =>
										setDeviceData({ ...deviceData, city: e.target.value })
									}
									placeholder="City"
									className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
								/> */}

                <input
                  type="text"
                  value={deviceData.ownership}
                  onChange={(e) =>
                    setDeviceData({ ...deviceData, ownership: e.target.value })
                  }
                  placeholder="Ownership"
                  className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Device Info Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-gilroySemiBold mb-4 text-blue-600">
                Device Info
              </h2>
              <p>
                <strong>Device Name:</strong> {deviceData.device_name}
              </p>
              <p>
                <strong>Model:</strong> {deviceData.custom_model}
              </p>
              <p>
                <strong>Brand:</strong> {deviceData.brand}
              </p>
              <p>
                <strong>Serial Number:</strong> {deviceData.serial_no}
              </p>
              <p>
                <strong>Asset Serial Number:</strong>{" "}
                {deviceData.asset_serial_no}
              </p>
              <p>
                <strong>Assigned To:</strong>{" "}
                {deviceData.userName || formData.assignedTo.name}
              </p>
            </div>

            {/* System Specs Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-gilroySemiBold mb-4 text-blue-600">
                System Specs
              </h2>
              <p>
                <strong>Processor:</strong> {deviceData.processor}
              </p>
              <p>
                <strong>RAM:</strong> {deviceData.ram}
              </p>
              <p>
                <strong>Storage:</strong> {deviceData.storage}
              </p>
              <p>
                <strong>Operating System:</strong> {deviceData.os}
              </p>
            </div>

            {/* Purchase & Warranty Info Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-gilroySemiBold mb-4 text-blue-600">
                Purchase & Warranty Info
              </h2>
              <p>
                <strong>Purchase Date:</strong>{" "}
                {deviceData.device_purchase_date}
              </p>
              <p>
                <strong>Purchase Value:</strong> {deviceData.purchase_value}
              </p>
              <p>
                <strong>Purchase Order:</strong> {deviceData.purchase_order}
              </p>
              <p>
                <strong>Warranty Status:</strong> {deviceData.warranty_status}
              </p>
              <p>
                <strong>Warranty Expiry Date:</strong>{" "}
                {deviceData.warranty_expiary_date}
              </p>
            </div>

            {/* Location & Ownership Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-gilroySemiBold mb-4 text-blue-600">
                Location & Ownership
              </h2>
              <p>
                <strong>City:</strong>{" "}
                {deviceData.city || formData.officeLocation.name}
              </p>
              <p>
                <strong>Ownership:</strong> {deviceData.ownership}
              </p>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
              >
                <FileEdit className="inline mr-1" />
                Edit Device
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
              >
                <Trash className="inline mr-1" />
                Delete Device
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EditDevice;
