import { Device } from "./deviceActions";
import { callAPIWithToken } from "./helper";
import { Issues } from "./issueActions";
import { User } from "./userActions";
import { cache } from "react";

export interface FilterApiParams {
  filters?: any[][];
  fields?: string[];
  searchQuery?: string;
  pageLength?: number;
}

export const devicesFilterFields = [
  { label: "Device Name", value: "device_name" },
  { label: "Device Type", value: "device_type" },
  { label: "OS", value: "os" },
  { label: "Brand", value: "brand" },
  { label: "Serial No", value: "serial_no" },
  { label: "Assigned To", value: "userName" },
  { label: "RAM", value: "ram" },
  { label: "Warranty Expiry Date", value: "warranty_expiary_date" },
  { label: "Price", value: "purchase_value" },
  { label: "Warranty Status", value: "warranty_status" },
  { label: "Storage", value: "storage" },
  // ...rest of the fields
];

export const devicesFields = [
  "device_name",
  "device_type",
  "os",
  "image",
  "brand",
  "custom_model",
  "asset_serial_no",
  "ownership",
  "processor",
  "purchase_order",
  "purchase_value",
  "userName",
  "ram",
  "userId",
  "serial_no",
  "deleted_at",
  "storage",
  "warranty_expiary_date",
  "device_purchase_date",
  "payable",
  "assigned_at",
  "warranty_status",
];

export const usersFields = [
  "first_name",
  "last_name",
  "gender",
  "marital_status",
  "physically_handicapped",
  "about",
  "interests_and_hobbies",
  "role",
  "designation",
  "employment_type",
  "onboarding_date",
  "reporting_manager",
  "email",
  "phone",
  "deleted_at",
];

export const deletedUsers = cache(async function ({
  filters = [],
  fields = usersFields,
  searchQuery = "",
  pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
      isDeleted: true,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<User[]>(apiUrl, "POST", payload);
    // console.log(apiUrl, payload);
    // Check if response has data
    if (res && res?.data) {
      // console.log('Filtered Data:', res.data);
      return res?.data; // Return the filtered data
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    // Throw more specific error message
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter Users. Please try again later."
    );
  }
});

export const filterUsers = cache(async function ({
  filters = [],
  fields = usersFields,
  searchQuery = "",
  pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<User[]>(apiUrl, "POST", payload);
    // console.log(apiUrl, payload);
    // Check if response has data
    if (res && res?.data) {
      // console.log('Filtered Data:', res.data);
      return res?.data; // Return the filtered data
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    // Throw more specific error message
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter Users. Please try again later."
    );
  }
});
export const activeUsers = cache(async function ({
  filters = [],
  fields = usersFields,
  searchQuery = "",
  pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<User[]>(apiUrl, "POST", payload);
    // console.log(apiUrl, payload);
    // Check if response has data
    if (res && res?.data) {
      // console.log('Filtered Data:', res.data);
      return res?.data; // Return the filtered data
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    // Throw more specific error message
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter Users. Please try again later."
    );
  }
});
export const inActiveUsers = cache(async function ({
  filters = [],
  fields = usersFields,
  searchQuery = "",
  pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<User[]>(apiUrl, "POST", payload);
    // console.log(apiUrl, payload);
    // Check if response has data
    if (res && res?.data) {
      // console.log('Filtered Data:', res.data);
      return res?.data; // Return the filtered data
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    // Throw more specific error message
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter Users. Please try again later."
    );
  }
});

export const filterDevice = cache(async function ({
  filters = [],
  fields = devicesFields,
  searchQuery = "",
  pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Device[]>(apiUrl, "POST", payload);

    // Check and return response data
    if (res && res?.data) {
      console.log("filter Triggered");
      return res?.data;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter devices. Please try again later."
    );
  }
});

export const assignedAssets = cache(async function ({
  filters = [],
  fields = devicesFields,
  searchQuery = "",
  pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Device[]>(apiUrl, "POST", payload);

    // Check and return response data
    if (res && res?.data) {
      console.log("AssignedAssets Triggered");
      return res?.data;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter devices. Please try again later."
    );
  }
});

export const unAssignedAssets = cache(async function ({
  filters = [],
  fields = devicesFields,
  searchQuery = "",
  pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Device[]>(apiUrl, "POST", payload);

    // Check and return response data
    if (res && res?.data) {
      console.log("unAssignedAssets Triggered");
      return res?.data;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter devices. Please try again later."
    );
  }
});

export const inActiveAssets = cache(async function ({
  filters = [],
  fields = devicesFields,
  searchQuery = "",
  pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Device[]>(apiUrl, "POST", payload);

    // Check and return response data
    if (res && res?.data) {
      console.log("inactive Assets Triggered");
      return res?.data;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter devices. Please try again later."
    );
  }
});

export const deletedDevices = cache(async function ({
  filters = [],
  fields = devicesFields,
  searchQuery = "",
  pageLength = 20,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
      isDeleted: true,
    };

    console.log(payload);
    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Device[]>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
      // console.log('Filtered Data:', res.data);
      return res?.data; // Return the filtered data
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    // Throw more specific error message
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter devices. Please try again later."
    );
  }
});

export const issueFields = [
  "description",
  "title",
  "status",
  "createdAt",
  "updatedAt",
  "priority",
  "userName",
  "serial_no",
  "email",
];

export const filterIssues = cache(async function ({
  filters = [],
  fields = issueFields,
  searchQuery = "",
  pageLength = 100000,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page_length: pageLength,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/issue/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Issues[]>(apiUrl, "POST", payload);
    // console.log(apiUrl, payload);
    // Check if response has data
    if (res && res?.data) {
      // console.log('Filtered Data:', res.data);
      return res?.data; // Return the filtered data
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    // Throw more specific error message
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter issues. Please try again later."
    );
  }
});
