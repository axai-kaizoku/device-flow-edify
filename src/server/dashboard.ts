import { cache } from "react";
import { callAPI, callAPIWithToken, getSession } from "./helper";
import { AxiosError } from "axios";

export const getDashboard = cache(async function <Org>() {
  try {
    const res = await callAPIWithToken<Org>(
      `https://staging.deviceflow.ai/edifybackend/v1/organisation/dashboard`, // API endpoint
      "GET", // HTTP method
      null
    );

    return res?.data;
  } catch (e) {
    throw new Error("Failed to fetch org");
  }
});

// Feedback API

export async function sendFeedback({
  rating,
  comment,
}: {
  rating: number;
  comment: string;
}) {
  const sess = await getSession();
  const payload = {
    rating,
    comment,
    orgId: sess?.user?.user?.orgId?._id,
    userId: sess?.user.user.userId,
  };

  try {
    const { data } = await callAPI(
      "https://staging.deviceflow.ai/edifybackend/v1/auth/user/onboard?feedback=true",
      "POST",
      payload,
      {
        "Content-Type": "application/json",
      }
    );

    return data;
  } catch (e) {
    throw new Error((e as AxiosError)?.message || "Failed to submit feedback");
  }
}
