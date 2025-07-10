"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
import { callAPIWithToken, getSession } from "./helper";
import { Team } from "./teamActions";
import { Device } from "./deviceActions";
import { cache } from "react";
import { usersFields } from "./filterActions";
import { IntegrationType } from "./integrationActions";
import { BASEURL } from "./main";

const baseUrl = BASEURL;
// const baseUrl = "https://1c55-34-47-179-100.ngrok-free.app";

type Address = {
  address: string;
  phone: number;
  is_primary: boolean;
  image: string;
  _id: string;
};

type Org = {
  deleted_at: null;
  _id?: string;
  name: string;
  legal_entity_name: string;
  office_address: Address[];
  logo: string;
  __v: number;
  email: string;
};

type Manager = {
  deleted_at: null;
  _id: string;
  image: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phone: string;
  orgId: string;
  gender?: string;
  employment_type: string;
  created_at: string;
  __v: number;
  date_of_birth: string;
  onboarding_date: string;
  reporting_manager: Manager | null;
};
export type Ticket = {
  _id?: string;
  category?: string;
  code?: string;
  severity?: string;
  OpenedBy?: string;
  status?: string;
};
export type NewUserResponse = {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  orgId?: string;
  tickets?: Ticket[];
  role?: number;
  onboarding_date?: string;
  deleted_at?: string | null;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  teamId?: {
    _id: string;
    title: string;
    employees_count?: string | number;
    team_code?: string;
  };
  date_of_birth?: string;
  designation?: string;
  employment_type?: string;
  gender?: string;
  image?: string;
  reporting_manager?: {
    _id?: string;
    first_name?: string;

    date_of_birth?: string;
    gender?: string;
    email?: string;
    phone?: string;
    orgId?: string;
    role?: number;
    reporting_manager?: string;
    employment_type?: string;
    onboarding_date?: string;
    deleted_at?: string | null;
    designation?: string;
    image?: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    teamId?: string;
  };
  team?: {
    _id?: string;
    title?: string;
    description?: string;
    image?: string;
    orgId?: string;
    deleted_at?: string | null;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    team_code?: string;
    userCount?: number;
  };
  devices?: {
    _id?: string;
    userId?: string;
    orgId?: string | null;
    addressId?: string | null;
    device_name?: string;
    asset_serial_no?: string | null;
    serial_no?: string;
    device_type?: string;
    ram?: string;
    processor?: string;
    storage?: string[];
    custom_model?: string;
    brand?: string;
    warranty_status?: boolean;
    warranty_expiary_date?: string;
    device_purchase_date?: string;
    purchase_value?: number;
    payable?: number;
    os?: string;
    is_trending?: boolean;
    latest_release?: boolean;
    deleted_at?: string | null;
    assigned_at?: string;
    image?: {
      url?: string;
      _id?: string;
    }[];
    device_condition?: string;
    perfectFor?: string[];
    deviceFeatures?: string[];
    config?: string[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    qty?: number;
    isBestDeal?: boolean;
    isBestSeller?: boolean;
    ownership?: string;
    purchase_order?: string;
    issues?: {
      _id?: string;
      userId?: string;
      orgId?: string;
      deviceId?: string;
      title?: string;
      images?: string[];
      status?: string;
      description?: string;
      priority?: string;
      deleted_at?: string | null;
      closed_on?: string | null;
      createdAt?: string;
      issueId?: string;
      updatedAt?: string;
      __v?: number;
    }[];
  }[];
  subscriptions?: {
    id?: string;
    platform?: string;
    status?: string;
    integratedAt?: string;
    image?: string;
    description?: string;
    url?: string;
    price?: number;
  }[];
};

export type User = {
  deleted_at?: string | null;
  name?: string;
  _id?: string;
  integrations?: IntegrationType[];
  subscriptions?: IntegrationType[];
  missingIntegration?: IntegrationType[];
  totalCostPerUser?: number;
  first_name?: string;
  offerLetter?: string;
  last_name?: string;
  gender?: string;
  marital_status?: string;
  physically_handicapped?: string;
  about?: string;
  interests_and_hobbies?: string;
  password?: string;
  teamId?: {
    _id?: string;
    title?: string;
    team_code?: string;
  };
  email?: string;
  phone?: string;
  orgId?: Org;
  role?: number;
  designation?: string;
  image?: string;
  team?: [{ _id: string; title: string; team_code?: string }];
  employment_type?: string;
  created_at?: string;
  __v?: number;
  date_of_birth?: string;
  onboarding_date?: string;
  reporting_manager?: Manager;
  devices?: number | Device[];
  emp_id?: string;
};

export type CreateUserArgs = {
  first_name?: string;
  last_name?: string;
  offerLetter?: string;
  gender?: string;
  marital_status?: string;
  physically_handicapped?: string;
  about?: string;
  interests_and_hobbies?: string;
  _id?: string;
  email?: string;
  deleted_at?: string | null;
  phone?: string;
  role?: number;
  designation?: string;
  image?: string;
  team?: [{ _id?: string; title?: string; team_code?: string }];
  teamId?: Team;
  employment_type?: string;
  date_of_birth?: string;
  onboarding_date?: string;
  reporting_manager?: string | Manager;
  emp_id?: string;
  orgId?: string | Org | null;
};

export type Reportee = {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  gender?: string;
  designation?: string;
  role: number | string;
  reporteeCount?: number;
  reportingTo?: string | null;
  reportees?: Reportee[];
};

export type HierarchyUser = {
  _id?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  email?: string;
  image?: string;
  designation?: string;
  reporteeCount?: number;
  reportingTo?: string | null;
  reportees?: Reportee[];
};

export type HierarchyResponse = HierarchyUser[];

export type UserResponse = {
  users: User[];
  total_pages?: number;
  current_page?: number;
  total?: number;
  per_page?: number;
};

export type newAllUserResponse = {
  users: UserResponse;
};

// export const fetchManager = async (token: string): Promise<any> => {
//   try {
//     const requestBody = {
//       fields: [
//         "first_name",
//         "email",
//         "designation",
//         "employment_type",
//         "image",
//       ],
//       filters: [],
//       page: 1,
//       pageLimit: 1000,
//     };

//     const res: AxiosResponse = await axios({
//       url: `${baseUrl}/edifybackend/v1/user/filter`,
//       method: "POST",
//       data: { requestBody },

//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return res.data.users;
//   } catch (e) {
//     throw new Error("Failed to fetch users");
//   }
// };

// export async function searchManager(
//   searchQuery: string,
//   token: string
// ): Promise<any> {
//   try {
//     const requestBody = {
//       fields: [
//         "first_name",
//         "email",
//         "designation",
//         "employment_type",
//         "image",
//       ], // Specify fields to be fetched
//       filters: [], // You can add filters here as per requirement
//       page: 1,
//       pageLimit: 20, // Number of users to fetch per page
//     };
//     const apiUrl = `${baseUrl}/edifybackend/v1/user/filter${
//       searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
//     }`;

//     const res: AxiosResponse = await axios({
//       url: apiUrl,
//       method: "POST",
//       data: { requestBody },

//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return res?.data?.users;
//   } catch (e) {
//     throw new Error("Failed to fetch users");
//   }
// }

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const requestBody = {
      fields: [
        "first_name",
        "email",
        "designation",
        "role",
        "employment_type",
        "image",
      ], // Specify fields to be fetched
      filters: [], // You can add filters here as per requirement
      page: 1,
      pageLimit: 100000,
      isDeleted: false,
    };

    const res = await callAPIWithToken<UserResponse>(
      `${baseUrl}/edifybackend/v1/user/filter`,
      "POST", // Changed to POST as the new API requires it
      requestBody // Pass the request body
    );
    return res.data.users;
  } catch (e) {
    throw new Error("Failed to fetch users");
  }
};

export async function createUser(userData: CreateUserArgs): Promise<User> {
  try {
    const sess = await getSession();
    const user = {
      ...userData,
      // password: "winuall123",
      orgId: sess?.user?.user?.orgId?._id,
    };

    const res = await callAPIWithToken<User>(
      `${baseUrl}/edifybackend/v1/user`, // API endpoint
      "POST", // HTTP method
      user
    );
    return res?.data;
  } catch (e) {
    if (e instanceof AxiosError && e?.response) {
      throw new Error(e?.response?.data?.message || "Failed to create user");
    }
    throw new Error((e as AxiosError)?.message);
  }
}

export const getUserById = async (userId: string) => {
  try {
    const res = await callAPIWithToken<NewUserResponse>(
      `${baseUrl}/edifybackend/v1/user/${userId}`, // API endpoint
      "GET", // HTTP method
      null
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to fetch user");
  }
};

export async function updateUser(
  id: string,
  userData: CreateUserArgs
): Promise<User> {
  try {
    const res = await callAPIWithToken<User>(
      `${baseUrl}/edifybackend/v1/user/${id}`, // API endpoint
      "PUT", // HTTP method
      userData
    );
    return res?.data;
  } catch (e: any) {
    if (e?.message?.includes("E11000 duplicate key error")) {
      // Customize the error response for duplicate email
      throw new Error("A user with this Email or Phone already exists.");
    }
    // Default error message
    throw new Error("Failed to Update User. Please try again.");
  }
}

interface BulkMoveUsersPayload {
  newTeamId: string;
  userIds: string[];
}

export async function bulkMoveUsers(
  payload: BulkMoveUsersPayload
): Promise<any> {
  try {
    const res = await callAPIWithToken<any>(
      `${baseUrl}/edifybackend/v1/teams/bulkTeamUpdate`, // API endpoint
      "PATCH", // HTTP method
      payload
    );
    return res?.data;
  } catch (e: any) {
    if (e?.message?.includes("E11000 duplicate key error")) {
      // Customize the error response for duplicate email
      throw new Error("A user with this Email or Phone already exists.");
    }
    // Default error message
    throw new Error("Failed to Update User. Please try again.");
  }
}

export async function deleteUser<User>(userId: string) {
  try {
    const res = await callAPIWithToken<User>(
      `${baseUrl}/edifybackend/v1/user/${userId}`, // API endpoint
      "DELETE",
      {}
    );
    return res?.data;
  } catch (e: any) {
    throw e;
  }
}

// Permanent delete user

export async function permanentDeleteUser<User>(userId: string) {
  try {
    const res = await callAPIWithToken<User>(
      `${baseUrl}/edifybackend/v1/user/${userId}?permanent=true`,
      "DELETE",
      {}
    );
    return res?.data;
  } catch (e: any) {
    throw e;
  }
}

export const bulkUploadUsers = async (formData: FormData): Promise<User> => {
  try {
    // Call the API with multipart/form-data
    const response = await callAPIWithToken<User>(
      `${baseUrl}/edifybackend/v1/user/bulk-upload`,
      "POST",
      formData,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const bulkDeleteUsers = async (
  userIds: string[],
  type: string
): Promise<any> => {
  try {
    const response = await callAPIWithToken(
      type !== "soft"
        ? `${baseUrl}/edifybackend/v1/user/bulk-delete?permanent=true`
        : `${baseUrl}/edifybackend/v1/user/bulk-delete`,
      "POST",
      { userIds },
      {
        "Content-Type": "application/json",
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export type UsersTeamResponse = {
  users: User[];
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
};
export const getUsersByTeamId = async (
  teamId: string,
  page: number
): Promise<UsersTeamResponse> => {
  try {
    const sess = await getSession();
    const res = await callAPIWithToken<UsersTeamResponse>(
      `${baseUrl}/edifybackend/v1/user/teams`, // API endpoint
      "POST", // HTTP method
      {
        teamId,
        orgId: sess?.user.user.orgId?._id ?? "",
        filters: [],
        fields: usersFields,
        pageLimit: 10000,
        page: page ? page : 1,
      }
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to fetch user");
  }
};
