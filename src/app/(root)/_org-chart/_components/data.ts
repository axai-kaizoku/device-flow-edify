import { HierarchyUser } from '@/server/userActions';

export interface Employee {
	name: string;
	profile: string;
	designation: string;
	children?: Employee[];
}

// Helper function to map HierarchyUser to Employee structure
export const mapEmployeeData = (employee: HierarchyUser): Employee => ({
	name: `${employee.first_name} ${employee.last_name}`,
	// role: employee.role ? employee.role.toString() : 'Unknown', // Ensure role is string
	profile: '/media/sidebar/profile.svg',
	designation: employee.designation || 'Unknown', // Handle possible undefined designation
	children: employee.reportees?.length
		? employee.reportees.map(mapEmployeeData)
		: [], // Recursively map reportees
});
