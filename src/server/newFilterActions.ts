import { devicesFields, issueFields, usersFields } from "./filterActions";
import { callAPIWithToken } from "./helper";
import { BASEURL } from "./main";
import type {
  FilterAssetsArgs,
  FilterAssetsResponse,
  FilterIssuesArgs,
  FilterIssuesResponse,
  FilterPeopleArgs,
  FilterPeopleResponse,
  FilterTeamsArgs,
  FilterTeamsResponse,
} from "./types/newFilterTypes";

// const baseUrl = "https://5e6e-34-47-179-100.ngrok-free.app";
const baseUrl = BASEURL;

export const filterAssets = async ({
  filters = [],
  searchQuery = "",
  page = 1,
  pageLimit = 1,
  type = "assigned",
}: FilterAssetsArgs) => {
  try {
    const payloadBody = {
      fields: devicesFields,
      pageLimit,
      page,
    };

    if (type === "assigned") {
      payloadBody["filters"] =
        filters?.length > 0
          ? [...filters, ["userId", "not null"]]
          : [["userId", "not null"]];
    } else if (type === "unassigned") {
      payloadBody["filters"] =
        filters?.length > 0
          ? [...filters, ["userId", "null"]]
          : [["userId", "null"]];
    } else if (type === "inactive") {
      payloadBody["isDeleted"] = true;
      payloadBody["filters"] = [];
    }

    console.log({ ...payloadBody, searchQuery }, "payload");

    const res = await callAPIWithToken<FilterAssetsResponse>(
      `${baseUrl}/edifybackend/v1/devices/filter/${
        searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
      }`,
      "POST",
      payloadBody
    );

    console.log(res?.data, "FILTER RESPONSE ");

    return res?.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error filtering assets");
  }
};

export const filterIssues = async ({
  filters = [],
  searchQuery = "",
  page = 1,
  pageLimit = 1,
  type = "open",
}: FilterIssuesArgs) => {
  try {
    const payloadBody = {
      fields: issueFields,
      pageLimit,
      page,
    };

    if (type === "open") {
      payloadBody["filters"] =
        filters?.length > 0
          ? [...filters, ["status", "Equals", "Open"]]
          : [["status", "Equals", "Open"]];
    } else if (type === "closed") {
      payloadBody["filters"] =
        filters?.length > 0
          ? [...filters, ["status", "Equals", "Closed"]]
          : [["status", "Equals", "Closed"]];
    }

    console.log(payloadBody, "issue payload");

    const res = await callAPIWithToken<FilterIssuesResponse>(
      `${baseUrl}/edifybackend/v1/issue/filter/${
        searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
      }`,
      "POST",
      payloadBody
    );

    console.log(res?.data, "FILTER RESPONSE ");

    return res?.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error filtering assets");
  }
};

export const filterTeams = async ({
  filters = [],
  searchQuery = "",
  type = "active",
}: FilterTeamsArgs) => {
  try {
    const payloadBody = {
      fields: [
        "title",
        "description",
        "createdAt",
        "updatedAt",
        "image",
        "employees_count",
        "orgId",
        "deleted_at",
        "team_code",
        "manager",
      ],
      pageLimit: 1000,
      page: 1,
      filters,
    };

    if (type === "active") {
      payloadBody["isDeleted"] = false;
    } else if (type === "inactive") {
      payloadBody["isDeleted"] = true;
    }

    console.log({ ...payloadBody, searchQuery }, "payload");

    const res = await callAPIWithToken<FilterTeamsResponse>(
      `${baseUrl}/edifybackend/v1/teams/filter/${
        searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
      }`,
      "POST",
      payloadBody
    );

    console.log(res?.data, "FILTER RESPONSE ");

    return res?.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error filtering teams");
  }
};

export const filterPeople = async ({
  filters = [],
  searchQuery = "",
  page = 1,
  pageLimit = 1,
  type = "active",
}: FilterPeopleArgs) => {
  try {
    const payloadBody = {
      fields: usersFields,
      pageLimit,
      page,
      filters,
    };

    if (type === "active") {
      payloadBody["isDeleted"] = false;
    } else if (type === "inactive") {
      payloadBody["isDeleted"] = true;
    }

    console.log({ ...payloadBody, searchQuery, type }, "payload");

    const res = await callAPIWithToken<FilterPeopleResponse>(
      `${baseUrl}/edifybackend/v1/user/filter/${
        searchQuery ? `?searchQuery=${encodeURIComponent(searchQuery)}` : ""
      }`,
      "POST",
      payloadBody
    );

    console.log(res?.data, "FILTER RESPONSE ");

    return res?.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error filtering people");
  }
};
