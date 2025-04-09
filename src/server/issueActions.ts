import { AxiosError } from "axios";
import { callAPIWithToken, getSession } from "./helper";
import { cache } from "react";
import { Device } from "./deviceActions";

export type Issues = {
  _id?: string;
  issueId?: string;
  userId?: string;
  description?: string;
  orgId?: string;
  title?: string;
  deviceId?: string;
  status?: string;
  images?: string[];
  deleted_at?: null | string;
  createdAt?: string;
  updatedAt?: string;
  priority?: string;
  userName?: string;
  serial_no?: string;
  email?: string;
  deviceDetails?: Device;
  userDetails?: {
    name?: string;
    phone?: string;
    image?: string;
    email?: string;
    designation?: string;
  };
  teamDetails?: {
    _id?: string;
    title?: string;
    description?: string;
    image?: string;
    orgId?: string;
    deleted_at?: null | string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };
  manager?: {
    name?: string;
    phone?: string;
    email?: string;
    designation?: string;
  };
  purchaseDetails?: {
    _id?: string;
    itemId?: string;
    cartId?: string;
    purchased_date?: string;
  }[];
};

export type getAllResponse = Issues[];

export type IssueResponse = {
  issues: Issues[]; // Changed from 'devices' to 'documents'
  total_pages?: number;
  current_page?: number;
  total?: number;
  per_page?: number;
};

export interface IssueData {
  deviceId: string | undefined; // ID of the device
  serial_no: string; // Serial number of the device
  priority: string; // Priority of the issue
  status: string; // Status of the issue (e.g., 'Open')
  title: string; // Title of the issue
  description: string; // Detailed description of the issue
  userId?: string;
  email?: string;
}

//get all issues-admin
export async function getAllIssues(): Promise<IssueResponse> {
  try {
    const res = await callAPIWithToken<IssueResponse>(
      "https://staging.deviceflow.ai/edifybackend/v1/issue",
      "GET"
    );
    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
}

//get single issue by ID-admin/user
export const getIssueById = cache(async function <Issues>(issueId: string) {
  try {
    const res = await callAPIWithToken<Issues>(
      `https://staging.deviceflow.ai/edifybackend/v1/issue/${issueId}`,
      "GET",
      null
    );
    return res?.data;
  } catch (error) {
    throw new Error("Failed to fetch Issue");
  }
});

//update issue
export const updateIssue = async (
  issueId: string,
  issueData: Issues
): Promise<Issues | undefined> => {
  try {
    const res = await callAPIWithToken<Issues>(
      `https://staging.deviceflow.ai/edifybackend/v1/issue/${issueId}`,
      "PUT",
      issueData
    );
    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
};

//delete issue
export async function deleteIssue(
  issueId: string
): Promise<Issues | undefined> {
  try {
    const deleletedIssues = await callAPIWithToken<Issues>(
      `https://staging.deviceflow.ai/edifybackend/v1/issue/${issueId}`,
      "DELETE"
    );

    return deleletedIssues?.data;
  } catch (error) {
    return undefined;
  }
}

// Create Issue - Employee

export const createIssue = async (
  issueData: IssueData
): Promise<Issues | undefined> => {
  const sess = await getSession();
  try {
    if (sess?.user) {
      const issue = {
        ...issueData,
        orgId: sess.user.user.orgId?._id,
        createdAt: new Date().toISOString(),
      };
      const res = await callAPIWithToken<Issues>(
        "https://staging.deviceflow.ai/edifybackend/v1/issue/",
        "POST",
        issue
      );
      return res?.data;
    }
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
};

//  Get Issues by UserId

export const getIssueByUserId = cache(async (): Promise<getAllResponse> => {
  const sess = await getSession(); // Fetch session details

  try {
    if (sess?.user && sess.user.user.userId) {
      // const userId = sess.user.id;

      // Make the GET request to fetch issues by user ID
      const res = await callAPIWithToken<getAllResponse>(
        `https://staging.deviceflow.ai/edifybackend/v1/issue/userDetails`,
        "GET"
      );

      // Return the list of issues
      return res?.data;
    } else {
      throw new Error("No user session found");
    }
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
});

//pagination
export const paginatedIssue = async (page: string): Promise<IssueResponse> => {
  try {
    const res = await callAPIWithToken<IssueResponse>(
      `https://staging.deviceflow.ai/edifybackend/v1/issue/paginated?page=${page}`,
      "GET"
    );
    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
};

//search-api
export async function issueSearchAPI(query: string): Promise<IssueResponse> {
  try {
    const url = `https://staging.deviceflow.ai/edifybackend/v1/issue/search?query=${query}`;
    const res = await callAPIWithToken<IssueResponse>(url, "GET");

    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
}
