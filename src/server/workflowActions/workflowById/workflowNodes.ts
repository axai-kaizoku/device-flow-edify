import { callAPIWithToken } from "@/server/helper";
import { BASEURL } from "@/server/main";
import { AxiosError } from "axios";

export interface AllAppsResponse {
  key: string;
  name: string;
  description: string;
  service: string;
  method: string | null;
  endpoint: string | null;
  requiredFields: string[] | null;
  outputFields: string[] | null;
  isInternal: boolean | null;
  authRequired: boolean;
  metaData: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface AppServices {
  isInternal: boolean;
  _id: string;
  key: string;
  name: string;
  description: string;
  service: string;
  method: string;
  endpoint: string;
  requiredFields: string[];
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
  bodyTemplate: {
    channel: string;
    text: string;
  };
  outputFields: string[];
  authRequired: boolean;
  auth: {
    type: string;
    field: string;
  };
  metaData: string;
  createdAt: string;
  validationConfig: {
    validationEndpoint: string;
    method: string;
    headers: {
      "Content-Type": string;
    };
    successPath: string;
    successValue: boolean;
    requiredScopes: string[];
  };
}

export interface WorkflowNode {
  orgId: string;
  workflowId: string;
  templateKey: string;
  configFields: string[];
  requiredFields: string[];
  next: string | null;
  position: {
    x: number;
    y: number;
  };
  deletedAt: string | null;
  _id: string;
  branches: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateWorkflowAppPayload {
  appName: string;
  position: {
    x: number;
    y: number;
  };
  workflowId: string;
  description: string;
}

export type WorkflowAppType = {
  name: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: null;
};

// GET ALL APPS or SERVICES

export const getAllAppsAndServices = async ({
  appName,
}: {
  appName?: string;
}): Promise<AllAppsResponse[] | AppServices[] | WorkflowAppType[]> => {
  try {
    const payload = appName ? { appName } : { allApps: "true" };
    const res = await callAPIWithToken<
      AllAppsResponse[] | AppServices[] | WorkflowAppType[]
    >(`${BASEURL}/edifybackend/v1/workflow/node/apps`, "POST", payload);

    // console.log("API response:", res);

    return res?.data;
  } catch (e) {
    throw new Error((e as AxiosError)?.message);
  }
};

// Create an APP

export const createApp = async ({
  payload,
}: {
  payload: CreateWorkflowAppPayload;
}): Promise<WorkflowNode> => {
  try {
    // console.log("Creating app with payload:", payload);
    const res = await callAPIWithToken<WorkflowNode>(
      `${BASEURL}/edifybackend/v1/workflow/node/create-nodes?apponly=true`,
      "POST",
      { ...payload }
    );

    // console.log("API response:", res);
    return res?.data;
  } catch (e) {
    throw new Error((e as AxiosError)?.message);
  }
};

export const updateAppAction = async ({
  templateKey,
  nodeId,
  workflowId,
  description,
}: {
  templateKey: string;
  nodeId: string;
  workflowId: string;
  description: string;
}) => {
  try {
    // console.log("Updating app action with params:", {
    //   templateKey,
    //   nodeId,
    //   workflowId,
    //   description,
    // });
    const res = await callAPIWithToken<WorkflowNode>(
      `${BASEURL}/edifybackend/v1/workflow/node/create-nodes?service=true`,
      "POST",
      { templateKey, nodeId, workflowId, description }
    );

    // console.log("updateAppAction response:", res);
    return res?.data;
  } catch (e) {
    throw new Error((e as AxiosError)?.message);
  }
};

export const changeApp = async ({
  nodeId,
  appName,
}: {
  nodeId: string;
  appName: string;
}) => {
  try {
    // console.log("Updating app action with params:", {
    //   nodeId,
    //   appName,
    // });
    const res = await callAPIWithToken<WorkflowNode>(
      `${BASEURL}/edifybackend/v1/workflow/workflowNode/updateToNewTemplate?apponly=true`,
      "PATCH",
      { nodeId, appName }
    );

    // console.log("updateAppAction response:", res);
    return res?.data;
  } catch (e) {
    throw new Error((e as AxiosError)?.message);
  }
};

export const deleteNode = async (nodeId: string): Promise<WorkflowNode> => {
  try {
    // console.log("Deleting node with ID:", nodeId);
    const res = await callAPIWithToken<WorkflowNode>(
      `${BASEURL}/edifybackend/v1/workflow/workflowNode/${nodeId}`,
      "DELETE",
      {}
    );

    // console.log("deleteNode response:", res);
    return res?.data;
  } catch (e) {
    throw new Error((e as AxiosError)?.message);
  }
};

export const getServices = async (appName: string): Promise<AppServices[]> => {
  try {
    const res = await callAPIWithToken<AppServices[]>(
      `${BASEURL}/edifybackend/v1/workflow/node/apps`,
      "POST",
      { appName }
    );

    // console.log("getActions response:", res);
    return res?.data;
  } catch (e) {
    throw new Error((e as AxiosError)?.message);
  }
};

export const setConfigInstruction = async ({
  currentNodeId,

  html,
  cc,
  subject,
}: {
  currentNodeId: string;

  html?: string;
  cc?: string[];
  subject?: string;
}) => {
  try {
    const res = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/workflow/workflowNode/setConfig/${currentNodeId}`,
      "PATCH",
      {
        html,
        subject,
        cc,
      }
    );
    return res.data;
  } catch (e) {
    throw new Error((e as AxiosError)?.message);
  }
};
