import { cache } from "react";
import { callAPIWithToken } from "./helper";

export const getDashboard = cache(async function <Org>() {
  try {
    const res = await callAPIWithToken<Org>(
      `https://api.edify.club/edifybackend/v1/organisation/dashboard`, // API endpoint
      "GET", // HTTP method
      null
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to fetch org");
  }
});
