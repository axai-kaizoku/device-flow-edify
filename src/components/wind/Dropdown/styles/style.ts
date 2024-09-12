import styled, { css } from 'styled-components';
import { Colors } from './colors';
import { Typography } from '../../Typography';
import { getShadow } from './shadow';
import { zindex_dropdown } from '../../Utility';

let dropDownPosition = {
	top: css`
		bottom: calc(100% + 10px) !important;
		left: 50% !important;
		transform: translateX(-50%) !important;
	`,
	bottom: css`
		top: calc(100% + 10px) !important;
		left: 50% !important;
		transform: translateX(-50%);
	`,
};

export const Dimension = styled.div<DimensionProps>`
	display: inline-block;
	position: relative;
	height: ${({ height }) => height}px;
	width: ${({ width }) => width}px;
`;

export const Position = styled.div<PositionProps>`
	position: fixed;
	top: ${({ top }) => top}px;
	left: ${({ left }) => left}px;
	z-index: ${zindex_dropdown};
`;

export const StyledDropdown = styled.div<DirectionProps>`
	position: absolute;
	background: ${Colors.light};
	border: 1px solid ${Colors.grey_50};
	${getShadow('lg')}
	border-radius: 4px;
	width: ${({ width }) => width || '380px'};
	${({ direction }) => dropDownPosition[direction || 'bottom']}
`;

export const DropdownWrapper = styled.div`
	cursor: pointer;
`;

export const DropdownHeader = styled(Typography)`
	padding: 12px;
`;

export const DropdownFooterWrap = styled.div`
	width: 100%;
	display: flex;
	gap: 10px;
	padding: 12px;
`;

interface PositionProps {
	top: number;
	left: number;
}
export interface DirectionProps {
	direction: 'top' | 'bottom';
	width?: string;
}
interface DimensionProps {
	height: number;
	width: number;
}
