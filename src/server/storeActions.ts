// 'use server';
import { AxiosError } from "axios";
import { Device, StoreDevicesRes } from "./deviceActions";
import { callAPIWithToken, getSession } from "./helper";
import { cache } from "react";
import { devicesFields, FilterApiParams } from "./filterActions";

export const searchStoreDevices = cache(async function ({
  filters = [],
  fields = devicesFields,
  searchQuery = "",
  pageLength = 9000000,
  page = 1,
}: FilterApiParams = {}): Promise<any> {
  try {
    const payload = {
      fields,
      filters: filters?.length > 0 ? filters : [],
      pageLimit: pageLength,
      page,
    };

    // Construct the URL with an optional search query
    const apiUrl = `https://api.edify.club/edifybackend/v1/devices/assets${
      searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
    }`;

    // API call
    const res = await callAPIWithToken<Device[]>(apiUrl, "POST", payload);

    // Check and return response data
    if (res && res?.data) {
      return res?.data;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to filter devices. Please try again later."
    );
  }
});

export const getStoreDevices = cache(
  async function (): Promise<StoreDevicesRes> {
    const payload = {
      fields: devicesFields,
      filters: [],
    };
    try {
      const res = await callAPIWithToken<StoreDevicesRes>(
        "https://api.edify.club/edifybackend/v1/devices/assets",
        "POST",
        payload
      );

      return res?.data;
    } catch (e) {
      // redirect('/login');
      throw new Error((e as AxiosError)?.message);
    }
  }
);

export const getTrendingDevice = cache(
  async function (): Promise<StoreDevicesRes> {
    const payload = {
      fields: devicesFields,
      filters: [],
    };
    try {
      const res = await callAPIWithToken<StoreDevicesRes>(
        "https://api.edify.club/edifybackend/v1/devices/assets?query=trending",
        "POST",
        payload
      );

      return res?.data;
    } catch (e) {
      // redirect('/login');
      throw new Error((e as AxiosError)?.message);
    }
  }
);

export const getLatestReleases = cache(
  async function (): Promise<StoreDevicesRes> {
    const payload = {
      fields: devicesFields,
      filters: [],
    };
    try {
      const res = await callAPIWithToken<StoreDevicesRes>(
        "https://api.edify.club/edifybackend/v1/devices/assets?query=latest",
        "POST",
        payload
      );

      return res?.data;
    } catch (e) {
      // redirect('/login');
      throw new Error((e as AxiosError)?.message);
    }
  }
);

export const createDeviceReview = async function ({
  comment,
  deviceId,
  rating,
}: {
  deviceId: string;
  comment: string;
  rating: string;
}): Promise<StoreDevicesRes> {
  try {
    const sess = await getSession();
    const res = await callAPIWithToken<StoreDevicesRes>(
      "https://api.edify.club/edifybackend/v1/reviews",
      "POST",
      {
        userId: sess?.user.user.userId,
        orgId: sess?.user.user.orgId,
        deviceId: deviceId,
        comment: comment,
        rating: rating,
      }
    );

    return res?.data;
  } catch (e) {
    console.error("Failed to add review");
    throw new Error((e as AxiosError)?.message);
  }
};
