"use server";
import { redirect } from "next/navigation";
import { callAPIWithToken, getSession } from "./helper";
import { AxiosError } from "axios";
import { cache } from "react";
import { BASEURL } from "./main";

export type StoreDevice = {
  _id?: string;
  team?: string;
  teams?: string;
  createdAt?: string;
  qty?: number | null;
  updatedAt?: string;
  device_name: string;
  device_type: string;
  asset_serial_no: string | null;
  serial_no: string | null;
  ram: string | null;
  processor: string | null;
  storage: string[] | null;
  custom_model: string | null;
  brand: string | null;
  warranty_status?: boolean;
  warranty_expiary_date?: string | null; // Assuming this is a date string
  ownership?: string | null;
  purchase_order?: string | null;
  purchase_value?: number | null;
  payable?: number | null;
  os?: string | null;
  image?: { url: string; color: string }[] | null; // Array of image objects
  invoice?: string | null;
  deleted_at?: string | null; // Assuming this is a date string
  device_purchase_date?: string | null; // Assuming this is a date string
  assigned_at?: string | null; // Assuming this is a date string
  userName?: string | null;
  email?: string | null;
  userId?: string | null;
  city?: string | null;
  addressId?: string | null;
  perfectFor?: { title?: string }[] | null; // Array of objects with `title` property
  deviceFeatures?:
    | {
        title?: string;
        features?: { title: string; value: string }[];
      }[]
    | null; // Array of feature groups with titles and feature lists
  orgId?: string | null;
  ratings?: unknown[]; // Could specify a type if known
  overallReviews?: number | null;
  overallRating?: number | null;
  ratingDetails?: {
    stars?: number;
    percentage?: number;
    reviewsCount?: number;
  }[];
  reviews?: {
    _id?: string; // MongoDB ObjectId, typically a string
    comment?: string;
    rating?: number; // Assuming ratings are numbers (e.g., 1 to 5)
    createdAt?: string; // ISO date string
    updatedAt?: string; // ISO date string
    image?: string; // Path or filename for the image
    role?: number; // Assuming roles are represented as numbers
    name?: string;
  }[];
  latest_release?: boolean;
  is_trending?: boolean;
  is_charger_provided?: boolean;
  description?: string;
  config?: { key: string; value: string }[];
  device_condition?: string;
};

//Device type
export type Device = StoreDevice;
export type getAllDevicesProp = Device[];
export type StoreDevicesRes = StoreDevice[];
export type DeviceResponse = {
  devices: StoreDevice[]; // Changed from 'devices' to 'documents'
  total_pages: number;
  current_page: number;
  total: number;
};

// Creating Devices
export const createDevices = async (
  device: Device
): Promise<Device | undefined> => {
  try {
    // Prepare device data with proper types
    const deviceData = {
      device_name: device?.device_name || "Default",
      device_type: device?.device_type,
      device_condition: device?.device_condition,
      asset_serial_no: device?.asset_serial_no || null,
      serial_no: device?.serial_no,
      ram: device?.ram,
      processor: device?.processor,
      storage: device?.storage,
      custom_model: device?.custom_model,
      brand: device?.brand,
      warranty_status: device?.warranty_status ?? false, // Default to false if undefined
      warranty_expiary_date: device?.warranty_expiary_date,
      ownership: device?.ownership,
      purchase_order: device?.purchase_order,
      purchase_value: Number(device?.purchase_value), // Ensure it's a number
      os: device?.os,
      device_purchase_date: device?.device_purchase_date || null,
      image: [
        {
          url: "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png",
        },
      ],
    };

    if (device?.userId && device.userId.length > 0) {
      // @ts-ignore
      deviceData.userId = device?.userId;
    }

    // API call
    const sess = await getSession();

    // Flatten the payload
    const payload = {
      ...deviceData,
      orgId: sess?.user?.user?.orgId?._id,
    };

    const res = await callAPIWithToken<Device>(
      `${BASEURL}/edifybackend/v1/devices`,
      "POST",
      payload
    );

    return res?.data;
  } catch (error: any) {
    // Ensure the error is typed as AxiosError
    if (error instanceof AxiosError) {
      // Handle AxiosError specifically
      if (error?.response && error?.response?.status === 401) {
        redirect("/login");
      } else {
        // Throw a new error with the message from AxiosError
        throw new Error(error?.message || "Failed to create device");
      }
    } else {
      // Handle any other unexpected errors
      throw new Error(error.message);
    }
  }
};

//Getting Devices

export const getAllDevices = cache(
  async function (): Promise<getAllDevicesProp> {
    try {
      const res = await callAPIWithToken<getAllDevicesProp>(
        `${BASEURL}/edifybackend/v1/devices`,
        "GET"
      );

      // Validate response structure
      if (!res?.data || !Array.isArray(res?.data)) {
        throw new Error("Invalid API response structure");
      }

      return res?.data;
    } catch (e) {
      // Optionally, handle specific error scenarios
      throw new Error((e as AxiosError)?.message || "Failed to fetch devices");
    }
  }
);

//Update Devices
export const updateDevice = async (
  deviceId: string,
  deviceData: Device
): Promise<Device | undefined> => {
  try {
    // API call
    const res = await callAPIWithToken<Device>(
      `${BASEURL}/edifybackend/v1/devices/${deviceId}`,
      "PUT",
      deviceData
    );

    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
};

//DELETE Devices
export async function deleteDevice(
  deviceId: string
): Promise<Device | undefined> {
  try {
    const deleletedDevice = await callAPIWithToken<Device>(
      `${BASEURL}/edifybackend/v1/devices/${deviceId}`,
      "DELETE"
    );

    return deleletedDevice?.data;
  } catch (e: any) {
    throw e;
  }
}

// Permanent Delete Device

export async function permanentDeleteDevice(
  deviceId: string
): Promise<Device | undefined> {
  try {
    const deleletedDevice = await callAPIWithToken<Device>(
      `${BASEURL}/edifybackend/v1/devices/bulk-delete?permanent=true`,
      "DELETE"
    );

    return deleletedDevice?.data;
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
      `${BASEURL}/edifybackend/v1/devices/upload`,
      "POST",
      formData,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const bulkDeleteAssets = async (
  deviceIds: string[],
  type: string
): Promise<any> => {
  try {
    const response = await callAPIWithToken(
      type !== "soft"
        ? `${BASEURL}/edifybackend/v1/devices/bulk-delete?permanent=true`
        : `${BASEURL}/edifybackend/v1/devices/bulk-delete`,
      "POST",
      { deviceIds },
      {
        "Content-Type": "application/json",
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const bulkAssetsUnassign = async (
  deviceIds: string[],
): Promise<any> => {
  try {
    const response = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/devices/Bulk-unassign`,
      "PATCH",
      { deviceIds },
      {
        "Content-Type": "application/json",
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//Search api
export async function deviceSearchAPI(query: string): Promise<DeviceResponse> {
  try {
    const url = `${BASEURL}/edifybackend/v1/devices/search?query=${query}`;
    const res = await callAPIWithToken<DeviceResponse>(url, "GET");

    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
}

// Get Device by ID
// export const getDeviceById = cache(async (deviceId: string): Promise<any> => {
//   try {
//     // Make the GET request to fetch a single device by ID
//     const res = await callAPIWithToken<Device>(
//       `${BASEURL}/edifybackend/v1/devices/${deviceId}`,
//       "GET"
//     );

//     // Return the fetched device
//     return res?.data;
//   } catch (error) {
//     throw new Error((error as AxiosError)?.message);
//   }
// });

// Get Device by ID
export const getDeviceById = cache(async (deviceId: string): Promise<any> => {
  try {
    // Make the GET request to fetch a single device by ID
    const res = await callAPIWithToken<Device>(
      `${BASEURL}/edifybackend/v1/devices/${deviceId}`,
      "GET"
    );

    // Return the fetched device
    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
});

// Getting Devices by User ID

export const getDevicesByUserId = cache(
  async (): Promise<getAllDevicesProp> => {
    const sess = await getSession(); // Fetch session details

    try {
      if (sess?.user && sess?.user?.user.userId) {
        // Make the GET request to fetch Devices of user ID
        const res = await callAPIWithToken<getAllDevicesProp>(
          `${BASEURL}/edifybackend/v1/devices/userDetails`,
          "GET"
        );

        // Return the list of Devices
        return res.data;
      } else {
        throw new Error("No user session found");
      }
    } catch (error) {
      throw new Error((error as AxiosError)?.message);
    }
  }
);

//pagination
export const paginatedDevices = async (page: string): Promise<any> => {
  try {
    const res = await callAPIWithToken<DeviceResponse>(
      `${BASEURL}/edifybackend/v1/devices/paginated?page=${page}`,
      "GET"
    );
    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
};

// SearchInput initial Fetch
export const fetchDevices = cache(async function (): Promise<any> {
  try {
    const requestBody = {
      fields: [
        "device_name",
        "custom_model",
        "serial_no",
        "ram",
        "storage",
        "image",
      ],
      filters: [],
      page: 1,
      pageLimit: 100000,
    };

    const res = await callAPIWithToken<DeviceResponse>(
      `${BASEURL}/edifybackend/v1/devices/filter`,
      "POST", // Changed to POST as the new API requires it
      requestBody // Pass the request body
    );

    return res?.data?.devices;
  } catch (e) {
    throw new Error("Failed to fetch devices");
  }
});

export const fetchUnassignedDevices = cache(async function (): Promise<any> {
  try {
    const requestBody = {
      fields: [
        "device_name",
        "custom_model",
        "serial_no",
        "ram",
        "storage",
        "image",
      ],
      filters: [],
      // ["userId", "null"]
      page: 1,
      pageLimit: 1000000,
    };

    const res = await callAPIWithToken<DeviceResponse>(
      `${BASEURL}/edifybackend/v1/devices/filter`,
      "POST", // Changed to POST as the new API requires it
      requestBody // Pass the request body
    );

    return res?.data?.devices;
  } catch (e) {
    throw new Error("Failed to fetch devices");
  }
});

// SearchInput Search

export async function searchDevices(searchQuery: string): Promise<any> {
  try {
    const requestBody = {
      fields: [
        "device_name",
        "custom_model",
        "serial_no",
        "ram",
        "storage",
        "image",
      ],
      filters: [], // You can add filters here as per requirement
      page: 1,
      pageLimit: 10, // Number of users to fetch per page
    };

    const apiUrl = `${BASEURL}/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    const res = await callAPIWithToken<DeviceResponse>(
      apiUrl,
      "POST", // Changed to POST as the new API requires it
      requestBody // Pass the request body
    );

    return res?.data?.devices;
  } catch (e) {
    throw new Error("Failed to fetch devices");
  }
}
