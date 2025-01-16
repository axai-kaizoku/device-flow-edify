import { Device, StoreDevice } from "./deviceActions";
import { callAPIWithToken } from "./helper";
import { Issues } from "./issueActions";
import { User, UserResponse } from "./userActions";
import { cache } from "react";

export interface FilterApiParams {
  filters?: any[][];
  fields?: string[];
  searchQuery?: string;
  pageLength?: number;
  pageLimit?: number;
  page?: number;
  isDeleted?: boolean;
}
export interface activeFilterApiParams {
  filters?: any[][];
  fields?: string[];
  searchQuery?: string;
  pageLimit?: number;
  page?: number;
  isDeleted?: boolean;
}
export interface inactiveFilterApiParams {
  filters?: any[][];
  fields?: string[];
  searchQuery?: string;
  pageLimit?: number;
  page?: number;
  isDeleted?: boolean;
}

export interface IssueResponse {
  issues: Issues[];
  total_pages?: number;
  current_page?: number;
  total?: number;
  per_page?: number;
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
  "device_condition",
  "warranty_expiary_date",
  "device_purchase_date",
  "payable",

  "assigned_at",
  "warranty_status",
  // Fields from the db model that were missing
  "orgId",
  "addressId",
  "description",
  "invoice",
  "perfectFor",
  "deviceFeatures",
  "is_trending",
  "latest_release",
  "is_charger_provided",
  "config",
];

export const userFilterFields = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Gender", value: "gender" },
  { label: "Employement type", value: "employment_type" },
  { label: "Role", value: "role" },
  { label: "Designation", value: "designation" },
  { label: "Reporting Manager", value: "reporting_manager" },
  { label: "Onboarding date", value: "onboarding_date" },
];
export const usersFields = [
  "first_name",
  "last_name",
  "gender",
  "marital_status",
  "physically_handicapped",
  "about",
  "image",
  "interests_and_hobbies",
  "role",
  "image",
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
    // Check if response has data
    if (res && res?.data) {
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
  page = 1,
  pageLimit = 5,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page,
      pageLimit,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<UserResponse>(apiUrl, "POST", payload);

    if (res && res?.data) {
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
  page = 1,
  pageLimit = 5,
  isDeleted = false,
}: activeFilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page,
      pageLimit,
      isDeleted,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<UserResponse>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
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
  page = 1,
  pageLimit = 5,
  isDeleted = true,
}: inactiveFilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page,
      pageLimit,
      isDeleted,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<UserResponse>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
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
  pageLength = 5,
  page = 1,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      pageLimit: pageLength,
      page,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Device[]>(apiUrl, "POST", payload);

    // Check and return response data
    if (res && res?.data) {
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
  page = 1,
  pageLimit = 5,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page,
      pageLimit,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<StoreDevice[]>(apiUrl, "POST", payload);

    // Check and return response data
    console.log(res);
    if (res && res?.data) {
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
  page = 1,
  pageLimit = 5,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page: page,
      pageLimit,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<StoreDevice[]>(apiUrl, "POST", payload);

    // Check and return response data
    if (res && res?.data) {
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
  page = 1,
  pageLimit = 5,
  isDeleted = true,
}: inactiveFilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      page,
      pageLimit,
      isDeleted,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<StoreDevice[]>(apiUrl, "POST", payload);

    // Check and return response data
    if (res && res?.data) {
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

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Device[]>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
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
  "issueId",
  "status",
  "createdAt",
  "updatedAt",
  "priority",
  "userName",
  "serial_no",
  "email",
];

export const openIssues = cache(async function ({
  filters = [["status", "Equals", "Open"]],
  fields = issueFields,
  searchQuery = "",
  page = 1,
  pageLimit = 5,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      pageLimit,
      page,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/issue/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<IssueResponse>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
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

export const closedIssues = cache(async function ({
  filters = [["status", "Equals", "Closed"]],
  fields = issueFields,
  searchQuery = "",
  page = 1,
  pageLimit = 5,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      pageLimit,
      page,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/issue/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<IssueResponse>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
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

export const filterIssues = cache(async function ({
  filters = [["status", "Equals", "Open"]],
  fields = issueFields,
  searchQuery = "",
  pageLimit = 10000,
  page = 1,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      pageLimit,
      page,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/issue/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<IssueResponse>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
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
