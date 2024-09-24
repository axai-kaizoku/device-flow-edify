import { getSession } from '@/server/helper';
import AdminDashboard from './_components/admin-page';
import UserDashboard from './_components/user-page';

export default async function Dashboard() {
	const sess = await getSession();
	return (
		<>
			{sess?.user.email === 'aniket.prakash@winuall.com' ? (
				<AdminDashboard />
			) : (
				<UserDashboard />
			)}
		</>
	);
}
