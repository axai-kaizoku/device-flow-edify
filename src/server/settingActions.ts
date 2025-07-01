import { callAPI, callAPIWithToken } from "./helper";
import { BASEURL } from "./main";
export type Location = {
  _id?: string;
  orgId?: string;
  location?: string;
  deleted_at?: string | null;
  label?: string;
  address_type?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  deviceCount?: number;
};

export const addNewLocations = async ({
  label,
  location,
  address_type,
}: {
  label?: string;
  location?: string;
  address_type?: string;
}) => {
  try {
    const apiUrl = `${BASEURL}/edifybackend/v1/location`;
    const body = {
      location,
      label,
      address_type,
    };
    const response = await callAPIWithToken<Location>(apiUrl, "POST", body);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Chat");
  }
};
export const getAllLocations = async () => {
  try {
    const apiUrl = `${BASEURL}/edifybackend/v1/location`;

    const response = await callAPIWithToken<Location[]>(apiUrl, "GET");

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Chat");
  }
};

export const deleteSingleLocations = async ({
  locationId,
}: {
  locationId?: string;
}) => {
  try {
    const apiUrl = `${BASEURL}/edifybackend/v1/location/${locationId}`;

    const response = await callAPIWithToken(apiUrl, "DELETE");

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Chat");
  }
};
export const updateSingleLocation = async ({
  locationId,
  label,
  location,
  address_type,
}: {
  locationId?: string;
  label?: string;
  location?: string;
  address_type?: string;
}) => {
  try {
    const apiUrl = `${BASEURL}/edifybackend/v1/location/${locationId}`;
    const body = {
      label,
      location,
      address_type,
    };
    const response = await callAPIWithToken<Location>(apiUrl, "PATCH", body);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Chat");
  }
};

export async function sendOtp(phone: string) {
  try {
    const apiUrl = `${BASEURL}/edifybackend/v1/address/sendOTP`;

    const response = await callAPIWithToken(apiUrl, "POST", { phone: phone });
    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response || "Failed to send otp");
  }
}

export async function verifyOtpAndLogin(phone: string, otp: string) {
  try {
    const apiUrl = `${BASEURL}/edifybackend/v1/address/verifyOTP`;

    const response = await callAPIWithToken(apiUrl, "POST", {
      phone: phone,
      otp: otp,
    });
    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response || "Failed to verify otp");
  }
}
