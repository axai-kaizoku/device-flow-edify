import { CombinedContainer } from '@/components/container/Container';
import { SearchBarWithProfile } from '../page';
import { SessionState } from '@/components/sidebar/side-profile';

export default function Teams() {
	return (
		<CombinedContainer title="Teams">
			<SearchBarWithProfile />
			<div className="h-10" />
			<h1 className="text-2xl">Team List</h1>
			<div className="h-10" />
			<div className="flex gap-3 items-center">
				<TeamBadge title="Tech" size="5" />
			</div>
			<SessionState />
		</CombinedContainer>
	);
}

const TeamBadge = ({ title, size }: { title: string; size: string }) => {
	return (
		<div className="w-40 p-2 rounded-full bg-muted flex justify-center items-center">
			{`${title} (${size}) ->`}
		</div>
	);
};
