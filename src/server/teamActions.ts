"use server";
import { cache } from "react";

import { FilterApiParams } from "./filterActions";
import { callAPIWithToken, getSession } from "./helper";

export type Team = {
  _id?: string;
  title: string;
  description: string;
  image: string;
  size?: string;
  employees_count?: number;
  deleted_at?: string | null;
  createdAt?: string;
  updatedAt?: string;
  orgId?: string | null;
  __v?: number;
};

export type TeamsResponse = {
  issues: Team[]; // Changed from 'devices' to 'documents'
  total_count: number;
  page_size: number;
};

const teamFields = [
  "title",
  "description",
  "createdAt",
  "updatedAt",
  "image",
  "employees_count",
  "orgId",
  "deletedAt",
];

export const fetchTeams = cache(async function ({
  filters = [],
  fields = teamFields,
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
    const apiUrl = `https://api.edify.club/edifybackend/v1/teams/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Team[]>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
      return res?.data?.teams;
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

export const fetchDeletedTeams = cache(async function ({
  filters = [],
  fields = teamFields,
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
    const apiUrl = `https://api.edify.club/edifybackend/v1/teams/filter${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Team[]>(apiUrl, "POST", payload);
    // Check if response has data
    if (res && res?.data) {
      return res?.data?.teams;
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

    const res = await callAPIWithToken<Team>(
      "https://api.edify.club/edifybackend/v1/teams", // API endpoint
      "POST", // HTTP method
      {
        title,
        description,
        image,
        orgId: sess?.user?.user?.orgId?._id,
      }
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to create team");
  }
}

export const getTeamById = cache(async function <Team>(teamId: string) {
  try {
    const res = await callAPIWithToken<Team>(
      `https://api.edify.club/edifybackend/v1/teams/${teamId}`, // API endpoint
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
      `https://api.edify.club/edifybackend/v1/teams/${id}`, // API endpoint
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
      `https://api.edify.club/edifybackend/v1/teams/${teamId}`, // API endpoint
      "DELETE",
      null
    );
    return res?.data;
  } catch (e: any) {
    throw e;
  }
}
