// data.ts
export interface Employee {
	name: string;
	role: string;
	profile: string;
	designation: string;
	children?: Employee[];
}

// Helper function to map new data to the required structure
export const mapEmployeeData = (employee: any): Employee => ({
	name: `${employee.first_name} ${employee.last_name}`,
	role: employee.role ? employee.role.toString() : 'Unknown', // Ensure role is string
	profile: '/media/sidebar/profile.svg',
	designation: employee.designation,
	children:
		employee.reportees.length > 0
			? employee.reportees.map(mapEmployeeData)
			: [],
});

// export const orgData: Employee = {
// 	name: 'John Doe',
// 	role: 'CEO',
// 	profile: '/assets/sidebar/profile.svg',
// 	children: [
// 		{
// 			name: 'Jane Smith',
// 			role: 'CTO',
// 			profile: '/assets/sidebar/profile.svg',
// 			children: [
// 				{
// 					name: 'David Clark',
// 					role: 'Lead Developer',
// 					profile: '/assets/sidebar/profile.svg',
// 					children: [
// 						{
// 							name: 'Alex Turner',
// 							role: 'Developer',
// 							profile: '/assets/sidebar/profile.svg',
// 						},
// 						{
// 							name: 'Katie Holmes',
// 							role: 'Junior Developer',
// 							profile: '/assets/sidebar/profile.svg',
// 						},
// 					],
// 				},
// 				{
// 					name: 'Emily Johnson',
// 					role: 'Head of AI',
// 					profile: '/assets/sidebar/profile.svg',
// 					children: [
// 						{
// 							name: 'Alice Williams',
// 							role: 'AI Engineer',
// 							profile: '/assets/sidebar/profile.svg',
// 						},
// 						{
// 							name: 'Ethan Brown',
// 							role: 'ML Specialist',
// 							profile: '/assets/sidebar/profile.svg',
// 						},
// 					],
// 				},
// 			],
// 		},
// 		{
// 			name: 'Mike Brown',
// 			role: 'CFO',
// 			profile: '/assets/sidebar/profile.svg',
// 			children: [
// 				{
// 					name: 'Paul Adams',
// 					role: 'Finance Manager',
// 					profile: '/assets/sidebar/profile.svg',
// 				},
// 				{
// 					name: 'Nancy White',
// 					role: 'Accountant',
// 					profile: '/assets/sidebar/profile.svg',
// 				},
// 			],
// 		},
// 		{
// 			name: 'Laura King',
// 			role: 'Head of HR',
// 			profile: '/assets/sidebar/profile.svg',
// 			children: [
// 				{
// 					name: 'Susan Hill',
// 					role: 'HR Manager',
// 					profile: '/assets/sidebar/profile.svg',
// 				},
// 				{
// 					name: 'Tom White',
// 					role: 'Recruiter',
// 					profile: '/assets/sidebar/profile.svg',
// 				},
// 			],
// 		},
// 		{
// 			name: 'Michael Young',
// 			role: 'Head of Sales',
// 			profile: '/assets/sidebar/profile.svg',
// 			children: [
// 				{
// 					name: 'David Brown',
// 					role: 'Sales Manager',
// 					profile: '/assets/sidebar/profile.svg',
// 				},
// 				{
// 					name: 'Jessica Green',
// 					role: 'Sales Executive',
// 					profile: '/assets/sidebar/profile.svg',
// 				},
// 			],
// 		},
// 	],
// };
