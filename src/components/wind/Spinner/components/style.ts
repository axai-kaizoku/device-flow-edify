import styled from "styled-components";

export const LoadingIcon = styled.img`
  position: absolute;
  z-index: 2;
  animation: spin 1s linear infinite;
  left: 50%;
  top: 40%;
  transform: translate(-50%, 0);
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;

interface ChildWrapperProps {
  loading?: boolean;
}
export const ChildWrapper = styled.span`
  opacity: ${(props: ChildWrapperProps) => (props.loading ? 0.2 : 1)};
`;

export const ButtonLoader = styled.span`
  display: flex;
  align-items: center;
  margin-right: 5px;
  svg {
    animation: spin 1.5s linear infinite;
    
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
