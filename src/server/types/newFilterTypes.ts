import { Device } from "../deviceActions";
import { Issues } from "../issueActions";
import { Team } from "../teamActions";
import { User } from "../userActions";

export type FilterSelection = { [key: string]: string[] };

export type FilterAssetsResponse = {
  devices: Device[];
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  filterOptions: {
    // warrantyStatus: boolean[];
    [key: string]: string[];
  };
};

export type FilterAssetsArgs = {
  filters?: string[][];
  searchQuery?: string;
  page?: number;
  pageLimit?: number;
  type?: "assigned" | "unassigned" | "inactive";
};

export type FilterIssuesResponse = {
  issues: Issues[];
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  filterOptions: {
    [key: string]: string[];
  };
};

export type FilterIssuesArgs = {
  filters?: string[][];
  searchQuery?: string;
  page?: number;
  pageLimit?: number;
  type?: "open" | "closed";
};

export type FilterTeamsResponse = {
  teams: Team[];
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  filterOptions: {
    [key: string]: string[];
  };
};

export type FilterTeamsArgs = {
  filters?: string[][];
  searchQuery?: string;
  type?: "active" | "inactive";
};

export type FilterPeopleResponse = {
  users: User[];
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  filterOptions: {
    // warrantyStatus: boolean[];
    [key: string]: string[];
  };
};

export type FilterPeopleArgs = {
  filters?: string[][];
  searchQuery?: string;
  page?: number;
  pageLimit?: number;
  type?: "active" | "inactive";
};
