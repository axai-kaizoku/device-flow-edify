import { CombinedContainer } from '@/components/container/Container';
import { SearchBarWithProfile } from '../page';
import { Edit, Trash } from 'lucide-react';
import TeamForm from './_components/team-form';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/side-sheet';
import { fetchTeams } from '@/server/actions';
import { cache } from 'react';

const cachedTeams = cache(fetchTeams);

export default async function Teams() {
	const teams = await cachedTeams();
	console.log(teams);
	return (
		<CombinedContainer title="Teams">
			<SearchBarWithProfile />
			<div className="h-10" />
			<div className="flex gap-5">
				<h1 className="text-2xl">Team List</h1>
				<SheetDemo />
			</div>
			<div className="h-10" />
			<div className="flex gap-3 items-center">
				{teams.map((t) => (
					<TeamBadge key={t._id} title={t.title} size="5" />
				))}
			</div>
		</CombinedContainer>
	);
}

export function SheetDemo() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="px-2 border rounded-md">Create Team + </button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Create Team</SheetTitle>
				</SheetHeader>
				<TeamForm />
			</SheetContent>
		</Sheet>
	);
}

const TeamBadge = ({ title, size }: { title: string; size: string }) => {
	return (
		<div className="w-52 p-2 rounded-full bg-muted flex gap-3 justify-center items-center">
			<h3>{title}</h3>
			<button className="p-2 bg-background rounded-md border">
				<Edit size={14} />
			</button>{' '}
			<button className="p-2 bg-background rounded-md border">
				<Trash size={14} />
			</button>
		</div>
	);
};
