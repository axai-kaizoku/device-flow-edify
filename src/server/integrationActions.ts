import { AxiosError } from "axios";
import { callAPIWithToken } from "./helper";
import { User } from "./userActions";

const apiUrl = "https://staging.deviceflow.ai";
// const apiUrl = "https://8a54-34-47-179-100.ngrok-free.app";

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
  id: string;
  platform: string;
  __v: number;
  builtBy: string;
  image?: string;
  companyImages: string[];
  companyLogo: string;
  credentials: string[];
  description: string;
  documentationLink: string;
  isCloud: boolean;
  isCrm: boolean;
  isDesign: boolean;
  isSales: boolean;
  isTechnology: boolean;
  isTrending: boolean;
  newVersionDate: string; // You might want to use Date type if you parse it
  size: string;
  version: string;
  website: string;
  isNewlyAdded: boolean;
  price?: number;
  isPopular: boolean;
  isConnected: boolean;
};

export type SeatsResponse = {
  integrations: Seat[];
  seatCount: number;
};

export type UserByIntegration = {
  _id: string;
  email: string;
  name: string;
  integrations: IntegrationType[];
  teamName: string | null;
  reporting_manager: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  role: number;
  designation: string;
  employment_type: string;
  about: string | null;
  interests_and_hobbies: string | null;
  date_of_birth: string;
  image: string | null;
  qcUniqueId: string | null;
  gender: string;
  marital_status: string | null;
  physically_handicapped: string | null;
  deleted_at: string | null;
  onboarding_date: string;
};

export const getTotalSeats = async (): Promise<any> => {
  try {
    const res = await callAPIWithToken<SeatsResponse>(
      `${apiUrl}/edifybackend/v1/integration/totalSeats`,
      "GET"
    );
    return res?.data;
  } catch (error) {
    throw new Error((error as AxiosError)?.message);
  }
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

    const res = await callAPIWithToken<IntegrationType[]>(
      `${apiUrl}/edifybackend/v1/integration/unsubscribe/${id}`,
      "DELETE"
    );
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
  payload: Record<string, any>;
}) => {
  try {
    const body = { ...payload };

    const res = await callAPIWithToken<AddIntegrationRes>(
      `${apiUrl}/edifybackend/v1/integration/add`,
      "POST",
      body
    );
    console.log(res.data, "integration add response");
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error((error as AxiosError)?.message);
  }
};
export type IntegrationUsers = {
  allUsers: User[];
  missingIntegrationUsers: User[];
  totalSeats?: number;
  unmappedSeats: number;
  totalTeamSubscriptionCost?: number;
  unmappedUsersCost?: number;
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
    console.log(res.data);
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

    console.log(res.data);

    return res?.data;
  } catch (error) {
    console.error(error);
    throw new Error((error as AxiosError)?.message);
  }
};
