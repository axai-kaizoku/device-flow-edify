import { callAPIWithToken } from "./helper";

export async function globalSearch(searchQuery: string) {
  try {
    const apiUrl = `https://staging.deviceflow.ai/edifybackend/v1/user/globalSearch`;
    // wrap in the expected shape:
    const body = { searchQuery };
    const response = await callAPIWithToken(apiUrl, "POST", body);
    return response.data;
  } catch (err: any) {
    throw new Error(err?.response ?? "Failed to search.");
  }
}
