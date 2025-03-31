import { AxiosError } from "axios";
import { callAPIWithToken, getSession } from "./helper";

// export async function qualityCheck(userId:string) {
//   const sess = await getSession();
//   const result = sess.user.user.userId;
//   if ( sess?.user &&sess.user.user.userId ){
//     const apiUrl="https://778c-13-235-211-22.ngrok-free.app/edifybackend/v1/quality-check/check-quality-checks"
//   }
//   return result;
// }

const qcUrl = "https://e97e-49-207-232-225.ngrok-free.app";
export async function qualityCheck(userId: string) {
  try {
    const payload = {
      userId: userId,
    };
    const apiUrl = `${qcUrl}/edifybackend/v1/quality-check/check-quality-checks`;

    const response = await callAPIWithToken(apiUrl, "POST", payload);
    // console.log(response, "ITEM ADDED TO CART");
    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response || "Failed to get quality check");
  }
}
export async function uniqueIdGeneration(userId: string) {
  try {
    const payload = {
      userId: userId,
    };
    const apiUrl = `{qcUrl}/edifybackend/v1/quality-check/unique-id`;

    const response = await callAPIWithToken(apiUrl, "POST", payload);
    // console.log(response, "ITEM ADDED TO CART");
    console.log(response.data);
    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response || "Failed to get unique id");
  }
}
