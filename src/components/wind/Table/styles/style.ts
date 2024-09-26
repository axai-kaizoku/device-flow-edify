import styled, { css } from 'styled-components';
import { Colors } from './colors';
import { zindex_table_header } from '@/components/wind/Utility/index';

export const TableCell = styled.td`
	width: ${(props) => (props?.width ? `${props?.width}px` : '')};
	padding: 12px 24px;
	text-align: ${(props) => props?.align};
`;
export const TableHeader = styled.thead`
	position: sticky;
	top: 0;
	z-index: ${zindex_table_header};
`;

export const TableHeadRow = styled.tr`
	height: 44px;
	padding: 12px 24px;
	border: 1px solid ${Colors.grey_50};
	font-family: 'Inter-Medium';
	font-size: 12px;
	background: ${Colors.white_3};
	color: ${Colors.grey_500};
`;

export const TableRow = styled(TableHeadRow)`
	height: 70px;
	background: ${Colors.white_1};
`;

export const TableFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px;
	min-height: 48px;
	background: ${Colors.white_1};
	border: 1px solid ${Colors.grey_50};
	border-radius: 0 0 9px 9px;
	position: relative;
	@media (max-width: 600px) {
		flex-direction: column;
	}
`;
export const TableBody = styled.tbody``;
export const TableContainer = styled.div`
	height: 400px;
	overflow: overlay;
	text-align: center;
	background-color: ${Colors.white_1};
`;
export const TableTag = styled.table`
	width: 100%;
	border-collapse: collapse;
	overflow-x: overlay;
	position: relative;
`;

//Paginator
export const CenterFlex = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const PageNumberContainer = styled.div`
	display: flex;
	padding: 8px;
	align-items: center;
	gap: 12px;
	max-width: 312px;
	overflow-x: overlay;
`;
interface PageNumberProps {
	active?: boolean;
}
export const PageNumber = styled(CenterFlex)`
	font-family: 'Inter-Medium';
	font-size: 12px;
	padding: 4px;
	min-width: 32px;
	height: 32px;
	background: ${({ active }: PageNumberProps) => active && Colors.info_100};
	color: ${({ active }: PageNumberProps) =>
		active ? Colors.info_900 : Colors.grey_600};
	border-radius: 4px;
	cursor: pointer;
`;

export const PreviousPage = styled(PageNumber)`
	background: ${Colors.white_1};
	cursor: ${({ active }) => !active && 'not-allowed'};
`;

export const NextPage = styled(PageNumber)`
	background: ${Colors.white_1};
	cursor: ${({ active }) => !active && 'not-allowed'};
`;

export const CheckBox = styled.input`
	cursor: pointer;
`;

export const RowSelectionText = styled.p`
	display: flex;
	position: relative;
	@media (min-width: 600px) {
		left: 40px;
		position: absolute;
	}
`;

interface SortIconContainerProps {
	isRotate?: boolean;
}
export const SortIcon = styled.svg`
	margin-left: 20px;
	transition: transform 0.6s ease;
	transform: ${({ isRotate }: SortIconContainerProps) =>
		isRotate ? 'rotate(180deg)' : ''};
`;

interface SortArrowContainerProps {
	active?: boolean;
}
export const SortArrowContainer = styled.div`
	display: ${({ active }: SortArrowContainerProps) =>
		active ? 'block' : 'none'};
	position: relative;
`;

interface SortIconTextContainerProps {
	disableCursor?: boolean;
	headAlign?: string;
}
export const SortIconTextContainer = styled(CenterFlex)`
	cursor: ${({ disableCursor }: SortIconTextContainerProps) =>
		disableCursor ? `default` : `pointer`};
	&:hover {
		${SortArrowContainer} {
			display: block;
		}
	}
	${(props: SortIconTextContainerProps) =>
		props.headAlign &&
		css`
			justify-content: ${props.headAlign};
		`}
`;

export const EmptyState = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 48px;
	height: 48px;
	background: #f2f2f2;
	border-radius: 96px;
`;

export const EmptyTableContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

export const MarginVertical20 = styled.div`
	margin-top: 20px;
`;
