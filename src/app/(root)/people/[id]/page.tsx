import { CombinedContainer } from '@/components/container/container';
import { CreateUserArgs, getUserById, User } from '@/server/userActions';
import EditUser from './_components/edit-user';
import { DeleteUser } from './_components/delete-user';
import { getSession } from '@/server/helper';

interface UserPageProps {
	params: { id: string };
}

export default async function UserPage({ params }: UserPageProps) {
	const user: User = await getUserById(params.id);
	const sess = await getSession();

	if (!user) {
		return <div>Data not found</div>;
	}

	return (
		<CombinedContainer
			title={`${user.first_name} ${user.last_name}`}
			description="User Details">
			<div className="flex justify-end w-full">
				<div className="flex gap-5">
					{sess?.user.role === 2 && <div className="flex gap-5">
						<EditUser userData={user as unknown as CreateUserArgs}>
							Edit User
						</EditUser>
						<DeleteUser id={params.id}>Delete User</DeleteUser>
					</div>}
				</div>
			</div>
			<div className="h-10" />
			<div className="flex justify-between items-center mb-8">
				<div className="flex items-center gap-4">
					<img
						src={user.orgId?.logo || 'https://via.placeholder.com/150'}
						alt={`${user.orgId?.name} logo`}
						className="w-20 h-20 object-cover rounded-full ring-4 ring-indigo-500"
					/>
					<div>
						<h1 className="text-3xl font-semibold text-gray-800">{`${user.first_name} ${user.last_name}`}</h1>
						<span className="text-gray-500">{user.email}</span>
					</div>
				</div>
				<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
					{user.designation}
				</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* General Information */}
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-4">General Information</h2>
					<ul className="text-gray-700 space-y-2">
						<li>
							<strong>Email:</strong> {user.email}
						</li>
						<li>
							<strong>Phone:</strong> {user.phone}
						</li>
						<li>
							<strong>Employment Type:</strong> {user.employment_type}
						</li>
						<li>
							<strong>Date of Birth:</strong>{' '}
							{new Date(user.date_of_birth).toLocaleDateString()}
						</li>
						<li>
							<strong>Onboarding Date:</strong>{' '}
							{new Date(user.onboarding_date).toLocaleDateString()}
						</li>
					</ul>
				</div>

				{/* Organization Information */}
				<div className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-xl font-semibold mb-4">
						Organization Information
					</h2>
					<ul className="text-gray-700 space-y-2">
						<li>
							<strong>Organization:</strong> {user.orgId?.name}
						</li>
						<li>
							<strong>Legal Entity Name:</strong>{' '}
							{user.orgId?.legal_entity_name}
						</li>
						<li>
							<strong>Office Address:</strong>{' '}
							{user.orgId?.office_address[0].address}
						</li>
						<li>
							<strong>Email:</strong> {user.orgId?.email}
						</li>
					</ul>
				</div>

				{/* Reporting Manager */}
				{user.reporting_manager && (
					<div className="bg-white shadow-lg rounded-lg p-6">
						<h2 className="text-xl font-semibold mb-4">Reporting Manager</h2>
						<div className="flex items-center gap-4">
							<img
								src="https://via.placeholder.com/100"
								alt={`${user.reporting_manager.first_name} ${user.reporting_manager.last_name}`}
								className="w-16 h-16 object-cover rounded-full"
							/>
							<div>
								<span className="block font-semibold text-gray-800">{`${user.reporting_manager.first_name} ${user.reporting_manager.last_name}`}</span>
								<span className="text-gray-500">
									{user.reporting_manager.email}
								</span><br />
								<span className="text-gray-500">
									{user.reporting_manager.phone}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</CombinedContainer>
	);
}
