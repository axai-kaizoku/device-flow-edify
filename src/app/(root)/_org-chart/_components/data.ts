import { HierarchyUser } from "@/server/userActions";

export interface Employee {
  name: string;
  profile: string;
  designation: string;
  children?: Employee[];
}

// Helper function to map HierarchyUser to Employee structure
export const mapEmployeeData = (employees: HierarchyUser[]): Employee[] => {
  return employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name || ""}`, // Combine first name and last name if present
    profile: employee.email || "/media/sidebar/profile.svg", // Use email as profile or a default placeholder
    designation: employee.designation || "Unknown", // Handle undefined designation
    children: employee.reportees?.length
      ? mapEmployeeData(employee.reportees) // Recursively map reportees as children
      : [], // If no reportees, return an empty array
  }));
};
