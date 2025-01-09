"use server";

import { AxiosError } from "axios";
import { callAPIWithToken, getSession } from "./helper";
import { Team } from "./teamActions";
import { Device } from "./deviceActions";
import { cache } from "react";
import { usersFields } from "./filterActions";

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
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phone: string;
  orgId: string;
  employment_type: string;
  created_at: string;
  __v: number;
  date_of_birth: string;
  onboarding_date: string;
  reporting_manager: Manager | null;
};

export type User = {
  deleted_at?: null;
  _id?: string;
  first_name?: string;
  offerLetter?: string;
  last_name?: string;
  gender?: string;
  marital_status?: string;
  physically_handicapped?: string;
  about?: string;
  interests_and_hobbies?: string;
  password?: string;
  email?: string;
  phone?: string;
  orgId?: Org;
  role?: number;
  designation?: string;
  image?: string;
  teamId?: Team;
  employment_type?: string;
  created_at?: string;
  __v?: number;
  date_of_birth?: string;
  onboarding_date?: string;
  reporting_manager?: Manager;
  devices?: Device[];
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
  teamId?: string | null;
  employment_type?: string;
  date_of_birth?: string;
  onboarding_date?: string;
  reporting_manager?: string;
  orgId?: string | null;
};

export type Reportee = {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
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
  email?: string;
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

export const fetchUsers = cache(async function (): Promise<UserResponse> {
  try {
    const requestBody = {
      fields: [
        "first_name",
        "email",
        "designation",
        "employment_type",
        "image",
      ], // Specify fields to be fetched
      filters: [], // You can add filters here as per requirement
      page: 1,
      pageLimit: 5,
    };

    const res = await callAPIWithToken<UserResponse>(
      "https://api.edify.club/edifybackend/v1/user/filter",
      "POST", // Changed to POST as the new API requires it
      requestBody // Pass the request body
    );

    // console.log("fetchUssrs" + res.data.users[0].designation);
    return res?.data?.users;
  } catch (e) {
    throw new Error("Failed to fetch users");
  }
});

export async function searchUsers(searchQuery: string): Promise<UserResponse> {
  try {
    const requestBody = {
      fields: [
        "first_name",
        "email",
        "designation",
        "employment_type",
        "image",
      ], // Specify fields to be fetched
      filters: [], // You can add filters here as per requirement
      page: 1,
      pageLimit: 10, // Number of users to fetch per page
    };
    // console.log("searchUsers" + requestBody);
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    const res = await callAPIWithToken<UserResponse>(
      apiUrl,
      "POST", // Changed to POST as the new API requires it
      requestBody // Pass the request body
    );
    // console.log("searchUsers" + res.data.users);
    return res?.data?.users;
  } catch (e) {
    throw new Error("Failed to fetch users");
  }
}

export async function createUser(userData: CreateUserArgs): Promise<User> {
  try {
    const sess = await getSession();
    const user = {
      ...userData,
      password: "winuall123",
      orgId: sess?.user?.user?.orgId?._id,
    };

    const res = await callAPIWithToken<User>(
      "https://api.edify.club/edifybackend/v1/user", // API endpoint
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

export const getUserById = cache(async function <User>(userId: string) {
  try {
    const res = await callAPIWithToken<User>(
      `https://api.edify.club/edifybackend/v1/user/${userId}`, // API endpoint
      "GET", // HTTP method
      null
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to fetch user");
  }
});

export async function updateUser(
  id: string,
  userData: CreateUserArgs
): Promise<User> {
  try {
    const res = await callAPIWithToken<User>(
      `https://api.edify.club/edifybackend/v1/user/${id}`, // API endpoint
      "PUT", // HTTP method
      userData
    );
    // console.log(res);
    return res?.data;
  } catch (e) {
    throw new Error("Failed to Update user");
  }
}

export async function deleteUser<User>(userId: string) {
  try {
    const res = await callAPIWithToken<User>(
      `https://api.edify.club/edifybackend/v1/user/${userId}`, // API endpoint
      "DELETE",
      null
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
      "https://api.edify.club/edifybackend/v1/user/bulk-upload",
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

export const getUsersByTeamId = cache(async function <User>(
  teamId: string,
  page: number
) {
  try {
    const sess = await getSession();
    const res = await callAPIWithToken<User>(
      `https://api.edify.club/edifybackend/v1/user/teams`, // API endpoint
      "POST", // HTTP method
      {
        teamId,
        orgId: sess.user.user.orgId?._id,
        filters: [],
        fields: usersFields,
        pageLimit: 5,
        page: page ? page : 1,
      }
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to fetch user");
  }
});

//Search api
export async function userSearchAPI(query: string): Promise<UserResponse> {
  try {
    const url = `https://api.edify.club/edifybackend/v1/user/search?query=${query}`;
    const res = await callAPIWithToken<UserResponse>(url, "GET");

    return res?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.message || "Failed to search users");
    }
    throw new Error((error as AxiosError)?.message);
  }
}

// API function to fetch the hierarchy data
export const fetchUserHierarchy = cache(
  async function (): Promise<HierarchyResponse> {
    try {
      const res = await callAPIWithToken<HierarchyResponse>(
        "https://api.edify.club/edifybackend/v1/user/hierarchy", // API endpoint for hierarchy
        "GET" // HTTP method
      );

      return res?.data;
    } catch (e) {
      throw new Error("Failed to fetch user hierarchy");
    }
  }
);
