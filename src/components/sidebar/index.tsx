import { getSession } from '@/server/helper';
import SidebarMain from './main';
import { Props } from '@/app/(root)/layout';

export default async function Sidebar({session}:Props) {
	// console.log(session)

	return <>{session && <SidebarMain session={session} />}</>;
}
