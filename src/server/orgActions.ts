"use server";

import { cache } from "react";
import { Address } from "./addressActions";
import { callAPIWithToken, getSession } from "./helper";

type OfficeAddress = Address;

type Joinee = {
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
  reporting_manager: string;
  updatedAt: string;
  teamId: string;
  role?: number | string; // Since there are both number and string values for "role"
  designation?: string;
  gender?: string;
  interests_and_hobbies?: string;
  about?: string;
  marital_status?: string;
  physically_handicapped?: string;
};

export type Org = {
  _id?: string;
  name?: string;
  logo?: string;
  email?: string;
  legal_entity_name?: string;
  office_address?: OfficeAddress[];
  total_devices?: number;
  total_users?: number;
  upcoming_joinee?: Joinee[];
  total_purchased?: number;
};

export const getAllOrgs = cache(async function (): Promise<Org[]> {
  try {
    const res = await callAPIWithToken<Org[]>(
      "https://api.edify.club/edifybackend/v1/organisation",
      "GET"
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to fetch orgs");
  }
});

export async function createOrg(
  title: string,
  description: string,
  image: string
): Promise<Org> {
  try {
    const sess = await getSession();

    const res = await callAPIWithToken<Org>(
      "https://api.edify.club/edifybackend/v1/organisation", // API endpoint
      "POST", // HTTP method
      {
        title,
        description,
        image,
        orgId: sess?.user?.orgId,
      }
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to create org");
  }
}

export const getCurrentOrg = cache(async function <Org>() {
  try {
    const sess = await getSession();
    const orgId = sess?.user?.orgId;
    const res = await callAPIWithToken<Org>(
      `https://api.edify.club/edifybackend/v1/organisation/${orgId}`, // API endpoint
      "GET", // HTTP method
      null
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to fetch org");
  }
});

export async function updateOrg(
  id?: string,
  title?: string,
  description?: string,
  image?: string
): Promise<Org> {
  try {
    const res = await callAPIWithToken<Org>(
      `https://api.edify.club/edifybackend/v1/organisation/${id}`, // API endpoint
      "PUT", // HTTP method
      {
        title,
        description,
        image,
      }
    );
    return res?.data;
  } catch (e) {
    throw new Error("Failed to Update org");
  }
}

export async function deleteOrg<Org>(orgId: string) {
  try {
    const res = await callAPIWithToken<Org>(
      `https://api.edify.club/edifybackend/v1/organisation/${orgId}`, // API endpoint
      "DELETE",
      null
    );
    return res.data;
  } catch (e) {
    throw new Error("Failed to delete org");
  }
}
