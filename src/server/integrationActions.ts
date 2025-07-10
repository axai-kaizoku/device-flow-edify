"use server";

import { AxiosError } from "axios";
import { callAPIWithToken, getSession } from "./helper";
import { User } from "./userActions";
import { BASEURL } from "./main";

const apiUrl = BASEURL;
// const apiUrl = "https://1c55-34-47-179-100.ngrok-free.app";

export type Seat = {
  _id: string;
  email: string;
  name: string;
  orgId: string;
  userId: string | null;
  subscriptions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AllIntegrationAvailable = IntegrationType;

export type IntegrationType = {
  _id: string;
  url?: string;
  id: string;
  platform: string;
  __v: number;
  builtBy: string;
  image?: string;
  companyImages: string[];
  companyLogo: string;
  credentials: string[];
  description: string;
  isCloud: boolean;
  isCrm: boolean;
  isDesign: boolean;
  isSales: boolean;
  isTechnology: boolean;
  isTrending: boolean;
  isPopular: boolean;
  isNewlyAdded: boolean;
  isConnected: boolean;
  newVersionDate: string; // You might want to use Date type if you parse it
  size: string;
  version: string;
  website: string;
  price?: { plan: string; price: string; _id: string }[];
  permissions?: string[];
  wiki?: string;
  tags?: string[];
};

export type SeatsResponse = {
  integrations: Seat[];
  seatCount: number;
};

export type UserByIntegration = {
  _id?: string;
  email?: string;
  name?: string;
  integrations?: IntegrationType[];
  teamName?: string | null;
  reporting_manager?: string;
  first_name?: string;
  last_name?: string | null;
  phone?: string;
  role?: number;
  designation?: string;
  employment_type?: string;
  about?: string | null;
  interests_and_hobbies?: string | null;
  date_of_birth?: string;
  image?: string | null;
  qcUniqueId?: string | null;
  gender?: string;
  marital_status?: string | null;
  physically_handicapped?: string | null;
  deleted_at?: string | null;
  onboarding_date?: string;
};

export const allIntegrationsAvailable = async () => {
  try {
    const res = await callAPIWithToken<AllIntegrationAvailable[]>(
      `${apiUrl}/edifybackend/v1/integration/available`,
      "GET"
    );
    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
};

export const getIntegrationById = async ({ id }: { id: string }) => {
  try {
    // console.log((await getSession()).user.user.token);

    const res = await callAPIWithToken<IntegrationType[]>(
      `${apiUrl}/edifybackend/v1/integration/available/${id}`,
      "GET"
    );
    return res?.data?.[0];
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
};

export const deleteIntegrationById = async ({ id }: { id: string }) => {
  try {
    // console.log((await getSession()).user.user.token);
    console.log(id);
    const res = await callAPIWithToken<IntegrationType[]>(
      `${apiUrl}/edifybackend/v1/integration/unsubscribe/${id}`,
      "DELETE",
      {}
    );
    console.log(res.data);
    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
};

export type AddIntegrationRes = {
  message: string;
  integrationId: string;
  status: string;
  data: {
    _id: string;
    orgId: string;
    __v: number;
    createdAt: string;
    email: string;
    image: null;
    name: string;
    subscriptions: {
      integrationId: string;
      refId: string;
      _id: string;
    }[];
    updatedAt: string;
    userId: null;
  }[];
  totalCount: number;
  unMapped: User[];
  unMappedCount: number;
};

export const connectIntegration = async ({
  payload,
}: {
  payload: Record<string | number, any>;
}) => {
  try {
    const body = { ...payload };

    const res = await callAPIWithToken<AddIntegrationRes>(
      `${apiUrl}/edifybackend/v1/integration/add`,
      "POST",
      body
    );
    return res.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
};

export const connectGsuiteIntegration = async ({ id }: { id: string }) => {
  try {
    const res = await callAPIWithToken<AddIntegrationRes>(
      `${apiUrl}/edifybackend/v1/integration/getGsuiteResponse/${id}`,
      "GET",
      null
    );
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as AxiosError)?.message || "Something went wrong",
    };
  }
};

export type IntegrationUsers = {
  allUsers: User[];

  missingIntegrationUsers: User[];
  totalSeats?: number;
  unmappedSeats: number;
  platformTotalCost: number;
  totalTeamSubscriptionCost?: number;
  unmappedUsersCost?: number;
  usersUnmapped?: User[];
};
export const getUsersOfIntegration = async ({
  platform,
}: {
  platform?: string;
}) => {
  try {
    const body = platform && platform !== "total" ? { platform } : {};
    const res = await callAPIWithToken<IntegrationUsers>(
      `${apiUrl}/edifybackend/v1/integration/integratedUsersByOrg`,
      "POST",
      body
    );
    return res?.data;
  } catch (error) {
    console.error(error);
    throw new Error((error as AxiosError)?.message);
  }
};

// [{"userId":"67ebc29772f004f0c77927d1","integrationId": "67f64c04fc6c75cfa51339e0","userIntegrationId":"67f615faac6699d037f21bd8"}]

export const mapIntegrationUsers = async ({
  payload,
}: {
  payload?: {
    userId: string;
    integrationId: string;
    userIntegrationId: string;
  }[];
}) => {
  try {
    const res = await callAPIWithToken<any>(
      `${apiUrl}/edifybackend/v1/integration/map-users`,
      "PATCH",
      payload
    );

    // console.log(res.data);

    return res?.data;
  } catch (error) {
    console.error(error);
    throw new Error((error as AxiosError)?.message);
  }
};

export type ConnectedIntegrationsRes = {
  data: {
    _id: string;
    platform: string;
    integratedAt: string;
    price: {
      plan: string;
      price: number;
    };
    description?: string;
    status: string;
    userCount: number;
    companyLogo: string;
    totalPrice: number;
  }[];
};

export const getConnectedIntegrations = async () => {
  try {
    const res = await callAPIWithToken<ConnectedIntegrationsRes>(
      `${apiUrl}/edifybackend/v1/integration/connectedIntegration`,
      "GET"
    );

    // console.log(res.data);

    return res?.data;
  } catch (error) {
    console.error(error);
    throw new Error((error as AxiosError)?.message);
  }
};

export async function fetchInvoices({
  page,
  pageLimit,
  startDate,
  integrationIds,
  endDate,
  searchQuery = "",
}: {
  page: number;
  pageLimit: number;
  startDate?: string | null;
  endDate?: string | null;
  integrationIds?: string[];
  searchQuery?: string;
}) {
  try {
    // const session = await getSession();
    const payload = {
      page,
      pageLimit,
      integrationIds,
      startDate: startDate || null,
      endDate: endDate || null,
      searchQuery: searchQuery || "",
    };
    const apiURL = `${apiUrl}/edifybackend/v1/integration/filter`;

    const response = await callAPIWithToken<any>(apiURL, "POST", payload);
    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response || "Failed to get Invoices");
  }
}

export async function downloadInvoice({
  integrationIds,
  startDate,
  endDate,
}: {
  integrationIds: string[];
  startDate: string;
  endDate: string;
}) {
  try {
    const payload = {
      integrationIds,
      startDate: startDate || null,
      endDate: endDate || null,
    };
    const apiURL = `${apiUrl}/edifybackend/v1/integration/get-invoices`;

    const response = await callAPIWithToken<any>(apiURL, "POST", payload);
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function uploadInvoice({
  integrationPlatform,
  invoiceNumber,
  invoiceUrl,
  invoiceDate,
  integrationId,
  invoiceAmount,
}: {
  integrationId: string;
  invoiceDate: string;
  integrationPlatform: string;
  invoiceNumber: string;
  invoiceUrl: string;
  invoiceAmount?: number | null;
}) {
  try {
    const payload = {
      integrationId,
      integrationPlatform,
      invoiceNumber,
      invoiceUrl,
      invoiceDate: invoiceDate || null,
      invoiceAmount: invoiceAmount || null,
    };
    // console.log(payload)
    const apiURL = `${apiUrl}/edifybackend/v1/integration/invoices`;

    const response = await callAPIWithToken<any>(apiURL, "POST", payload);
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
