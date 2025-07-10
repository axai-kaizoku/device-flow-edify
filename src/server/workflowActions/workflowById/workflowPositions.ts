import { callAPIWithToken } from "@/server/helper";
import { BASEURL } from "@/server/main";

export const updateNodePosition = async ({
  nodeId,
  position,
}: {
  nodeId: string;
  position: { x: number; y: number };
}) => {
  try {
    const res = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/workflow/workflowNode/update-position?nodePosition=true`,
      "PATCH",
      {
        nodeId,
        position,
      }
    );

    return res?.data;
  } catch (e) {
    console.error("Error updating node position:", e);
    throw new Error("Error updating node position");
  }
};

export const updateConnectorPosition = async ({
  nodeId,
  connectorPosition,
}: {
  nodeId: string;
  connectorPosition: { x: number; y: number };
}) => {
  try {
    const res = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/workflow/workflowNode/update-position?connectorPosition=true`,
      "PATCH",
      {
        nodeId,
        connectorPosition,
      }
    );

    return res?.data;
  } catch (e) {
    console.error("Error updating connector position:", e);
    throw new Error("Error updating connector position");
  }
};

export const updatePathPosition = async ({
  nodeId,
  branchId,
  branchPosition,
}: {
  nodeId: string;
  branchId: string;
  branchPosition: { x: number; y: number };
}) => {
  try {
    const res = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/workflow/workflowNode/update-position?branchPosition=true`,
      "PATCH",
      {
        nodeId,
        branchId,
        branchPosition,
      }
    );

    return res?.data;
  } catch (e) {
    console.error("Error updating branch position:", e);
    throw new Error("Error updating branch position");
  }
};

export const getConditionsOfPath = async ({ templateKey }) => {
  try {
    // console.log(templateKey);
    const res = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/workflow/node/ifconditions?key=${templateKey}`,
      "GET"
    );
    return res?.data;
  } catch (error) {
    console.error("Error getting the list ", error);
    throw new Error("Error getting the list");
  }
};
