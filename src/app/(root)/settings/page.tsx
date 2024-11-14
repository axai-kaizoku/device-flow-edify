import { CombinedContainer } from '@/components/container/container';
import { getCurrentOrg, Org } from '@/server/orgActions';
import { MapPinned } from 'lucide-react';
import CreateAddress from './_components/create-address';
import EditAddress from './_components/edit-address';
import { DeleteAddress } from './_components/delete-address';

export default async function Settings() {
	try {
		const o: Org[] = await getCurrentOrg();
		const org: Org = o[0];

		return (
			<CombinedContainer
				title="Settings"
				description="Manage your organization's settings">
				<div className="flex flex-col gap-8">
					{/* Organization Details */}

					{/* {JSON.stringify(org, null, 2)} */}
					<div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
						<div className="flex items-center gap-4">
							<img
								src={org?.logo || 'https://via.placeholder.com/100'}
								alt={`${org?.name || 'Organization'} logo`}
								className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-300 dark:ring-gray-600"
							/>
							<div>
								<h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
									{org?.name || 'Organization Name'}
								</h2>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{org?.email || 'N/A'}
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
								Devices: {org?.total_devices || 0}
							</p>
							<p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
								Employees: {org?.total_users || 0}
							</p>
						</div>
					</div>

					{/* Office Addresses */}
					<div>
						<h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
							Office Addresses
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{org?.office_address?.map((address) => (
								<div
									key={address?._id}
									className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
									<div className="flex items-center justify-between">
										<h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
											City: {address?.city}
										</h4>
										<MapPinned color="gray" />
									</div>
									<p className="text-base text-gray-500 dark:text-gray-400 mt-2 font-semibold">
										{address.isPrimary ? 'Primary Address' : <>&nbsp;</>}
									</p>
									<div className="mt-4 flex gap-4 justify-end">
										<EditAddress
											city={address?.city}
											id={address?._id}
											isPrimary={address.isPrimary}>
											<button className="bg-slate-500 text-white py-2 px-4 rounded-md shadow hover:bg-slate-600 transition duration-300">
												Edit
											</button>
										</EditAddress>
										<DeleteAddress id={address?._id}>
											<span className="bg-slate-800 text-white py-2 px-4 rounded-md shadow hover:bg-slate-600 transition duration-300">
												Delete
											</span>
										</DeleteAddress>
									</div>
								</div>
							))}
						</div>
						{/* Add new address button */}
						<div className="mt-6">
							<CreateAddress>
								<button className="bg-gradient-to-r from-green-400 to-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
									Add New Address
								</button>
							</CreateAddress>
						</div>
					</div>
				</div>
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="Settings">
				<div className="text-red-500">
					Failed to load data. Please try again later. <br />{' '}
					<a href="/" className="underline text-blue-500">
						Back to home
					</a>
				</div>
			</CombinedContainer>
		);
	}
}
