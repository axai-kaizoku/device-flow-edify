// 'use server';
import { AxiosError } from "axios";
import { StoreDevicesRes } from "./deviceActions";
import { callAPIWithToken, getSession } from "./helper";
import { cache } from "react";

export const getStoreDevices = cache(
  async function (): Promise<StoreDevicesRes> {
    try {
      const res = await callAPIWithToken<StoreDevicesRes>(
        "https://api.edify.club/edifybackend/v1/devices/assets",
        "GET"
      );

      return res?.data;
    } catch (e) {
      // redirect('/login');
      throw new Error((e as AxiosError)?.message);
    }
  }
);

export const getBestSellers = cache(
  async function (): Promise<StoreDevicesRes> {
    try {
      const res = await callAPIWithToken<StoreDevicesRes>(
        "https://api.edify.club/edifybackend/v1/devices/assets?query=trending",
        "GET"
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
    try {
      const res = await callAPIWithToken<StoreDevicesRes>(
        "https://api.edify.club/edifybackend/v1/devices/assets?query=latest",
        "GET"
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
