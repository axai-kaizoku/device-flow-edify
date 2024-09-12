import styled, { css } from 'styled-components';
import { Colors } from './colors';
import { getShadow } from './shadow';
import { ModalProps } from '../components/Modal';
import { zindex_modal, zindex_modal_backdrop } from '../../Utility';
import { boolean } from 'zod';

export const getModalWidth = css<ModalProps>`
	@media screen and (max-width: 600px) {
		width: 90%;
	}

	@media screen and (min-width: 601px) and (max-width: 800px) {
		width: 560px;
	}

	@media screen and (min-width: 801px) {
		width: ${({ size }) =>
			size === 'sm' ? '350px' : size === 'md' ? '560px' : '760px'};
	}
`;

export const TitleWrap = styled.div`
	display: flex;
	align-items: center;
`;

export const ModalContainer = styled.div<ModalProps>`
	position: fixed;
	left: 0;
	right: 0;
	margin: auto;
	z-index: ${zindex_modal};
	top: 0;
	bottom: 0;
	width: 760px;
	height: fit-content;
	border-radius: 8px;
	background: ${Colors.light};
	${getShadow('lg')}
	${getModalWidth}
`;

export const ModalBody = styled.div<{ hasFooter?: boolean }>`
	padding: 32px 24px;
	max-height: ${({ hasFooter }) => (hasFooter ? '400px' : '450px')};
	overflow-y: auto;
	@media screen and (max-width: 600px) {
		padding: 24px 16px;
	}
`;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 24px;
	@media screen and (max-width: 600px) {
		padding: 16px;
	}
	border-bottom: 1px solid ${Colors.grey_50};
`;

export const ModalFooterWrap = styled.div<{ inline?: boolean }>`
	display: flex;
	gap: 16px;
	border-top: 1px solid ${Colors.grey_50};
	padding: 12px 24px;
	justify-content: ${({ inline }) => (inline ? 'end' : 'center')};
	@media screen and (max-width: 600px) {
		padding: 12px 16px;
	}
`;

export const ModalOverlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	overflow-x: hidden;
	z-index: ${zindex_modal_backdrop};
	top: 0px;
	left: 0px;
	background: rgba(30, 32, 33, 0.6);
	filter: blur(20px);
`;
