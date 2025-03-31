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

export async function qualityCheck() {
  try {
    const session = await getSession();

    const payload = {
      userId: session.user.user.userId ?? "",
    };
    const apiUrl = `${qcUrl}/edifybackend/v1/quality-check/check-quality-checks`;

    const response = await callAPIWithToken(apiUrl, "POST", payload);
    // console.log(response, "ITEM ADDED TO CART");
    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response || "Failed to get quality check");
  }
}
export async function uniqueIdGeneration() {
  try {
    const session = await getSession();

    const payload = {
      userId: session.user.user.userId ?? "",
    };
    const apiUrl = `${qcUrl}/edifybackend/v1/quality-check/unique-id`;

    const response = await callAPIWithToken(apiUrl, "POST", payload);
    // console.log(response, "ITEM ADDED TO CART");
    console.log(response.data);
    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response || "Failed to get unique id");
  }
}

export type QcReportResponse = {
  success: boolean;
  data: {
    _id?: string;
    device_score?: number;
    serial_no?: string;
    diagnosed_on?: string;
    device_name?: string;
    warranty_status?: string;
    assets_health?: string;
    device_image?: string;
  }[];
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
};

export async function qcReportTable(page: number, limit: number) {
  try {
    const session = await getSession();
    const payload = {
      userId: session.user.user.userId ?? "",
      page,
      limit,
    };
    const apiUrl = `${qcUrl}/edifybackend/v1/quality-check/show-employee`;

    const response = await callAPIWithToken<QcReportResponse>(
      apiUrl,
      "POST",
      payload
    );
    // console.log(response, "ITEM ADDED TO CART");
    console.log(response.data);
    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response || "Failed to get qc reports");
  }
}

const data = {
  success: true,
  data: [
    {
      _id: "67ea3391be43a2f0a019fbe6",
      serial_no: "SANTOSH",
      diagnosed_on: "2025-03-31T06:17:53.496Z",
      device_name: "Lenovo Ideapad 320",
      warranty_status: "2026-01-29T00:00:00.000Z",
      assets_health: "Excellent",
      device_image:
        "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png",
    },
    {
      _id: "67ea3391be43a2f0a019fbe5",
      serial_no: "SANTOSH",
      diagnosed_on: "2025-03-31T06:17:53.496Z",
      device_name: "Lenovo Ideapad 320",
      warranty_status: "2026-01-29T00:00:00.000Z",
      assets_health: "Excellent",
      device_image:
        "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png",
    },
    {
      _id: "67ea3c8fbe43a2f0a019fc13",
      serial_no: "SANTOSH",
      diagnosed_on: "2025-03-31T06:56:15.501Z",
      device_name: "Lenovo Ideapad 320",
      warranty_status: "2026-01-29T00:00:00.000Z",
      assets_health: "Excellent",
      device_image:
        "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png",
    },
    {
      _id: "67ea3c93be43a2f0a019fc15",
      serial_no: "SANTOSH",
      diagnosed_on: "2025-03-31T06:56:19.169Z",
      device_name: "Lenovo Ideapad 320",
      warranty_status: "2026-01-29T00:00:00.000Z",
      assets_health: "Excellent",
      device_image:
        "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png",
    },
    {
      _id: "67ea3c97be43a2f0a019fc17",
      serial_no: "SANTOSH",
      diagnosed_on: "2025-03-31T06:56:23.384Z",
      device_name: "Lenovo Ideapad 320",
      warranty_status: "2026-01-29T00:00:00.000Z",
      assets_health: "Excellent",
      device_image:
        "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png",
    },
  ],
  page: 1,
  limit: 5,
  totalRecords: 7,
  totalPages: 2,
};
