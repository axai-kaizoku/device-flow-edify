'use client';
import styled, { css } from 'styled-components';
import { Colors } from './styles/colors';
interface Props {
	notFinished?: boolean;
	lastIndex?: boolean;
	currentState?: boolean;
	type?: 'vertical' | 'horizontal';
	isFinished?: boolean;
	disabled?: boolean;
	index?: number;
	vertical?: boolean;
}
export const StepsWrapper = styled.div<Props>`
	font-size: 0;
	width: 100%;
	line-height: 1.5;
	display: flex;
	padding: 0px 10px;
	${(props) =>
		props.type === 'vertical' &&
		css`
			flex-direction: column;
			gap: 18px;
		`}
`;

export const Item = styled.div`
	position: relative;
	display: flex;
	vertical-align: top;
	flex: 1;
	box-sizing: border-box;
`;

export const ItemContainer = styled.div`
	display: inline-block;
`;

export const ItemTail = styled.div<Props>`
	${(props) =>
		props.type === 'vertical'
			? css`
					position: absolute;
					bottom: 34px;
					left: 0px;
					width: 1px;
					height: 100%;
					margin-left: 16px;
					display: ${props.index === 0 || props.index === 1
						? 'none'
						: 'inline-block'};
			  `
			: css`
					position: absolute;
					left: 0;
					width: 100%;
					display: ${props.lastIndex ? 'none' : 'inline-block'};
					top: 16px;
					margin-left: ${props.isFinished ? '32px' : '36px'};
			  `};

	&::after {
		${(props) =>
			props.type === 'vertical'
				? css`
						content: '';
						display: inline-block;
						background: #e9e9e9;
						height: 70%;
						border-radius: 1px;
						width: 2px;
						transition: background 0.3s;
						background-color: ${props.notFinished
							? Colors.grey_100
							: Colors.success_500};
				  `
				: css`
						content: '';
						display: inline-block;
						background: #e9e9e9;
						height: 2px;
						border-radius: 1px;
						width: 100%;
						transition: background 0.3s;
						background-color: ${props.notFinished
							? Colors.grey_100
							: Colors.success_500};
				  `}
	}
`;

export const ItemIcon = styled.div`
	display: inline-block;
	width: 32px;
	height: 32px;
	line-height: 26px;
	text-align: center;
	border-radius: 26px;
	font-size: 14px;
	margin-right: 1px;
	transition: background-color 0.3s, border-color 0.3s;
`;

export const ItemContent = styled.div<Props>`
	${(props) =>
		props.type === 'vertical'
			? css`
					text-align: left;
					margin-left: 16px;
					display: flex;
					flex-direction: column;
					width: 200px;
					align-items: flex-start;
					justify-content: flex-start;
			  `
			: css`
					text-align: center;
					margin-top: 8px;
					display: flex;
					flex-direction: column;
					width: 200px;
					align-items: center;
					justify-content: center;
			  `}
`;

export const ContentTitle = styled.div<Props>`
	font-size: 14px;
	margin-bottom: 4px;
	color: ${(props) =>
		props.currentState ? `${Colors.info_700}` : `${Colors.grey_700}`};
	font-weight: bold;
	display: inline-block;
	padding-right: 10px;
	position: relative;
	font-family: Inter-Medium;
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 24px;
`;
export const ContentDescription = styled.div<Props>`
	color: ${(props) =>
		props.currentState ? `${Colors.info_500}` : `${Colors.grey_500}`};
	font-size: 12px;
	width: 300px;
	width: ${({ vertical }) => (vertical ? 'unset' : '300px')};
	font-family: Inter-Regular;
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 24px;
`;

export const StepNumber = styled.div<Props>`
	background: ${(props) =>
		props.notFinished || props.disabled ? '#FFFFFF' : `${Colors.info_50}`};
	border: ${(props) =>
		props.disabled
			? `2px solid ${Colors.grey_100}`
			: props.notFinished
			? `2px solid ${Colors.grey_100}`
			: `2px solid ${Colors.info_700}`};
	border-radius: 50px;
	color: ${(props: Props) =>
		props.notFinished ? `${Colors.grey_100}` : `${Colors.info_700}`};
	font-family: Inter-Bold;
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 22px;
	width: 32px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Container = styled.div<Props>`
	${(props) =>
		props.type === 'vertical'
			? css`
					text-align: left;
					margin-top: 8px;
					display: flex;
					width: 200px;
					align-items: flex-start;
					justify-content: flex-start;
					margin-left: 0px;
			  `
			: css`
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
					margin-left: -84px;
			  `}
`;
