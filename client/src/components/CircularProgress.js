import styled, { keyframes } from "styled-components";

const CircularProgress = () => {
  return (
    <Wrapper>
        <Ring>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Ring>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;

const RingAnimation = keyframes`
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
`;

const Ring = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #444;
    border-radius: 50%;
    animation: ${RingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #444 transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s; 
    border-color: #111 transparent transparent transparent;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s; 
    border-color: #222 transparent transparent transparent;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s; 
    border-color: #333 transparent transparent transparent;
  }
`;

export default CircularProgress;