import { Card } from '@/components/wind/Card/index';
import { Icon } from '@/components/wind/Icons/index';
import { Typography } from '@/components/wind/Typography/index';
import {
	EmptyState,
	EmptyTableContainer,
	MarginVertical20,
} from '../styles/style';

export const EmptyTable = ({ title }: EmptyTableProps) => {
	return (
		<Card
			style={{
				borderRadius: 'unset',
				width: '100%',
				padding: 20,
				justifyContent: 'center',
			}}>
			<EmptyTableContainer>
				<EmptyState>
					<Icon type="OutlinedAddressBook" color="black" />
				</EmptyState>

				<MarginVertical20 />
				<Typography variant="h6" color="#101112" type="semi-bold">
					{title}
				</Typography>
				<MarginVertical20 />
			</EmptyTableContainer>
		</Card>
	);
};

interface EmptyTableProps {
	title?: string;
}
