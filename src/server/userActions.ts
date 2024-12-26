"use server";

import { AxiosError } from "axios";
import { callAPIWithToken, getSession } from "./helper";
import { Team } from "./teamActions";
import { Device } from "./deviceActions";

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
  totalPages: number;
  currentPage: number;
  totalDocuments: number;
  pageSize: number;
  documentCount: number;
  currentDocumentCount: number;
};

export type newAllUserResponse = {
  users: User[];
};

export async function fetchUsers(): Promise<UserResponse> {
  try {
    const requestBody = {
      fields: ["first_name", "email"], // Specify fields to be fetched
      filters: [], // You can add filters here as per requirement
      page_length: 10, // Number of users to fetch per page
    };

    const res = await callAPIWithToken<UserResponse>(
      "https://api.edify.club/edifybackend/v1/user/filter",
      "POST", // Changed to POST as the new API requires it
      requestBody // Pass the request body
    );
    console.log(res.data.users);

    return res.data.users;
  } catch (e) {
    throw new Error("Failed to fetch users");
  }
}

export async function searchUsers(searchQuery: string): Promise<UserResponse> {
  try {
    const requestBody = {
      fields: ["first_name", "email"], // Specify fields to be fetched
      filters: [], // You can add filters here as per requirement
      page_length: 10, // Number of users to fetch per page
    };

    const apiUrl = `https://api.edify.club/edifybackend/v1/user/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    const res = await callAPIWithToken<UserResponse>(
      apiUrl,
      "POST", // Changed to POST as the new API requires it
      requestBody // Pass the request body
    );
    console.log(res.data.users);

    return res.data.users;
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
      orgId: sess?.user.orgId,
    };
    console.log("Session", sess);
    console.log("User", user);

    const res = await callAPIWithToken<User>(
      "https://api.edify.club/edifybackend/v1/user", // API endpoint
      "POST", // HTTP method
      user
    );
    console.log("Response Data:", res.data);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      console.error("API Error:", e.response.data);
      throw new Error(e.response.data.message || "Failed to create user");
    }
    throw new Error((e as AxiosError).message);
  }
}

export async function getUserById<User>(userId: string) {
  try {
    const res = await callAPIWithToken<User>(
      `https://api.edify.club/edifybackend/v1/user/${userId}`, // API endpoint
      "GET", // HTTP method
      null
    );

    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch user");
  }
}

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
    return res.data;
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
    return res.data;
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
    return response.data;
  } catch (error) {
    console.error("Error in bulk uploading users:", error);
    throw error;
  }
};

export async function getUsersByTeamId<User>(teamId: string) {
  try {
    const res = await callAPIWithToken<User>(
      `https://api.edify.club/edifybackend/v1/user/${teamId}/team`, // API endpoint
      "GET", // HTTP method
      null
    );

    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch user");
  }
}

//Search api
export async function userSearchAPI(query: string): Promise<UserResponse> {
  try {
    const url = `https://api.edify.club/edifybackend/v1/user/search?query=${query}`;
    const res = await callAPIWithToken<UserResponse>(url, "GET");

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error searching:", error.message);
      throw new Error(error.message || "Failed to search users");
    }
    throw new Error((error as AxiosError).message);
  }
}

// API function to fetch the hierarchy data
export async function fetchUserHierarchy(): Promise<HierarchyResponse> {
  try {
    const res = await callAPIWithToken<HierarchyResponse>(
      "https://api.edify.club/edifybackend/v1/user/hierarchy", // API endpoint for hierarchy
      "GET" // HTTP method
    );

    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error("Error fetching user hierarchy:", e);
    throw new Error("Failed to fetch user hierarchy");
  }
}
