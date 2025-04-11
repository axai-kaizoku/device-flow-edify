"use server";
import { cache } from "react";

import { FilterApiParams } from "./filterActions";
import { callAPIWithToken, getSession } from "./helper";

export type Team = {
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  size?: string;
  employees_count?: number;
  deleted_at?: string | null;
  createdAt?: string;
  updatedAt?: string;
  team_code?: string;
  orgId?: string | null;
  __v?: number;
  manager?: {
    _id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    image?: string;
  }[];
};

export type TeamsResponse = {
  teams: Team[];
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
};

const teamFields = [
  "title",
  "description",
  "createdAt",
  "updatedAt",
  "image",
  "employees_count",
  "orgId",
  "deleted_at",
  "team_code",
];

export const fetchTeams = cache(async function ({
  filters = [],
  fields = teamFields,
  searchQuery = "",
  pageLimit = 200000,
  page = 1,
  isDeleted = false,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      pageLimit,
      page,
      isDeleted,
    };
    // console.log("teams api");

    // Construct the URL with an optional search query
    const apiUrl = `https://staging.deviceflow.ai/edifybackend/v1/teams/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<TeamsResponse>(apiUrl, "POST", payload);
    // Check if response has data
    // console.log(res.data, "TEam actions");
    if (res && res?.data) {
      return res?.data.teams;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    // Throw more specific error message
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter teams. Please try again later."
    );
  }
});
export const fetchActiveTeams = cache(async function ({
  filters = [],
  fields = teamFields,
  searchQuery = "",
  pageLimit = 10000,
  page = 1,
  isDeleted,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      pageLimit,
      page,
      isDeleted,
    };
    // console.log("teams api");

    // Construct the URL with an optional search query
    const apiUrl = `https://staging.deviceflow.ai/edifybackend/v1/teams/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<TeamsResponse>(apiUrl, "POST", payload);
    // Check if response has data
    // console.log(res.data, "TEam actions");
    if (res && res?.data) {
      return res?.data;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    // Throw more specific error message
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter teams. Please try again later."
    );
  }
});

export const fetchInactiveTeams = cache(async function ({
  filters = [],
  fields = teamFields,
  searchQuery = "",
  pageLimit = 10000,
  page = 1,
  isDeleted = true,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      pageLimit,
      page,
      isDeleted,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://staging.deviceflow.ai/edifybackend/v1/teams/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<TeamsResponse>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
      return res?.data;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    // Throw more specific error message
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter teams. Please try again later."
    );
  }
});

export async function createTeam(
  title: string,
  description: string,
  image: string
): Promise<Team> {
  try {
    const sess = await getSession();
    let teamImg = image;
    if (!image) {
      teamImg =
        "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012942444.png";
    }

    const res = await callAPIWithToken<Team>(
      "https://staging.deviceflow.ai/edifybackend/v1/teams", // API endpoint
      "POST", // HTTP method
      {
        title,
        description,
        image: teamImg,
        orgId: sess?.user?.user?.orgId?._id,
      }
    );
    console.log(res.data);
    return res?.data;
  } catch (e) {
    throw new Error("Failed to create team");
  }
}

export const getTeamById = cache(async function <Team>(teamId: string) {
  try {
    const res = await callAPIWithToken<Team>(
      `https://staging.deviceflow.ai/edifybackend/v1/teams/${teamId}`, // API endpoint
      "GET", // HTTP method
      null
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to fetch team");
  }
});

export async function updateTeam(
  id: string,
  team: Team | { deleted_at?: string | null; orgId?: string | null }
): Promise<Team> {
  try {
    const res = await callAPIWithToken<Team>(
      `https://staging.deviceflow.ai/edifybackend/v1/teams/${id}`, // API endpoint
      "PUT", // HTTP method
      {
        ...team,
      }
    );
    return res?.data;
  } catch (e) {
    throw new Error("Failed to Update team");
  }
}

export async function deleteTeam<Team>(teamId: string) {
  try {
    const res = await callAPIWithToken<Team>(
      `https://staging.deviceflow.ai/edifybackend/v1/teams/${teamId}`, // API endpoint
      "DELETE",
      null
    );
    return res?.data;
  } catch (e: any) {
    throw e;
  }
}
