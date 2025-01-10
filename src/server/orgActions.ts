// "use server";

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


export const getCurrentOrg = cache(async function <Org>() {
  try {
    const sess = await getSession();
    const orgId = sess?.user?.user?.orgId?._id;
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


export async function getImageUrl(
  file: { file?: File },
  type: "user" | "device" | "org" | "team"
): Promise<any> {
  try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Determine the URL based on the type
      let imageUrl: string;

      switch (type) {
        case "user":
          imageUrl =
            "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp";
          break;
        case "device":
          imageUrl =
            "https://utfs.io/f/NQykNGTeJtaHOrliC4Qt8HPrZM9gUevJhFLDnwaou0TEiB16";
          break;
        case "org":
          imageUrl =
            "https://via.placeholder.com/150/008000/FFFFFF?text=Org+Image";
          break;
        case "team":
          imageUrl =
            "https://via.placeholder.com/150/008000/FFFFFF?text=Team+Image";
          break;
        default:
          throw new Error("Invalid type provided");
      }

      return { data: imageUrl };
    
  } catch (error) {
    throw new Error("Failed to create image url");
  }
}
