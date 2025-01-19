"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
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
  image: string;
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
  devices?: number | Device;
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

export const fetchManager = cache(async function (token: string): Promise<any> {
  try {
    const requestBody = {
      fields: [
        "first_name",
        "email",
        "designation",
        "employment_type",
        "image",
      ],
      filters: [],
      page: 1,
      pageLimit: 5,
    };

    const res: AxiosResponse = await axios({
      url: "https://api.edify.club/edifybackend/v1/user/filter",
      method: "POST",
      data: { requestBody },

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });


    return res.data.users;
  } catch (e) {
    throw new Error("Failed to fetch users");
  }
});

export async function searchManager(
  searchQuery: string,
  token: string
): Promise<any> {
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
      pageLimit: 20, // Number of users to fetch per page
    };
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    const res: AxiosResponse = await axios({
      url: apiUrl,
      method: "POST",
      data: { requestBody },

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });


    return res?.data?.users;
  } catch (e) {
    throw new Error("Failed to fetch users");
  }
}

export const fetchUsers = cache(async function (): Promise<any> {
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

    return res.data.users;
  } catch (e) {
    throw new Error("Failed to fetch users");
  }
});

export async function searchUsers(searchQuery: string): Promise<any> {
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
    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    const res = await callAPIWithToken<UserResponse>(
      apiUrl,
      "POST", // Changed to POST as the new API requires it
      requestBody // Pass the request body
    );
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

    if (!user.image) {
      if (user.gender === "Male") {
        user.image =
          "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012636473.png";
      } else {
        user.image =
          "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012892650.png";
      }
    }

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
export type UsersTeamResponse = {
  users: User[];
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
};
export const getUsersByTeamId = cache(async function <UsersTeamResponse>(
  teamId: string,
  page: number
) {
  try {
    const sess = await getSession();
    const res = await callAPIWithToken<UsersTeamResponse>(
      `https://api.edify.club/edifybackend/v1/user/teams`, // API endpoint
      "POST", // HTTP method
      {
        teamId,
        orgId: sess?.user.user.orgId?._id ?? "",
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

export const fetchUserHierarchy = cache(
  async function (): Promise<HierarchyResponse> {
    try {
      const res = await callAPIWithToken<HierarchyResponse>(
        "https://api.edify.club/edifybackend/v1/user/hierarchy", // Your API endpoint
        "GET" // HTTP method
      );
      return res?.data; // Ensure the response is correctly mapped to data
    } catch (e) {
      console.error("Error fetching hierarchy:", e); // Log error from the API
      throw new Error("Failed to fetch user hierarchy");
    }
  }
);
