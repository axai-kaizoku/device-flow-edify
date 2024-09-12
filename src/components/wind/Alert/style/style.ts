import styled from 'styled-components';
import { Colors } from './colors';
import { getShadow } from './shadow';

interface Props {
	color?: string;
	open?: boolean;
	backgroundColor?: string;
	borderColor?: string;
}

export const AlertCard = styled.div<Props>`
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	gap: 12px;
	width: auto;
	background: ${(props) => props.backgroundColor || Colors.info_25};
	border: ${(props) =>
		props.open ? `1px solid ${props.borderColor || Colors.info_300}` : '0px'};
	${getShadow('sm')}
	border-radius: 8px;
	position: relative;
	max-height: ${(props) => (props.open ? '138px' : '0')};
	overflow: hidden;
	padding: ${(props) => (props.open ? '16px' : '0')};
	transition: all 0.3s ease-in-out;
`;

export const Wrapper = styled.div`
	display: flex;
	gap: 13px;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

export const Title = styled.div<Props>`
	font-family: Inter-Medium;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 22px;
	color: ${(props) => props.color || Colors.info_700};
`;

export const Description = styled.div<Props>`
	font-family: Inter-Regular;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 22px;
	color: ${(props) => props.color || Colors.info_700};
	text-align: left;
`;

export const Footer = styled.div`
	margin-top: 13px;
	display: flex;
	gap: 14px;
`;

export const FooterLink = styled.a<Props>`
	font-family: Inter-Medium;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 22px;
	color: ${(props) => props.color || Colors.info_500};
`;

export const ViewChangesButton = styled.div<Props>`
	font-family: Inter-Medium;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 22px;
	color: ${(props) => props.color || Colors.info_700};
	display: flex;
	align-items: center;
	gap: 9px;
`;

export const CloseIconWrapper = styled.div`
	position: absolute;
	right: 19px;
	top: 19px;
	cursor: pointer;
`;
