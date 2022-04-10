import styled from "styled-components";

import { Container } from "./Styles";
import { FaRegFlag } from "react-icons/fa";

const ErrorMessage = ({message}) => {
  let errorMessage = !message ? "An unknown error occurred." : message;
  
  return (
    <Wrapper>
      <MessageDiv>
        <FaRegFlag size={40} />
        <Error>Error</Error>
        <Message>{errorMessage}</Message>
      </MessageDiv>
    </Wrapper>
  )
};

const Wrapper = styled(Container)`
  margin: 30px auto;
`;

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 25px;
`;

const Error = styled.h2`
  margin: 10px 0 5px;
`;

const Message = styled.div`

`;

export default ErrorMessage;