import { callAPIWithToken } from "@/server/helper";
import { BASEURL } from "@/server/main";

export type SingleSplitPathResponse = {
  workflowNodeId: string;
  newBranches: {
    branchId: string;
    label: string;
    branchPosition: {
      x: number;
      y: number;
    };
    branchDirection: any;
    condition: any;
    next: any;
  }[];
};

export const createSingleSplitPath = async ({
  prevNodeId,
  branchPositions,
  branchDirection,
}: {
  prevNodeId: string;
  branchPositions: Array<{ x: number; y: number }>;
  branchDirection?: "Top" | "Bottom" | "Right";
}) => {
  // console.log("Creating single split path with params:", {
  //   prevNodeId,
  //   branchDirection,
  //   branchPositions,
  // });
  try {
    const res = await callAPIWithToken<SingleSplitPathResponse>(
      `${BASEURL}/edifybackend/v1/workflow/node/create-nodes?linear=true`,
      "POST",
      {
        prevNodeId: prevNodeId,
        branchPositions: branchPositions,
        branchDirection,
      }
    );
    // console.log("Single split path created:", res.data);
    // gimme only branchId and branch details

    return res?.data;
  } catch (e) {
    console.error("Error creating single split path:", e);
    throw new Error("Error creating single split path");
  }
};

export const createDoubleSplitPath = async ({
  prevNodeId,
  branchPositions,
  connectorPosition,
}: {
  prevNodeId: string;
  branchPositions: Array<{ x: number; y: number }>;
  connectorPosition: { x: number; y: number };
}) => {
  try {
    const res = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/workflow/node/create-nodes?splitpath=true`,
      "POST",
      {
        prevNodeId: prevNodeId,
        branchPositions: branchPositions,
        connectorPosition: connectorPosition,
      }
    );

    return res?.data;
  } catch (e) {
    console.error("Error creating double split path:", e);
    throw new Error("Error creating double split path");
  }
};

export const updatePathNameOrNextNode = async ({
  nodeId,
  label,
  nextNodeId,
  branchId,
}: {
  nodeId?: string;
  label?: string;
  nextNodeId?: string;
  branchId?: string;
}) => {
  // console.log("Updating path with params:", {
  // nodeId,
  // label,
  // nextNodeId,
  // branchId,
  // });
  try {
    const res = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/workflow/workflowNode/update-branch`,
      "PATCH",
      {
        nodeId,
        label,
        nextNodeId,
        branchId,
      }
    );
    // console.log("Path updated:", res.data);

    return res?.data;
  } catch (e) {
    console.error("Error updating path name:", e);
    throw new Error("Error updating path name");
  }
};

export const deleteBranch = async ({
  nodeId,
  branchId,
}: {
  nodeId: string;
  branchId: string;
}) => {
  console.log("Deleting branch with params:", {
    nodeId,
    branchId,
  });
  try {
    const res = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/workflow/workflowNode/delete-branch`,
      "DELETE",
      {
        nodeId,
        branchId,
      }
    );
    // console.log("Branch deleted:", res.data);

    return res?.data;
  } catch (e) {
    console.error("Error deleting branch:", e);
    throw new Error("Error deleting branch");
  }
};

export const deleteSplit = async (id: string) => {
  try {
    const res = await callAPIWithToken(
      `${BASEURL}/edifybackend/v1/workflow/workflowNode/delete-connector/${id}`,
      "DELETE",
      {}
    );

    return res?.data;
  } catch (e) {
    console.error("Error deleting split", e);
    throw new Error("Error deleting Split");
  }
};

type UpdatePathConditionParams = {
  nodeId: string;
  branchId: string;
  branchDescription?: string;
  conditionId?: string; // Only required for updates
  condition: {
    field: string;
    operator: string;
    value: string;
  };
  isNew: boolean;
};

export const addPathCondition = async (params: UpdatePathConditionParams) => {
  const { nodeId, branchId, branchDescription, conditionId, condition, isNew } =
    params;

  const url = isNew
    ? `${BASEURL}/edifybackend/v1/workflow/workflowNode/update-branch?moreCondition=true`
    : `${BASEURL}/edifybackend/v1/workflow/workflowNode/update-branch`;

  try {
    const res = await callAPIWithToken(url, "PATCH", {
      nodeId,
      branchDescription,
      branchId,
      conditionId,
      condition,
    });

    return res?.data;
  } catch (e) {
    console.error("Error updating path condition:", e);
    throw new Error("Error updating path condition");
  }
};
