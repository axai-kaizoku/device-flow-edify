import { getSession } from '@/server/helper';
import SidebarMain from './main';

export default async function Sidebar() {
	const session = await getSession();
	// console.log(session)

	return <>{session && <SidebarMain session={session} />}</>;
}
