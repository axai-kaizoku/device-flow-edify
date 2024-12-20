"use server";
import { redirect } from "next/navigation";
import { callAPIWithToken, getSession } from "./helper";
import { AxiosError } from "axios";

//Device type
export type Device = {
  _id?: string;
  id?: string;
  userId?: string;
  orgId?: string | null;
  addressId?: string | null;
  city?: string;
  device_name?: string;
  userName?: string;
  device_type?: string;
  asset_serial_no?: string;
  serial_no?: string;
  ram?: string;
  processor?: string;
  storage?: string;
  assigned_at?: string;
  custom_model?: string;
  brand?: string;
  warranty_status?: boolean;
  warranty_expiary_date?: string | null;
  ownership?: string;
  purchase_order?: string;
  purchase_value?: number;
  os?: string;
  deleted_at?: string | null;
  device_purchase_date?: string;
  is_trending?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  payable?: number;
};
export type getAllDevicesProp = Device[];
export type DeviceResponse = {
  devices: Device[]; // Changed from 'devices' to 'documents'
  totalPages: number;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  documentCount: number;
  currentDocumentCount: number;
};

//Creating Devices
// Creating Devices
export const createDevices = async (
  device: Device
): Promise<Device | undefined> => {
  try {
    // Prepare device data with proper types
    const deviceData = {
      device_name: device.device_name || "Default",
      device_type: device.device_type,
      asset_serial_no: device.asset_serial_no || null,
      serial_no: device.serial_no,
      ram: device.ram,
      processor: device.processor,
      storage: device.storage,
      custom_model: device.custom_model,

      brand: device.brand,
      warranty_status: device.warranty_status ?? false, // Default to false if undefined
      warranty_expiary_date: device.warranty_expiary_date,
      ownership: device.ownership,
      purchase_order: device.purchase_order,
      purchase_value: Number(device.purchase_value), // Ensure it's a number
      os: device.os,
      device_purchase_date: device.device_purchase_date || null,
      image: device.image,
      addressId: device.addressId,
      ...(device.userId !== "" && { userId: device.userId }),
    };

    // console.log("Prepared Device Data:", deviceData);

    // API call
    const sess = await getSession();

    // Flatten the payload
    const payload = {
      ...deviceData,
      orgId: sess?.user.orgId,
    };

    // console.log('Payload to be sent:', payload);

    const res = await callAPIWithToken<Device>(
      "https://api.edify.club/edifybackend/v1/devices",
      "POST",
      payload
    );

    console.log("API Response:", res);

    return res.data;
  } catch (error) {
    // Ensure the error is typed as AxiosError
    if (error instanceof AxiosError) {
      // Handle AxiosError specifically
      if (error.response && error.response.status === 401) {
        redirect("/login");
      } else {
        // Throw a new error with the message from AxiosError
        throw new Error(error.message || "Failed to create device");
      }
    } else {
      // Handle any other unexpected errors
      throw new Error("An unexpected error occurred");
    }
  }
};

//Getting Devices
export async function getAllDevices(): Promise<getAllDevicesProp> {
  try {
    const res = await callAPIWithToken<getAllDevicesProp>(
      "https://api.edify.club/edifybackend/v1/devices",
      "GET"
    );

    // Validate response structure
    if (!res.data || !Array.isArray(res.data)) {
      throw new Error("Invalid API response structure");
    }

    return res.data;
  } catch (e) {
    // Optionally, handle specific error scenarios
    throw new Error((e as AxiosError).message || "Failed to fetch devices");
  }
}

//Update Devices
export const updateDevice = async (
  deviceId: string,
  deviceData: Device
): Promise<Device | undefined> => {
  try {
    // API call
    const res = await callAPIWithToken<Device>(
      `https://api.edify.club/edifybackend/v1/devices/${deviceId}`,
      "PUT",
      deviceData
    );

    return res.data;
  } catch (error) {
    console.error("Error updating device:", error);
    throw new Error((error as AxiosError).message);
  }
};

//DELETE Devices
export async function deleteDevice(
  deviceId: string
): Promise<Device | undefined> {
  try {
    const deleletedDevice = await callAPIWithToken<Device>(
      `https://api.edify.club/edifybackend/v1/devices/${deviceId}`,
      "DELETE"
    );

    return deleletedDevice.data;
  } catch (e: any) {
    throw e;
  }
}

//Upload bulk device

export const bulkUploadDevices = async (
  formData: FormData
): Promise<Device> => {
  try {
    // Call the API with multipart/form-data
    const response = await callAPIWithToken<Device>(
      "https://api.edify.club/edifybackend/v1/devices/upload",
      "POST",
      formData,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in bulk uploading devices:", error);
    throw error;
  }
};

//Search api
export async function deviceSearchAPI(query: string): Promise<DeviceResponse> {
  try {
    const url = `https://api.edify.club/edifybackend/v1/devices/search?query=${query}`;
    const res = await callAPIWithToken<DeviceResponse>(url, "GET");

    return res.data;
  } catch (error) {
    console.error("Error searching:", error);
    throw new Error((error as AxiosError).message);
  }
}

// Get Device by ID
export const getDeviceById = async (deviceId: string): Promise<Device> => {
  try {
    // Make the GET request to fetch a single device by ID
    const res = await callAPIWithToken<Device>(
      `https://api.edify.club/edifybackend/v1/devices/${deviceId}`,
      "GET"
    );

    // Return the fetched device
    return res.data;
  } catch (error) {
    console.error("Error fetching device by ID:", error);
    throw new Error((error as AxiosError).message);
  }
};

// Getting Devices by User ID

export const getDevicesByUserId = async (): Promise<getAllDevicesProp> => {
  const sess = await getSession(); // Fetch session details

  try {
    if (sess?.user && sess.user.id) {
      // Make the GET request to fetch Devices of user ID
      const res = await callAPIWithToken<getAllDevicesProp>(
        `https://api.edify.club/edifybackend/v1/devices/userDetails`,
        "GET"
      );

      console.log(res);

      // Return the list of Devices
      return res.data;
    } else {
      throw new Error("No user session found");
    }
  } catch (error) {
    console.error("Error fetching Devices of user ID:", error);
    throw new Error((error as AxiosError).message);
  }
};

//pagination
export const paginatedDevices = async (
  page: string
): Promise<DeviceResponse> => {
  try {
    const res = await callAPIWithToken<DeviceResponse>(
      `https://api.edify.club/edifybackend/v1/devices/paginated?page=${page}`,
      "GET"
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};
